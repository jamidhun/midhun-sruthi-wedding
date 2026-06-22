import { motion, useReducedMotion } from "framer-motion";

/**
 * VINYL PLAYER (blueprint §2)
 * 120px disc (80px on mobile), 33⅓ RPM (1.8s / rotation, linear). The tonearm
 * needle drops first (−15° → 25°, 0.3s), then the disc begins to spin; on pause
 * the disc stops instantly and the needle lifts. Wood base, brass active glow.
 */
interface VinylPlayerProps {
  playing: boolean;
  onToggle: () => void;
}

export function VinylPlayer({ playing, onToggle }: VinylPlayerProps) {
  const reduce = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="relative grid h-20 w-20 place-items-center rounded-full wood md:h-[120px] md:w-[120px]"
        style={{
          border: "1px solid var(--hairline)",
          boxShadow: playing ? "0 0 28px rgba(201,160,89,0.3)" : "0 6px 18px rgba(0,0,0,0.45)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Disc */}
        <motion.span
          className="relative grid place-items-center rounded-full"
          style={{
            width: "76%",
            height: "76%",
            background:
              "repeating-radial-gradient(circle at 50% 50%, #161616 0px, #161616 1.2px, #0c0c0c 2.4px, #0c0c0c 3.6px)",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
          animate={reduce ? {} : { rotate: playing ? 360 : 0 }}
          transition={
            playing && !reduce
              ? { duration: 1.8, repeat: Infinity, ease: "linear" }
              : { duration: 0.01 }
          }
        >
          {/* label + spindle */}
          <span className="grid h-1/3 w-1/3 place-items-center rounded-full" style={{ background: "var(--primary-gold)" }}>
            <span className="h-1 w-1 rounded-full" style={{ background: "#1a1206" }} />
          </span>
        </motion.span>

        {/* Tonearm + needle */}
        <motion.span
          className="absolute right-1 top-1 origin-top-right"
          style={{ width: "46%", height: 3 }}
          initial={false}
          animate={{ rotate: playing ? 25 : -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full" style={{ background: "var(--gold)" }} />
          <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full" style={{ background: "linear-gradient(to left, #cdb06a, #6b5a32)" }} />
          <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full" style={{ background: "var(--gold)" }} />
        </motion.span>
      </motion.button>
    </div>
  );
}
