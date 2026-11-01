import { motion } from "framer-motion";
import { CONTACT, waLink } from "@/data/content";
import { WhatsAppIcon } from "./Logo";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink(CONTACT.phone1Wa)}
      data-testid="whatsapp-float-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Crown Stone Construction on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 0.5, type: "spring", bounce: 0.45 }}
      className="group fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#1faa54] text-white shadow-[0_10px_30px_rgba(31,170,84,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#25c061]"
    >
      <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#1faa54]" />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-warm/10 bg-ink px-4 py-2 text-xs text-warm opacity-0 transition-all duration-300 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
