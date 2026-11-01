import { motion } from "framer-motion";
import { IMAGES, FOUNDER_PROFILES } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

const VALUES = ["Structural Integrity", "Architectural Artistry", "Timely Handover"];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="bg-warm py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="About Us" title="Building Trust Through Excellence" />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                Crown Stone Construction is committed to delivering high-quality
                construction, architectural planning, renovation, and interior
                design solutions. We combine engineering expertise, creative
                design, and professional execution to transform spaces into
                extraordinary living and working environments.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-3">
                {VALUES.map((v) => (
                  <span
                    key={v}
                    className="border border-ink/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70 transition-colors duration-300 hover:border-gold hover:text-ink"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-12 border-l-2 border-gold pl-6">
                <p className="font-serif text-2xl italic leading-snug text-ink/85">
                  "Building Dreams. Creating Landmarks."
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-concrete">
                  Our Promise, On Every Site
                </p>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -right-3 -top-3 h-full w-full border border-gold/50 sm:-right-5 sm:-top-5" />
                <motion.img
                  src={IMAGES.aboutMain}
                  alt="Modern luxury residence built by Crown Stone Construction"
                  className="relative aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <motion.img
                src={IMAGES.aboutSecondary}
                alt="Poolside villa architecture detail"
                className="absolute -bottom-10 right-4 hidden w-56 border-4 border-warm object-cover shadow-2xl sm:block lg:w-64"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-24 lg:mt-32">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Founded & Led By
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {FOUNDER_PROFILES.map((f, i) => (
              <Reveal key={f.name} delay={0.1 + i * 0.12}>
                <div
                  data-testid={`founder-card-${i + 1}`}
                  className="group flex h-full items-center gap-6 bg-ink p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,23,23,0.25)] sm:p-8"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/60 transition-colors duration-300 group-hover:border-gold sm:h-20 sm:w-20">
                    <span className="font-serif text-xl text-gold sm:text-2xl">
                      {f.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-warm sm:text-2xl">
                      {f.name}
                    </h3>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-gold">
                      {f.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
