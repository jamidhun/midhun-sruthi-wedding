import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";
import { EASE } from "@/lib/motion";

/**
 * CINEMATIC LOADER — three calm stages over ~1.8s:
 *   1. Init  (0.4s): monogram settles with a soft brass glow.
 *   2. Build (0.8s): backdrop blur eases away, glow deepens.
 *   3. Reveal(0.6s): the curtain parts and lifts the panel away.
 */
interface LoadingScreenProps {
  onComplete: () => void;
}

type Stage = "init" | "build" | "reveal";

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("init");

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setStage("build"), 400);
    const t2 = setTimeout(() => setStage("reveal"), 400 + 800);
    const t3 = setTimeout(onComplete, 400 + 800 + 600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete, reduce]);

  const parted = stage === "reveal" && !reduce;

  const Curtain = ({ side }: { side: "left" | "right" }) => (
    <motion.div
      className="absolute top-0 h-full w-1/2"
      style={{ [side]: 0, background: "linear-gradient(160deg, #15110A 0%, #080808 100%)" }}
      initial={false}
      animate={{ x: parted ? (side === "left" ? "-100%" : "100%") : "0%" }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      aria-hidden
    >
      <Curtain side="left" />
      <Curtain side="right" />

      <motion.div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center"
        animate={{
          opacity: parted ? 0 : 1,
          filter: stage === "init" ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-full"
          style={{ border: "1px solid var(--hairline)" }}
          initial={{ scale: 0.96 }}
          animate={{
            scale: 1,
            boxShadow: stage === "init" ? "0 0 30px rgba(212,175,55,0.2)" : "0 0 56px rgba(212,175,55,0.4)",
          }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <span className="font-light italic" style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--gold)" }}>
            {weddingData.couple.initials}
          </span>
        </motion.div>

        <motion.p
          className="eyebrow mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === "init" ? 0.6 : 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {weddingData.loadingScreen.subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
