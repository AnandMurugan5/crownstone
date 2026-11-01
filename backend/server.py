import os
import re
import uuid
import logging
import ipaddress
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path

from dotenv import load_dotenv
import httpx
from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, field_validator


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Emergent managed email proxy (constant — never read from env)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

SERVICES_OFFERED = [
    "Construction Works",
    "Renovation Works",
    "Building Plan Approval",
    "2D Architectural Planning",
    "3D Architectural Design",
    "Interior Designing",
    "Exterior Designing",
    "Other",
]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)


# ---------- Models ----------
class EnquiryCreate(BaseModel):
    name: str = Field(min_length=3, max_length=100)
    phone: str = Field(min_length=10, max_length=20)
    email: EmailStr
    service: str
    location: str = Field(min_length=3, max_length=120)
    description: str = Field(min_length=10, max_length=2000)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-.]", "", v)
        if not re.fullmatch(r"(\+91)?[6-9]\d{9}", cleaned):
            raise ValueError("Enter a valid Indian phone number")
        if not cleaned.startswith("+91"):
            cleaned = "+91" + cleaned
        return cleaned

    @field_validator("service")
    @classmethod
    def validate_service(cls, v: str) -> str:
        if v not in SERVICES_OFFERED:
            raise ValueError("Please select a valid service")
        return v


# ---------- Email (Emergent managed Resend integration) ----------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code}): {e.response.json().get('message', '')}")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


def _enquiry_email_html(e: EnquiryCreate) -> str:
    received = datetime.now(timezone.utc).strftime("%d %b %Y, %I:%M %p UTC")
    rows = [
        ("Name", e.name),
        ("Phone", e.phone),
        ("Email", str(e.email)),
        ("Service Required", e.service),
        ("Project Location", e.location),
        ("Project Description", e.description),
    ]
    trs = "".join(
        f'<tr>'
        f'<td style="padding:10px 24px;font-family:Arial,sans-serif;color:#777777;font-size:12px;'
        f'letter-spacing:1px;text-transform:uppercase;width:170px;vertical-align:top">{escape(k)}</td>'
        f'<td style="padding:10px 24px;font-family:Arial,sans-serif;color:#171717;font-size:14px;vertical-align:top">{escape(v)}</td>'
        f'</tr>'
        for k, v in rows
    )
    return (
        '<table role="presentation" width="100%" bgcolor="#F8F7F3" cellpadding="0" cellspacing="0">'
        '<tr><td style="padding:28px 12px" align="center">'
        '<table role="presentation" width="100%" style="max-width:620px" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0">'
        '<tr><td style="background:#171717;padding:24px 24px">'
        '<span style="font-family:Georgia,serif;color:#C6A15B;font-size:22px;letter-spacing:1px">Crown Stone Construction</span><br/>'
        '<span style="font-family:Arial,sans-serif;color:#F8F7F3;font-size:12px;letter-spacing:2px">NEW WEBSITE ENQUIRY</span>'
        '</td></tr>'
        f'<tr><td style="padding:16px 0">{trs}</td></tr>'
        '<tr><td style="padding:16px 24px;border-top:1px solid #eeeeee">'
        f'<span style="font-family:Arial,sans-serif;color:#999999;font-size:12px">Received {received}. '
        f'Sent by the {escape(EMAIL_FROM_NAME)} website enquiry form. We never ask for your password or card details by email.'
        '</span>'
        '</td></tr>'
        '</table></td></tr></table>'
    )


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Crown Stone Construction API is running"}


@api_router.post("/enquiries")
async def create_enquiry(enquiry: EnquiryCreate):
    enquiry_id = str(uuid.uuid4())
    doc = {
        "enquiry_id": enquiry_id,
        **enquiry.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.enquiries.insert_one(doc)

    email_alert = True
    try:
        subject = f"New Enquiry: {enquiry.name} - {enquiry.service}"
        await send_email(to=OWNER_EMAIL, subject=subject, html=_enquiry_email_html(enquiry))
    except HTTPException as he:
        email_alert = False
        logger.warning(f"Enquiry {enquiry_id} saved but email alert failed: {he.detail}")
    except Exception as e:
        email_alert = False
        logger.error(f"Enquiry {enquiry_id} saved but email alert errored: {str(e)}")

    return {"status": "received", "enquiry_id": enquiry_id, "email_alert": email_alert}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()