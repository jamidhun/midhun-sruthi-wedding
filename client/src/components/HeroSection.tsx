import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { heroText, EASE_HERO } from "@/lib/motion";

/**
 * HERO — staggered title lines per blueprint §5 (y:40→0, 0.2s cascade,
 * ease [0.25,1,0.5,1]) over a slowly pushing, parallaxing photo. Falls back to
 * an elegant graded placeholder when hero-1.jpg isn't present.
 */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1.05, 1.05] : [1.05, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden" style={{ backgroundColor: "#080808" }}>
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {!failed ? (
          <motion.img
            src={weddingData.hero.backgroundImage}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: bgScale, willChange: "transform" }}
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? {} : { opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE_HERO }}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% 25%, rgba(201,164,92,0.14), transparent 55%), linear-gradient(160deg, #17130C 0%, #080808 100%)" }} />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.42) 0%, rgba(8,8,8,0.3) 35%, rgba(8,8,8,0.8) 80%, #080808 100%)" }} />
      </motion.div>

      <motion.div
        className="relative z-10 px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow mb-7" variants={heroText} custom={0}>
          {weddingData.hero.subtitle}
        </motion.p>

        <h1 className="font-light leading-[0.92]" style={{ fontFamily: "var(--font-display)", color: "var(--paper)", letterSpacing: "-0.02em" }}>
          <motion.span className="block" style={{ fontSize: "clamp(3.4rem, 13vw, 8.5rem)" }} variants={heroText} custom={1}>
            {weddingData.couple.groomName}
          </motion.span>
          <motion.span className="my-1 block italic" style={{ color: "var(--gold)", fontSize: "clamp(1.8rem, 5vw, 3.2rem)" }} variants={heroText} custom={2}>
            &amp;
          </motion.span>
          <motion.span className="block" style={{ fontSize: "clamp(3.4rem, 13vw, 8.5rem)" }} variants={heroText} custom={3}>
            {weddingData.couple.brideName}
          </motion.span>
        </h1>

        <motion.div className="mx-auto mt-9 flex max-w-xs items-center justify-center gap-4" variants={heroText} custom={4}>
          <span className="h-px flex-1" style={{ background: "var(--hairline)" }} />
          <p className="whitespace-nowrap text-[0.95rem] tracking-[0.18em]" style={{ color: "var(--paper)" }}>{weddingData.wedding.displayDate}</p>
          <span className="h-px flex-1" style={{ background: "var(--hairline)" }} />
        </motion.div>

        <motion.p className="eyebrow mt-4" variants={heroText} custom={5}>
          {weddingData.venue.city} · {weddingData.venue.state}
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.7, ease: EASE_HERO }}>
        <motion.span
          className="block h-9 w-px"
          style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }}
          animate={reduce ? {} : { scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
