import { motion, useScroll, useSpring } from "framer-motion";

/** Scroll progress — a fine gold line at the very top that fills as you read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left"
      style={{ scaleX, background: "linear-gradient(to right, rgba(201,164,92,0.4), var(--gold))" }}
      aria-hidden
    />
  );
}
