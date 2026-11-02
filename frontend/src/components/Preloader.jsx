import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src="/logo.png"
            alt="Crown Stone Construction"
            className="h-20 w-auto"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="mt-6 font-serif text-lg text-warm sm:text-xl"
          >
            CROWN STONE
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-3 text-[10px] uppercase tracking-[0.4em] text-gold"
          >
            Construction
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="mt-8 h-px w-40 origin-left bg-gold/60"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
