import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { CONTACT, SERVICE_OPTIONS, waLink } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { WhatsAppIcon, InstagramIcon } from "./Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api/enquiries`;

const initialValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  description: "",
};

const validate = (v) => {
  const errs = {};
  if (v.name.trim().length < 3) errs.name = "Please enter your full name";
  const phone = v.phone.replace(/[\s-]/g, "");
  if (!/^(\+91)?[6-9]\d{9}$/.test(phone))
    errs.phone = "Enter a valid 10-digit phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    errs.email = "Enter a valid email address";
  if (!v.service) errs.service = "Please select a service";
  if (v.location.trim().length < 3)
    errs.location = "Please enter your project location";
  if (v.description.trim().length < 10)
    errs.description = "Tell us a little more (minimum 10 characters)";
  return errs;
};

const inputCls = (err) =>
  `w-full border bg-transparent px-4 py-3.5 text-sm text-warm placeholder:text-warm/35 outline-none transition-colors duration-300 ${
    err
      ? "border-red-400/70 focus:border-red-400"
      : "border-warm/20 focus:border-gold"
  }`;

const ErrorText = ({ id, msg }) =>
  msg ? (
    <p id={id} className="mt-2 text-xs text-red-400" role="alert">
      {msg}
    </p>
  ) : null;

const ContactCard = ({ icon, label, children, href, testid, external }) => {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.25em] text-warm/45">
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-warm">
          {children}
        </span>
      </span>
    </>
  );
  const cls =
    "group flex items-center gap-4 border border-warm/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06]";
  return href ? (
    <a
      href={href}
      data-testid={testid}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <div data-testid={testid} className={cls}>
      {inner}
    </div>
  );
};

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const set = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please correct the highlighted fields");
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(API, values);
      setConfirmed({ ...values, id: data.enquiry_id });
      setValues(initialValues);
      toast.success("Enquiry received — we will reach out to you shortly");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? "Please check the highlighted fields"
        : detail || "Something went wrong. Please try again or call us directly";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="Contact Us"
          title="Let's Build Something Extraordinary."
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-warm/60">
            Have a construction or design project in mind? Connect with our
            team today and let's bring your vision to life.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-4">
            <Reveal delay={0.1}>
              <ContactCard
                icon={<Phone className="h-[18px] w-[18px]" />}
                label="Call Us"
                href={CONTACT.phone1Tel}
                testid="phone-link-1"
              >
                {CONTACT.phone1Display}
              </ContactCard>
            </Reveal>
            <Reveal delay={0.16}>
              <ContactCard
                icon={<Phone className="h-[18px] w-[18px]" />}
                label="Call Us"
                href={CONTACT.phone2Tel}
                testid="phone-link-2"
              >
                {CONTACT.phone2Display}
              </ContactCard>
            </Reveal>
            <Reveal delay={0.22}>
              <ContactCard
                icon={<Mail className="h-[18px] w-[18px]" />}
                label="Email Us"
                href={`mailto:${CONTACT.email}`}
                testid="email-link"
              >
                {CONTACT.email}
              </ContactCard>
            </Reveal>
            <Reveal delay={0.28}>
              <ContactCard
                icon={<InstagramIcon className="h-[18px] w-[18px]" />}
                label="Instagram"
                href={CONTACT.instagramUrl}
                testid="instagram-link"
                external
              >
                {CONTACT.instagramHandle}
              </ContactCard>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={waLink(CONTACT.phone1Wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-enquiry-btn-1"
                  className="flex items-center justify-center gap-2.5 bg-[#1faa54] px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#25c061]"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  WhatsApp {CONTACT.phone1Display.slice(3, 8)}…
                </a>
                <a
                  href={waLink(CONTACT.phone2Wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-enquiry-btn-2"
                  className="flex items-center justify-center gap-2.5 border border-[#1faa54]/70 px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#4bd07f] transition-all duration-300 hover:bg-[#1faa54]/15"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  WhatsApp {CONTACT.phone2Display.slice(3, 8)}…
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4} className="mt-2 flex-1">
              <div className="relative h-full min-h-[240px] border border-gold/25">
                <iframe
                  title="Crown Stone Construction location — Tamil Nadu, India"
                  src="https://www.google.com/maps?q=Tamil+Nadu,India&output=embed"
                  className="map-dark h-full min-h-[240px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-ink/90 px-4 py-2.5">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-warm">
                    Serving All Of Tamil Nadu
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <AnimatePresence mode="wait">
              {confirmed ? (
                <motion.div
                  key="confirmation"
                  data-testid="enquiry-confirmation"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full flex-col items-start justify-center border border-gold/40 bg-white/[0.03] p-8 sm:p-12"
                >
                  <CheckCircle2 className="h-14 w-14 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-6 font-serif text-3xl font-semibold text-warm">
                    Thank You, {confirmed.name.split(" ")[0]}.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-warm/65">
                    Your enquiry has been received and saved with the reference
                    below — our team will call you back shortly.
                  </p>
                  <p className="mt-3 border border-gold/30 px-4 py-2 font-mono text-xs text-gold">
                    Ref: {confirmed.id.slice(0, 8).toUpperCase()}
                  </p>
                  <button
                    data-testid="enquiry-send-another-btn"
                    onClick={() => setConfirmed(null)}
                    className="mt-8 flex items-center gap-2 border border-gold/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
                  >
                    Send Another Enquiry
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  data-testid="enquiry-form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-warm/10 bg-white/[0.03] p-7 sm:p-9"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="enq-name" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-warm/55">
                        Full Name *
                      </label>
                      <input
                        id="enq-name"
                        data-testid="enquiry-name-input"
                        value={values.name}
                        onChange={set("name")}
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        className={inputCls(errors.name)}
                      />
                      <ErrorText id="err-name" msg={errors.name} />
                    </div>
                    <div>
                      <label htmlFor="enq-phone" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-warm/55">
                        Phone Number *
                      </label>
                      <input
                        id="enq-phone"
                        data-testid="enquiry-phone-input"
                        value={values.phone}
                        onChange={set("phone")}
                        placeholder="+91 98765 43210"
                        inputMode="tel"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "err-phone" : undefined}
                        className={inputCls(errors.phone)}
                      />
                      <ErrorText id="err-phone" msg={errors.phone} />
                    </div>
                    <div>
                      <label htmlFor="enq-email" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-warm/55">
                        Email Address *
                      </label>
                      <input
                        id="enq-email"
                        data-testid="enquiry-email-input"
                        value={values.email}
                        onChange={set("email")}
                        placeholder="you@example.com"
                        inputMode="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "err-email" : undefined}
                        className={inputCls(errors.email)}
                      />
                      <ErrorText id="err-email" msg={errors.email} />
                    </div>
                    <div>
                      <label htmlFor="enq-service" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-warm/55">
                        Service Required *
                      </label>
                      <select
                        id="enq-service"
                        data-testid="enquiry-service-select"
                        value={values.service}
                        onChange={set("service")}
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? "err-service" : undefined}
                        className={`${inputCls(errors.service)} appearance-none ${
                          values.service ? "text-warm" : "text-warm/35"
                        } [&>option]:bg-ink [&>option]:text-warm`}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ErrorText id="err-service" msg={errors.service} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="enq-location" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-warm/55">
                        Project Location *
                      </label>
                      <input
                        id="enq-location"
                        data-testid="enquiry-location-input"
                        value={values.location}
                        onChange={set("location")}
                        placeholder="City / town, Tamil Nadu"
                        aria-invalid={!!errors.location}
                        aria-describedby={errors.location ? "err-location" : undefined}
                        className={inputCls(errors.location)}
                      />
                      <ErrorText id="err-location" msg={errors.location} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="enq-description" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-warm/55">
                        Project Description *
                      </label>
                      <textarea
                        id="enq-description"
                        data-testid="enquiry-description-input"
                        value={values.description}
                        onChange={set("description")}
                        placeholder="Tell us about your site, plot size, and what you dream of building…"
                        rows={4}
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? "err-description" : undefined}
                        className={`${inputCls(errors.description)} resize-none`}
                      />
                      <ErrorText id="err-description" msg={errors.description} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-testid="enquiry-submit-btn"
                    disabled={sending}
                    className="mt-7 flex w-full items-center justify-center gap-3 bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-[#d8b877] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Enquiry…
                      </>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </button>
                  <p className="mt-4 text-center text-xs text-warm/40">
                    We usually respond within one working day.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
