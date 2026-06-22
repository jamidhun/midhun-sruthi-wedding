import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/RevealText";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * COUNTDOWN
 * Numbers in display serif on quiet surfaces — gold reserved for the unit labels
 * and a single top hairline. Each value crossfades softly on change rather than
 * spinning. Units reveal in a gentle stagger on scroll.
 */
export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const target = new Date(weddingData.wedding.date).getTime();
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section className="relative w-full px-6 py-28 md:px-8 md:py-36 lg:py-44">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerParent(0.1)}
        >
          <motion.p className="eyebrow mb-5" variants={fadeUp}>
            {weddingData.countdown.subtitle}
          </motion.p>
          <motion.h2
            className="font-light"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              color: "var(--paper)",
            }}
            variants={fadeUp}
          >
            <RevealText text={weddingData.countdown.title} />
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerParent(0.1, 0.1)}
        >
          {units.map((u) => (
            <motion.div key={u.label} variants={fadeUp}>
              <div
                className="relative overflow-hidden rounded-md px-4 py-8 text-center md:py-10"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--hairline)" }}
              >
                <span
                  className="absolute left-1/2 top-0 h-px w-12 -translate-x-1/2"
                  style={{ background: "var(--gold)", opacity: 0.6 }}
                />
                <div
                  className="relative h-[1.05em] tabular-nums"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 7vw, 3.75rem)",
                    fontWeight: 300,
                    color: "var(--paper)",
                  }}
                >
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={u.value}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, y: "0.35em" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "-0.35em" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {String(u.value).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="eyebrow mt-4" style={{ fontSize: "0.6rem" }}>
                  {u.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
