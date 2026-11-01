import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";
import { LogoLockup, WhatsAppIcon } from "./Logo";

export default function Navbar({ started }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToSection(href), open ? 250 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={started ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/20 bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#hero"
            data-testid="nav-logo"
            onClick={(e) => go(e, "#hero")}
            aria-label="Crown Stone Construction — home"
          >
            <LogoLockup />
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.href.replace("#", "")}`}
                onClick={(e) => go(e, l.href)}
                className="group relative text-[12px] font-medium uppercase tracking-[0.18em] text-warm/70 transition-colors hover:text-warm"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href="#contact"
              data-testid="nav-quote-cta"
              onClick={(e) => go(e, "#contact")}
              className="group flex items-center gap-2 border border-gold/60 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              Get Free Quote
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            data-testid="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center border border-warm/20 text-warm lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-ink/[0.98] px-6 pb-10 pt-28 backdrop-blur-sm lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  data-testid={`mobile-nav-link-${l.href.replace("#", "")}`}
                  onClick={(e) => go(e, l.href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.06 * i }}
                  className="border-b border-warm/10 py-4 font-serif text-3xl text-warm transition-colors hover:text-gold"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-3 text-sm text-warm/60"
            >
              <a
                href={CONTACT.phone1Tel}
                data-testid="mobile-nav-phone"
                className="text-warm"
              >
                {CONTACT.phone1Display}
              </a>
              <a
                href={`https://wa.me/${CONTACT.phone1Wa}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-nav-whatsapp"
                className="flex items-center gap-2 text-gold"
              >
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <p className="text-xs uppercase tracking-[0.3em] text-warm/40">
                Tamil Nadu, India
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
