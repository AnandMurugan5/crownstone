import { motion } from "framer-motion";

export const Reveal = ({
  children,
  delay = 0,
  y = 32,
  className = "",
  once = true,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({
  eyebrow,
  title,
  dark = false,
  align = "left",
}) => (
  <div className={align === "center" ? "text-center" : "text-left"}>
    <Reveal>
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
        {eyebrow}
      </p>
      <div
        className={`mt-4 h-px w-16 bg-gold/70 ${align === "center" ? "mx-auto" : ""}`}
      />
      <h2
        className={`mt-6 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-warm" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  </div>
);
