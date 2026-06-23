import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { blurUp, fadeUp, staggerParent, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/RevealText";

/**
 * THE CELEBRATION — two events only: the temple ceremony and the reception.
 * The timeline rail (01 · 02) keeps the existing layout; cards carry just the
 * essentials — date, time, venue — with gold reserved for the small markers.
 */
type Detail = { icon: typeof Clock; text: string };

function EventCard({
  index,
  isLast,
  label,
  details,
  venueName,
  venueLines,
}: {
  index: number;
  isLast: boolean;
  label: string;
  details: Detail[];
  venueName: string;
  venueLines: string[];
}) {
  return (
    <motion.li className="grid grid-cols-[3rem_1fr] gap-x-5 sm:grid-cols-[4.5rem_1fr] sm:gap-x-8" variants={blurUp}>
      {/* Rail */}
      <div className="flex flex-col items-center">
        <span className="font-light leading-none" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--gold)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        {!isLast && <span className="mt-3 w-px flex-1" style={{ background: "linear-gradient(to bottom, var(--hairline), transparent)" }} />}
      </div>

      {/* Card */}
      <motion.div
        className="mb-12 rounded-md p-7 md:p-8"
        style={{ backgroundColor: "var(--surface)", border: "1px solid var(--hairline)" }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="mb-5 font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3.6vw, 2rem)", color: "var(--paper)" }}>
          {label}
        </h3>

        <div className="space-y-2.5">
          {details.map((d) => (
            <div key={d.text} className="flex items-center gap-2.5 text-[0.92rem]" style={{ color: "var(--paper)" }}>
              <d.icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--gold-soft)" }} />
              <span>{d.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 h-px w-10" style={{ background: "var(--gold)", opacity: 0.35 }} />

        <div className="mt-5 flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--gold-soft)" }} />
          <div>
            <p className="text-[0.98rem]" style={{ color: "var(--paper)" }}>{venueName}</p>
            <p className="text-[0.85rem] leading-relaxed" style={{ color: "var(--paper-dim)" }}>{venueLines.join(", ")}</p>
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}

export function EventsSection() {
  const { ceremony, reception, eventsSection } = weddingData;

  return (
    <section className="relative w-full px-6 py-28 md:px-8 md:py-36 lg:py-44">
      <motion.div
        className="mb-16 text-center md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.12)}
      >
        <motion.p className="eyebrow mb-5" variants={fadeUp}>{eventsSection.subtitle}</motion.p>
        <motion.h2 className="font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "var(--paper)" }} variants={fadeUp}>
          <RevealText text={eventsSection.title} />
        </motion.h2>
      </motion.div>

      <motion.ol
        className="mx-auto max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.18, 0.1)}
      >
        <EventCard
          index={0}
          isLast={false}
          label={ceremony.label}
          details={[
            { icon: CalendarDays, text: `${ceremony.dayName}, ${ceremony.date}` },
            { icon: CalendarDays, text: ceremony.malayalamDate },
            { icon: Clock, text: `Muhurtham · ${ceremony.muhurtham}` },
          ]}
          venueName={ceremony.venueName}
          venueLines={ceremony.venueLines}
        />
        <EventCard
          index={1}
          isLast={true}
          label={reception.label}
          details={[
            { icon: CalendarDays, text: reception.date },
            { icon: Clock, text: reception.time },
          ]}
          venueName={reception.venueName}
          venueLines={reception.venueLines}
        />
      </motion.ol>
    </section>
  );
}
