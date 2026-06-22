import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { weddingData } from "@/data/wedding";

/**
 * ENVELOPE REVEAL (blueprint §3) — a physical-feeling opening.
 * Tap the wax seal: the top flap rotates open on its X-axis (180°), the card
 * slides up out of the envelope on a soft spring, then the page is revealed.
 * The tap also starts the music, satisfying autoplay policies.
 */
interface EnvelopeRevealProps {
  onReveal: () => void;
  onStartMusic: () => void;
}

const SPRING = { type: "spring" as const, stiffness: 120, damping: 14, mass: 1.2 };

export function EnvelopeReveal({ onReveal, onStartMusic }: EnvelopeRevealProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { couple, wedding } = weddingData;

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    onStartMusic();
    setTimeout(onReveal, reduce ? 60 : 1600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-6"
      style={{ background: "radial-gradient(120% 120% at 50% 30%, #131009, #080808 65%)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative" style={{ perspective: 1200, width: "min(90vw, 420px)" }}>
        {/* Card that slides up out of the envelope */}
        <motion.div
          className="absolute inset-x-4 bottom-6 z-10 rounded-md px-6 py-8 text-center mural"
          style={{ background: "linear-gradient(160deg, #161616, #0d0d0d)", border: "1px solid var(--hairline)" }}
          initial={false}
          animate={open ? { y: -120, opacity: 1 } : { y: 0, opacity: 0 }}
          transition={open ? SPRING : { duration: 0.3 }}
        >
          <p className="eyebrow mb-3" style={{ fontSize: "0.6rem" }}>You are invited</p>
          <p className="font-light" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--paper)" }}>
            {couple.groomName} <span style={{ color: "var(--gold)" }}>&amp;</span> {couple.brideName}
          </p>
          <p className="mt-2 text-[0.85rem]" style={{ color: "var(--paper-dim)" }}>{wedding.displayDate}</p>
        </motion.div>

        {/* Envelope body */}
        <div
          className="relative z-20 overflow-hidden rounded-md"
          style={{ aspectRatio: "3 / 2", background: "linear-gradient(160deg, #1c1a16, #100e0b)", border: "1px solid var(--hairline)" }}
        >
          {/* diagonal seams */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 49.6%, rgba(212,175,55,0.12) 50%, transparent 50.4%), linear-gradient(225deg, transparent 49.6%, rgba(212,175,55,0.12) 50%, transparent 50.4%)" }} />
        </div>

        {/* Top flap (opens on X axis) */}
        <motion.div
          className="absolute left-0 right-0 top-0 z-30 origin-top"
          style={{
            height: "50%",
            transformStyle: "preserve-3d",
            background: "linear-gradient(160deg, #211e19, #15120d)",
            borderTop: "1px solid var(--hairline)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
          initial={false}
          animate={{ rotateX: open && !reduce ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Wax seal */}
        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label="Open the invitation"
          className="absolute left-1/2 top-1/2 z-40 flex items-center justify-center rounded-full"
          style={{
            width: 60,
            height: 60,
            marginLeft: -30,
            marginTop: -30,
            background: "radial-gradient(circle at 35% 30%, #d9b65a, #9c7b2e 70%)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.5), inset 0 0 8px rgba(0,0,0,0.35)",
          }}
          animate={open ? { scale: 0, opacity: 0 } : { scale: [1, 1.05, 1] }}
          transition={open ? { duration: 0.4 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.1rem", color: "#2a1f08" }}>
            {couple.initials.replace(/\s/g, "")}
          </span>
        </motion.button>
      </div>

      {/* Hint */}
      <motion.p
        className="eyebrow absolute bottom-16 left-0 right-0 text-center"
        animate={open ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: open ? 0 : Infinity, ease: "easeInOut" }}
      >
        Tap the seal to open
      </motion.p>
    </motion.div>
  );
}
