import { useEffect, useState } from "react";

/**
 * Mobile Optimization Hook
 * Detects device type and optimizes animations and interactions accordingly
 */
export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile and tablet
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    // Detect touch capability
    const hasTouch = () => {
      return (
        window.matchMedia("(pointer:coarse)").matches ||
        window.matchMedia("(hover:none)").matches ||
        navigator.maxTouchPoints > 0
      );
    };

    // Detect prefers-reduced-motion
    const handleMotionPreference = () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPrefersReducedMotion(prefersReduced);
    };

    handleResize();
    setIsTouch(hasTouch());
    handleMotionPreference();

    window.addEventListener("resize", handleResize);
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isTouch,
    prefersReducedMotion,
    // Animation duration multiplier (0.5x if reduced motion, 1x otherwise)
    animationDurationMultiplier: prefersReducedMotion ? 0.5 : 1,
    // Blur intensity for mobile (5px) vs desktop (20px)
    blurIntensity: isMobile ? 5 : 20,
    // Stagger delay (50ms mobile, 100ms desktop)
    staggerDelay: isMobile ? 50 : 100,
  };
}
