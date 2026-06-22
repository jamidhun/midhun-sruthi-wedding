import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { blurUp, fadeUp, staggerParent, viewportOnce, EASE } from "@/lib/motion";
import { RevealText } from "@/components/RevealText";

/**
 * THE COUPLE
 * Each person is introduced with an oversized initial set behind the name as a
 * watermark — editorial, not a clip-art monogram. Details read as a quiet field
 * guide: gold labels, off-white values. Closes on the vow in display italic.
 */
function Profile({
  role,
  name,
  initial,
  rows,
}: {
  role: string;
  name: string;
  initial: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <motion.div className="relative text-center" variants={blurUp}>
      {/* Watermark initial */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 select-none font-light leading-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 18vw, 13rem)",
          color: "var(--gold)",
          opacity: 0.07,
        }}
      >
        {initial}
      </span>

      <div className="relative pt-16">
        <p className="eyebrow mb-3">{role}</p>
        <h3
          className="mb-6 font-light"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            color: "var(--paper)",
          }}
        >
          {name}
        </h3>

        <div className="mx-auto h-px w-10" style={{ background: "var(--gold)", opacity: 0.5 }} />

        <div className="mt-7 space-y-5">
          {rows.map((r) => (
            <div key={r.label}>
              <p className="eyebrow mb-1.5" style={{ fontSize: "0.62rem" }}>
                {r.label}
              </p>
              <p className="text-[0.95rem]" style={{ color: "var(--paper-dim)" }}>
                {r.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CoupleSection() {
  const { groom, bride, coupleStory } = weddingData;

  return (
    <section className="relative w-full px-6 py-28 md:px-8 md:py-36 lg:py-44">
      <motion.div
        className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.1)}
      >
        <motion.p className="eyebrow mb-5" variants={fadeUp}>
          {coupleStory.sectionSubtitle}
        </motion.p>
        <motion.h2
          className="font-light"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            color: "var(--paper)",
            letterSpacing: "-0.015em",
          }}
          variants={fadeUp}
        >
          <RevealText text={coupleStory.title} />
        </motion.h2>
        <motion.p
          className="mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed"
          style={{ color: "var(--paper-dim)" }}
          variants={fadeUp}
        >
          {coupleStory.description}
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto grid max-w-5xl gap-20 md:grid-cols-2 md:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.18, 0.1)}
      >
        <Profile
          role="The Groom"
          name={groom.name}
          initial={groom.name.charAt(0).toUpperCase()}
          rows={[
            { label: "Education", value: groom.education },
            { label: "Profession", value: groom.profession },
            { label: groom.parentTitle, value: groom.parents },
          ]}
        />
        <Profile
          role="The Bride"
          name={bride.name}
          initial={bride.name.charAt(0).toUpperCase()}
          rows={[
            { label: "Education", value: bride.education },
            { label: "Profession", value: bride.profession },
            { label: bride.parentTitle, value: bride.parents },
          ]}
        />
      </motion.div>

      <motion.figure
        className="mx-auto mt-24 max-w-3xl text-center md:mt-28"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
        viewport={viewportOnce}
      >
        <div className="mx-auto mb-9 h-px w-16" style={{ background: "var(--gold)", opacity: 0.4 }} />
        <blockquote
          className="font-light italic"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
            lineHeight: 1.5,
            color: "var(--paper)",
            letterSpacing: "-0.01em",
          }}
        >
          “{coupleStory.quote}”
        </blockquote>
      </motion.figure>
    </section>
  );
}
