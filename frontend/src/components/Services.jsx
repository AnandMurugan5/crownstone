import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { scrollToSection } from "@/lib/scroll";

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            dark
            eyebrow="Our Services"
            title="Comprehensive Construction & Architectural Solutions"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-warm/50">
              From the first sketch to the final coat of paint — one team, one
              standard of excellence.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={0.06 * (i % 3)} className={`col-span-1 sm:col-span-1 lg:col-span-12 ${s.span}`}>
              <motion.article
                data-testid={`service-card-${kebab(s.title)}`}
                className="group relative h-full min-h-[280px] overflow-hidden lg:min-h-[300px]"
                whileHover="hover"
              >
                <motion.img
                  src={s.image}
                  alt={`${s.title} — Crown Stone Construction`}
                  variants={{ hover: { scale: 1.07 } }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-opacity duration-500" />
                <div
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/50"
                />
                <div className="relative flex h-full flex-col justify-end p-7 sm:p-8">
                  <span className="font-serif text-sm italic text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-warm sm:text-[1.7rem]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-warm/65">
                    {s.description}
                  </p>
                  <button
                    data-testid={`service-enquire-${kebab(s.title)}`}
                    onClick={() => scrollToSection("#contact")}
                    className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:gap-3.5"
                  >
                    Enquire Now
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <span className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-24" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
