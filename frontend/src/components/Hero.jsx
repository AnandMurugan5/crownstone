import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";

const HEADLINE = [
  { pre: "Building ", accent: "Dreams", post: "." },
  { pre: "Creating ", accent: "Landmarks", post: "." },
];

const CHIPS = [
  "Residential & Commercial",
  "2D & 3D Architectural Design",
  "Turnkey Execution",
  "Tamil Nadu, India",
];

export default function Hero({ started }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const anim = (delay) => ({
    initial: { y: "115%" },
    animate: started ? { y: "0%" } : {},
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.img
          src={IMAGES.hero}
          alt="Premium modern residential villa designed by Crown Stone Construction"
          initial={{ scale: 1.18 }}
          animate={started ? { scale: 1.08 } : {}}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8"
      >
        <div className="overflow-hidden">
          <motion.div
            {...anim(0.35)}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold sm:text-xs">
              Crown Stone Construction — Tamil Nadu
            </p>
          </motion.div>
        </div>

        <h1 className="mt-8 font-serif text-5xl font-semibold leading-[1.05] text-warm sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          {HEADLINE.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span {...anim(0.55 + i * 0.18)} className="block">
                {line.pre}
                <em className="italic text-gold">{line.accent}</em>
                {line.post}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="overflow-hidden">
          <motion.p
            {...anim(1.05)}
            className="mt-8 max-w-xl text-base leading-relaxed text-warm/75 sm:text-lg"
          >
            From innovative architectural designs to exceptional construction,
            Crown Stone Construction transforms your vision into reality.
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.div {...anim(1.2)} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              data-testid="hero-explore-services-cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#services");
              }}
              className="bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-[#d8b877] hover:shadow-[0_0_36px_rgba(198,161,91,0.35)]"
            >
              Explore Our Services
            </a>
            <a
              href="#contact"
              data-testid="hero-free-consultation-cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="group flex items-center gap-2 border border-gold/60 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-warm transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              Get a Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            {...anim(1.4)}
            className="mt-16 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            {CHIPS.map((chip, i) => (
              <span
                key={chip}
                className="flex items-center gap-5 text-[11px] uppercase tracking-[0.22em] text-warm/55"
              >
                {i > 0 && <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />}
                {chip}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-warm/50">
          Scroll
        </span>
        <span className="h-12 w-px animate-scroll-cue bg-gold/80" />
      </motion.div>
    </section>
  );
}
