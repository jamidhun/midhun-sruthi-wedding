import type { Variants } from "framer-motion";

/**
 * MOTION SYSTEM — one easing curve, calm cinematic timings.
 * A single ease-out curve is used across every reveal and transition so the
 * whole site decelerates the same way. Transform/opacity only → smooth 60fps.
 */

// The one curve, used everywhere. Soft, confident deceleration (no abrupt stops).
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Aliases kept so existing imports keep working — all point at the same curve.
export const EASE_HERO = EASE;
export const EASE_GALLERY = EASE;
export const EASE_IN_OUT = EASE;

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

// Hero title lines — staggered ~200ms, each ~1s (calm, never rushed).
export const heroText: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1.0, delay: 0.3 + i * 0.2, ease: EASE },
  }),
};

// Section entrance — gentle settle, ~1s.
export const sectionWrapper: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE } },
};

export const galleryCard: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.95, delay: i * 0.12, ease: EASE },
  }),
};

// ── General helpers ─────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, ease: EASE } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
};

// Lighter blur (8px) keeps the develop-into-focus feel without GPU jitter.
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.0, ease: EASE } },
};

export const staggerParent = (staggerChildren = 0.14, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
