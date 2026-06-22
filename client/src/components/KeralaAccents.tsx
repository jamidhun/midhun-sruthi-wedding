import { motion } from "framer-motion";

/**
 * KERALA ACCENTS (blueprint §8) — used as 5–10% visual whispers, never themes.
 * A minimalist single-line temple-bell silhouette, revealed faintly on scroll.
 */
export function BellWatermark({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none flex justify-center ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 0.05, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <svg width="60" height="84" viewBox="0 0 60 84" fill="none">
        <path d="M30 6 v8" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="30" cy="5" r="3" stroke="var(--gold)" strokeWidth="1" />
        <path d="M18 56 C18 34 22 16 30 16 C38 16 42 34 42 56 Z" stroke="var(--gold)" strokeWidth="1" />
        <path d="M14 56 h32" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
        <path d="M30 56 v10" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="30" cy="70" r="3" stroke="var(--gold)" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}
