import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { Mail, Instagram, MessageCircle } from "lucide-react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";

/**
 * FOOTER
 * A calm close: monogram, date, venue and a single hairline. Off-white text,
 * gold held for the initials and the social marks.
 */
export function Footer() {
  const socials = [
    { icon: Instagram, href: weddingData.social.instagram, label: "Instagram" },
    { icon: MessageCircle, href: weddingData.social.whatsapp, label: "WhatsApp" },
    { icon: Mail, href: `mailto:${weddingData.social.email}`, label: "Email" },
  ];

  return (
    <footer className="relative w-full" style={{ borderTop: "1px solid var(--hairline)" }}>
      <motion.div
        className="mx-auto max-w-5xl px-6 py-20 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.1)}
      >
        <motion.div className="text-center" variants={fadeUp}>
          <p
            className="font-light italic"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 3.5rem)",
              color: "var(--gold)",
            }}
          >
            {weddingData.couple.initials}
          </p>
          <p className="eyebrow mt-4">{weddingData.wedding.displayDate}</p>
        </motion.div>

        <motion.div className="mx-auto my-12 rule-fade max-w-sm" variants={fadeUp} />

        <motion.div
          className="grid gap-8 text-center sm:grid-cols-2 sm:text-left"
          variants={fadeUp}
        >
          <div>
            <p className="eyebrow mb-2" style={{ fontSize: "0.6rem" }}>Venue</p>
            <p style={{ color: "var(--paper)" }}>{weddingData.venue.name}</p>
            <p className="text-[0.9rem]" style={{ color: "var(--paper-dim)" }}>
              {weddingData.venue.city}, {weddingData.venue.state}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="eyebrow mb-2" style={{ fontSize: "0.6rem" }}>Get in touch</p>
            <p className="text-[0.9rem]" style={{ color: "var(--paper-dim)" }}>{weddingData.rsvp.email}</p>
            <p className="text-[0.9rem]" style={{ color: "var(--paper-dim)" }}>{weddingData.rsvp.phone}</p>
          </div>
        </motion.div>

        <motion.div className="mt-12 flex justify-center gap-6" variants={fadeUp}>
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="rounded-full p-3 transition-colors hover:bg-white/5"
              style={{ color: "var(--gold)" }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <s.icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div className="mt-10 text-center" variants={fadeUp}>
          <p className="eyebrow" style={{ fontSize: "0.58rem" }}>With love and gratitude</p>
          <p className="mt-2 text-[0.78rem]" style={{ color: "var(--paper-dim)", opacity: 0.7 }}>
            © {new Date().getFullYear()} {weddingData.couple.groomName} &amp; {weddingData.couple.brideName}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
