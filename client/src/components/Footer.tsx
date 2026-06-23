import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";

/**
 * FOOTER — a calm, grateful close: the blessing, the compliments line, the
 * monogram, date and venue. No social links, no contact details.
 */
export function Footer() {
  const { footer, couple, wedding, venue } = weddingData;

  return (
    <footer className="relative w-full" style={{ borderTop: "1px solid var(--hairline)" }}>
      <motion.div
        className="mx-auto max-w-2xl px-6 py-24 text-center md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.12)}
      >
        <motion.p
          className="font-light italic"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 3.5rem)", color: "var(--gold)" }}
          variants={fadeUp}
        >
          {couple.initials}
        </motion.p>
        <motion.p className="eyebrow mt-4" variants={fadeUp}>{wedding.displayDate}</motion.p>

        <motion.div className="mx-auto my-10 rule-fade max-w-xs" variants={fadeUp} />

        <motion.p
          className="mx-auto max-w-xl font-light italic leading-relaxed"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.15rem, 3vw, 1.5rem)", color: "var(--paper)" }}
          variants={fadeUp}
        >
          “{footer.blessing}”
        </motion.p>

        <motion.div className="mt-12" variants={fadeUp}>
          <p className="eyebrow" style={{ fontSize: "0.58rem" }}>{footer.complimentsLabel}</p>
          <p className="mt-3 font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 4vw, 1.9rem)", color: "var(--gold-soft)" }}>
            {footer.compliments}
          </p>
        </motion.div>

        <motion.p className="eyebrow mt-12" style={{ fontSize: "0.56rem" }} variants={fadeUp}>
          {venue.name} · {venue.city}
        </motion.p>
        <motion.p className="mt-3 text-[0.76rem]" style={{ color: "var(--paper-dim)", opacity: 0.7 }} variants={fadeUp}>
          {couple.groomFirst} &amp; {couple.brideFirst} · {wedding.displayDate}
        </motion.p>
      </motion.div>
    </footer>
  );
}
