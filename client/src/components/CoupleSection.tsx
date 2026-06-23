import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { blurUp, fadeUp, staggerParent, viewportOnce } from "@/lib/motion";
import { RevealText } from "@/components/RevealText";

/**
 * THE COUPLE — the invitation message, then the two families. Each person is
 * introduced with an oversized initial watermark, the full name, and their
 * parents kept elegant and understated. No profiles, no titles.
 */
function Profile({
  role,
  name,
  initial,
  relation,
  parents,
}: {
  role: string;
  name: string;
  initial: string;
  relation: string;
  parents: string[];
}) {
  return (
    <motion.div className="relative text-center" variants={blurUp}>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 select-none font-light leading-none"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(8rem, 18vw, 13rem)", color: "var(--gold)", opacity: 0.07 }}
      >
        {initial}
      </span>

      <div className="relative pt-16">
        <p className="eyebrow mb-3">{role}</p>
        <h3 className="mb-6 font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 2.75rem)", color: "var(--paper)" }}>
          {name}
        </h3>

        <div className="mx-auto h-px w-10" style={{ background: "var(--gold)", opacity: 0.5 }} />

        <div className="mt-7">
          <p className="eyebrow mb-3" style={{ fontSize: "0.6rem" }}>{relation}</p>
          {parents.map((p) => (
            <p key={p} className="text-[1rem] leading-relaxed" style={{ color: "var(--paper-dim)" }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CoupleSection() {
  const { groom, bride, couplesection } = weddingData;

  return (
    <section className="relative w-full px-6 py-28 md:px-8 md:py-36 lg:py-44">
      <motion.div
        className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.12)}
      >
        <motion.p className="eyebrow mb-5" variants={fadeUp}>
          {couplesection.eyebrow}
        </motion.p>
        <motion.h2
          className="font-light"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "var(--paper)", letterSpacing: "-0.015em" }}
          variants={fadeUp}
        >
          <RevealText text={couplesection.title} />
        </motion.h2>
        <motion.p
          className="mx-auto mt-8 max-w-xl text-[1.05rem] leading-relaxed"
          style={{ color: "var(--paper-dim)" }}
          variants={fadeUp}
        >
          {couplesection.message}
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto grid max-w-5xl gap-20 md:grid-cols-2 md:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.2, 0.1)}
      >
        <Profile
          role={groom.role}
          name={groom.name}
          initial={groom.name.charAt(0).toUpperCase()}
          relation={groom.relation}
          parents={groom.parents}
        />
        <Profile
          role={bride.role}
          name={bride.name}
          initial={bride.name.charAt(0).toUpperCase()}
          relation={bride.relation}
          parents={bride.parents}
        />
      </motion.div>
    </section>
  );
}
