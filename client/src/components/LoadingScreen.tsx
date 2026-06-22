import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";

/**
 * CINEMATIC LOADER (blueprint §1) — three stages:
 *   1. Init  (0.8s): monogram pulses.
 *   2. Build (1.5s): backdrop blur eases 20px → 5px, brass glow 0.2 → 0.8.
 *   3. Reveal(1.2s): the curtain splits vertically and lifts away.
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
    const t1 = setTimeout(() => setStage("build"), 800);
    const t2 = setTimeout(() => setStage("reveal"), 800 + 1500);
    const t3 = setTimeout(onComplete, 800 + 1500 + 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete, reduce]);

  const parted = stage === "reveal" && !reduce;

  const Curtain = ({ side }: { side: "left" | "right" }) => (
    <motion.div
      className="absolute top-0 h-full w-1/2 mural"
      style={{ [side]: 0, background: "linear-gradient(160deg, #15110A 0%, #080808 100%)" }}
      initial={false}
      animate={{ x: parted ? (side === "left" ? "-100%" : "100%") : "0%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    />
  );

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      aria-hidden
    >
      <Curtain side="left" />
      <Curtain side="right" />

      <motion.div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center"
        animate={{
          opacity: parted ? 0 : 1,
          filter: stage === "init" ? "blur(20px)" : stage === "build" ? "blur(5px)" : "blur(0px)",
        }}
        transition={{ duration: stage === "build" ? 1.5 : 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-full"
          style={{ border: "1px solid var(--hairline)" }}
          animate={{
            scale: stage === "init" && !reduce ? [1, 1.06, 1] : 1,
            boxShadow:
              stage === "init"
                ? "0 0 40px rgba(212,175,55,0.2)"
                : "0 0 60px rgba(212,175,55,0.45)",
          }}
          transition={{
            scale: { duration: 1.6, repeat: stage === "init" ? Infinity : 0, ease: "easeInOut" },
            boxShadow: { duration: 1.5, ease: "easeOut" },
          }}
        >
          <span
            className="font-light italic"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--gold)" }}
          >
            {weddingData.couple.initials}
          </span>
        </motion.div>

        <motion.p
          className="eyebrow mt-8"
          animate={{ opacity: stage === "init" ? 0.5 : 1 }}
          transition={{ duration: 0.8 }}
        >
          {weddingData.loadingScreen.subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
