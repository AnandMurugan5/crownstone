# PRD — Crown Stone Construction Website

## Original Problem Statement
Build a premium, fully responsive single-page business website for Crown Stone Construction, a construction & architectural design company based in Tamil Nadu, India. Tagline: "Building Dreams. Creating Landmarks." Founders: Er. S. Suriya Raj, Er. K. Hariprasath. Goal: convert visitors into genuine construction/design enquiries. Design language: luxurious architectural (Charcoal #171717, Warm White #F8F7F3, Royal Gold #C6A15B, Concrete Grey #777777; Playfair Display + Inter). Sections: Hero, About + founders, 7 Services, Why Choose Us (6), filterable Projects gallery, 7-step Process timeline, Contact (2 phones, email, Instagram, enquiry form, WhatsApp, Google Maps placeholder). Features: sticky nav, smooth scroll, loading animation, scroll reveals, floating WhatsApp, SEO structure, functional validated enquiry form. User choices: single-page scroll site; enquiry = save + email alert + on-site confirmation; WhatsApp uses both numbers.

## Architecture
- Frontend: React (CRA + craco), Tailwind CSS, framer-motion (reveals/parallax), lenis (momentum scroll), sonner (toasts), lucide-react + custom SVG icons. Files: src/components/* (Preloader, Navbar, Hero, Marquee, About, Services, WhyChooseUs, Projects, Process, Contact, Footer, WhatsAppFloat, Logo, Reveal), src/data/content.js (single source for all copy/images — gallery easy to update), src/lib/scroll.js.
- Backend: FastAPI (server.py) — POST /api/enquiries (Pydantic validation: Indian phone regex, EmailStr, service whitelist), saves to MongoDB `enquiries`, then sends email alert via Emergent-managed Resend integration (guarded by _assert_safe_email, fixed server-side template, recipient = OWNER_EMAIL env). GET /api/ health.
- Env: backend/.env added EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME, EMAIL_REPLY_TO, OWNER_EMAIL. requirements.txt: httpx added.

## Implemented (2026-11-01)
- Full single-page site with all 7 sections + footer, sticky glass nav, mobile overlay menu
- Kinetic hero: masked line-by-line reveal, parallax bg, ken-burns, CTAs, credibility chips
- Gold editorial marquee, premium preloader with crown mark line-draw (logo also used as favicon)
- 7-card services bento (asymmetric aligned grid), 6-reason Why Choose Us, 13-item filterable portfolio with lightbox detail view, 7-step scroll-linked timeline
- Enquiry form (name/phone/email/service/location/description) with inline validation, sonner toast, on-site confirmation with reference id; saves to MongoDB
- Email alert to groundstoneconstarction1@gmail.com wired per Resend playbook (from_name=Crown Stone Construction, reply-to set)
- Click-to-call ×2, mailto, Instagram, WhatsApp buttons (both numbers) + floating WhatsApp
- Google Maps embed placeholder ("Serving all of Tamil Nadu"), SEO meta + JSON-LD LocalBusiness, data-testids throughout
- 2026-11-02: swapped to user's uploaded crown "HS" logo (public/logo.png; favicon = public/favicon.png, square padded on #171717; trimmed to content via PIL; shown in preloader/nav/footer); email updated to crownstoneconstraction1@gmail.com (frontend + OWNER_EMAIL/EMAIL_REPLY_TO)

## Personas
- Prospective homeowner in Tamil Nadu wanting construction/renovation/design
- Client needing plan approval or 2D/3D design before building

## Known Issues / Backlog
- P0: Email alert still blocked — provider (Resend) rejects crownstoneconstraction1@gmail.com as "undeliverable_recipient" (support confirmed: mailbox may not exist / typo pattern / prior hard bounce; test to delivered@resend.dev works, so integration is fine). Enquiries still save. Fix: confirm the exact working Gmail (likely "construction" spelled correctly) and update OWNER_EMAIL in backend/.env.
- P1: Replace stock gallery images with real company project photos (edit src/data/content.js)
- P1: Admin view of enquiries
- P2: WhatsApp click-to-chat per-service prefill, Instagram feed section

## Credentials
- No auth in this app. MongoDB local via MONGO_URL, DB_NAME=test_database.
