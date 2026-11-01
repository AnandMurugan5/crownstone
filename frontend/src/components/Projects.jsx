import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { scrollToSection, stopLenis, startLenis } from "@/lib/scroll";

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  useEffect(() => {
    if (!active) return;
    stopLenis();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      startLenis();
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="portfolio" data-testid="portfolio-section" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            dark
            eyebrow="Our Projects"
            title="A Showcase of Craft & Design"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-warm/50">
              A curated preview of our design and construction work — the
              gallery is refreshed with new project photographs as work
              completes.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-2 border-y border-warm/10 py-5">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-testid={`portfolio-filter-${kebab(cat)}`}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                  filter === cat
                    ? "bg-gold text-ink"
                    : "text-warm/60 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.button
                layout
                key={p.id}
                data-testid={`project-card-${p.id}`}
                onClick={() => setActive(p)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block aspect-[4/3] overflow-hidden text-left"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-4 border border-gold/0 transition-all duration-500 group-hover:border-gold/40" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
                    {p.category}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-warm">
                      {p.title}
                    </h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-warm/30 text-warm opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="project-lightbox"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-gold/25 bg-[#1d1d1d] md:grid-cols-2 md:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.image}
                alt={active.title}
                className="h-64 w-full object-cover md:h-full md:min-h-[420px]"
              />
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                  {active.category}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-warm sm:text-3xl">
                  {active.title}
                </h3>
                <span className="mt-5 h-px w-14 bg-gold/70" />
                <p className="mt-5 text-sm leading-relaxed text-warm/65">
                  {active.description}
                </p>
                <button
                  data-testid="lightbox-enquire-cta"
                  onClick={() => {
                    setActive(null);
                    setTimeout(() => scrollToSection("#contact"), 100);
                  }}
                  className="mt-8 flex w-fit items-center gap-2 bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-[#d8b877]"
                >
                  Discuss a Similar Project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                data-testid="lightbox-close-btn"
                onClick={() => setActive(null)}
                aria-label="Close project view"
                className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center bg-gold text-ink transition-colors hover:bg-[#d8b877]"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
