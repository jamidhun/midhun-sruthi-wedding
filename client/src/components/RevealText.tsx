import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * REVEAL TEXT
 * Each word rises out of a clipping mask (transform-only → cheap, smooth 60fps).
 * This is the site's signature motion: type that "lifts into place" like a title
 * card in a wedding film. Falls back to static text when reduced motion is set,
 * and always exposes the full string to assistive tech via aria-label.
 */
interface RevealTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function RevealText({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.08,
  duration = 0.9,
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const rise: Variants = {
    hidden: { y: "118%" },
    visible: { y: "0%", transition: { duration, ease: EASE } },
  };

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            aria-hidden
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              // keep descenders (g, y, p) from clipping at rest
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
            }}
          >
            <motion.span
              style={{ display: "inline-block", willChange: "transform" }}
              variants={rise}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </React.Fragment>
      ))}
    </motion.span>
  );
}
