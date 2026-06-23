import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { weddingData } from "@/data/wedding";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/RevealText";

/**
 * RSVP — kept deliberately minimal. No form, no email: just two ways to reach
 * the family, Call and WhatsApp. Phone numbers live only here.
 */
export function RSVPSection() {
  const { rsvp } = weddingData;
  const tel = `tel:+${rsvp.phoneE164}`;
  const wa = `https://wa.me/${rsvp.phoneE164}`;

  return (
    <section id="rsvp" className="relative w-full px-6 py-28 md:px-8 md:py-36 lg:py-44">
      <motion.div
        className="mx-auto max-w-xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.12)}
      >
        <motion.p className="eyebrow mb-5" variants={fadeUp}>{rsvp.subtitle}</motion.p>
        <motion.h2
          className="font-light"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "var(--paper)" }}
          variants={fadeUp}
        >
          <RevealText text={rsvp.title} />
        </motion.h2>
        <motion.p className="mx-auto mt-6 max-w-md text-[1rem] leading-relaxed" style={{ color: "var(--paper-dim)" }} variants={fadeUp}>
          {rsvp.note}
        </motion.p>

        <motion.div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row" variants={fadeUp}>
          <motion.a
            href={tel}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 sm:w-auto"
            style={{ backgroundColor: "var(--gold)", color: "#080808" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Call ${rsvp.phoneDisplay}`}
          >
            <Phone className="h-4 w-4" />
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em]">Call</span>
          </motion.a>

          <motion.a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 sm:w-auto"
            style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`WhatsApp ${rsvp.phoneDisplay}`}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em]">WhatsApp</span>
          </motion.a>
        </motion.div>

        <motion.p className="mt-7 text-[0.95rem]" style={{ color: "var(--paper-dim)" }} variants={fadeUp}>
          {rsvp.phoneDisplay}
        </motion.p>
      </motion.div>
    </section>
  );
}
