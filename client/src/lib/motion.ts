import type { Variants } from "framer-motion";

/**
 * MOTION SYSTEM
 * Shared easings + reveal variants. The blueprint's exact section settings live
 * here (heroText, sectionWrapper, galleryCard) alongside general-purpose helpers
 * used across the page. Transform/opacity/filter only → smooth 60fps.
 */

// Easings (blueprint §5)
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];          // section wrappers
export const EASE_HERO: [number, number, number, number] = [0.25, 1, 0.5, 1];      // hero text
export const EASE_GALLERY: [number, number, number, number] = [0.16, 1, 0.3, 1];   // gallery cards
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

// ── Blueprint §5 — exact section variants ──────────────────────────────────
export const heroText: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1.0, delay: 0.2 + i * 0.2, ease: EASE_HERO },
  }),
  exit: { y: -20, opacity: 0, transition: { duration: 0.6, ease: EASE_HERO } },
};

export const sectionWrapper: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.1, ease: EASE } },
};

export const galleryCard: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: (i: number = 0) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.15, ease: EASE_GALLERY },
  }),
};

// ── General helpers used by the content sections ───────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, ease: EASE } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: EASE } },
};

export const staggerParent = (staggerChildren = 0.12, delayChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
