import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, CONTACT, SERVICES, waLink } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";
import { CrownMark, WhatsAppIcon, InstagramIcon } from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer data-testid="footer" className="border-t border-warm/10 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <CrownMark className="h-12 w-12" />
            <p className="mt-5 font-serif text-2xl font-semibold text-warm">
              Crown Stone Construction
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-gold">
              Building Dreams. Creating Landmarks.
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-warm/50">
              Premium construction, architectural planning and design services
              across Tamil Nadu, India — founded by Er. S. Suriya Raj and
              Er. K. Hariprasath.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-testid={`footer-link-${l.href.replace("#", "")}`}
                    onClick={(e) => go(e, l.href)}
                    className="text-sm text-warm/60 transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    data-testid={`footer-service-${s.id}`}
                    onClick={(e) => go(e, "#services")}
                    className="text-sm text-warm/60 transition-colors duration-300 hover:text-gold"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Get In Touch
            </p>
            <ul className="mt-5 space-y-3 text-sm text-warm/60">
              <li>
                <a
                  href={CONTACT.phone1Tel}
                  data-testid="footer-phone-link-1"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  {CONTACT.phone1Display}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phone2Tel}
                  data-testid="footer-phone-link-2"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  {CONTACT.phone2Display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-testid="footer-email-link"
                  className="break-all transition-colors duration-300 hover:text-gold"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagramUrl}
                  data-testid="footer-instagram-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {CONTACT.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={waLink(CONTACT.phone1Wa)}
                  data-testid="footer-whatsapp-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp Us Anytime
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-warm/10 pt-8 text-xs text-warm/40 sm:flex-row">
          <p data-testid="footer-copyright">
            © {year} Crown Stone Construction. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Founded by Er. S. Suriya Raj & Er. K. Hariprasath — Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  );
}
