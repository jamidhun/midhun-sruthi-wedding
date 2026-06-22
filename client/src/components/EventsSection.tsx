import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { MapPin, Clock } from "lucide-react";
import { blurUp, fadeUp, staggerParent, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/RevealText";

/**
 * EVENTS
 * A real chronological sequence (Mehendi → Reception), so the numbering carries
 * meaning. A two-column grid keeps the rail and card aligned at every width —
 * no fixed margins to collapse on small screens. Cards lift gently on hover.
 */
function formatEventDate(date: string) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export function EventsSection() {
  const events = weddingData.events;

  return (
    <section className="relative w-full px-6 py-28 md:px-8 md:py-36 lg:py-44">
      <motion.div
        className="mb-16 text-center md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.1)}
      >
        <motion.p className="eyebrow mb-5" variants={fadeUp}>
          {weddingData.eventsSection.subtitle}
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
          <RevealText text={weddingData.eventsSection.title} />
        </motion.h2>
      </motion.div>

      <motion.ol
        className="mx-auto max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.16, 0.1)}
      >
        {events.map((event, index) => (
          <motion.li
            key={event.id}
            className="grid grid-cols-[3rem_1fr] gap-x-5 sm:grid-cols-[4.5rem_1fr] sm:gap-x-8"
            variants={blurUp}
          >
            {/* Rail: number + connecting line */}
            <div className="flex flex-col items-center">
              <span
                className="font-light leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "var(--gold)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {index !== events.length - 1 && (
                <span
                  className="mt-3 w-px flex-1"
                  style={{ background: "linear-gradient(to bottom, var(--hairline), transparent)" }}
                />
              )}
            </div>

            {/* Card */}
            <motion.div
              className="mb-12 rounded-md p-6 md:p-7"
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--hairline)" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                className="mb-3 font-light"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)",
                  color: "var(--paper)",
                }}
              >
                {event.title}
              </h3>
              <p className="mb-5 text-[0.95rem] leading-relaxed" style={{ color: "var(--paper-dim)" }}>
                {event.description}
              </p>
              <div className="flex flex-col gap-2.5 text-[0.85rem] sm:flex-row sm:gap-7" style={{ color: "var(--gold-soft)" }}>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {formatEventDate(event.date)} · {event.time}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {event.location}
                </span>
              </div>
            </motion.div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
