import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_STEPS } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

const StepCard = ({ s, i }) => (
  <Reveal delay={0.05}>
    <div
      data-testid={`process-step-${i + 1}`}
      className="group relative bg-white p-7 shadow-[0_10px_40px_rgba(23,23,23,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(23,23,23,0.12)] sm:p-8"
    >
      <span className="absolute right-6 top-6 font-serif text-4xl italic text-gold/25 transition-colors duration-500 group-hover:text-gold/50">
        {s.step}
      </span>
      <h3 className="max-w-[75%] font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {s.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/65">{s.desc}</p>
      <span className="mt-6 block h-0.5 w-10 bg-gold transition-all duration-500 group-hover:w-20" />
    </div>
  </Reveal>
);

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" data-testid="process-section" className="bg-warm py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Working Process"
          title="From First Sketch To Final Handover"
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-[7px] top-0 h-full w-px bg-ink/10 lg:left-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[7px] top-0 h-full w-px origin-top bg-gold lg:left-1/2"
          />

          <div className="flex flex-col gap-10 lg:gap-14">
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.step}
                className={`relative flex flex-col pl-10 lg:w-1/2 lg:pl-0 ${
                  i % 2 === 0
                    ? "lg:pr-14 lg:items-end"
                    : "lg:ml-auto lg:pl-14"
                }`}
              >
                <span
                  className={`absolute top-8 flex h-4 w-4 items-center justify-center lg:top-9 ${
                    i % 2 === 0 ? "left-0 lg:left-auto lg:-right-2" : "left-0 lg:-left-2"
                  }`}
                >
                  <span className="h-3.5 w-3.5 rotate-45 border-2 border-gold bg-warm" />
                </span>
                <div className="w-full lg:max-w-md">
                  <StepCard s={s} i={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
