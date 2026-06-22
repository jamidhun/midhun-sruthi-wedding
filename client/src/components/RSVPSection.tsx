import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { useState } from "react";
import { toast } from "sonner";
import { fadeUp, staggerParent, viewportOnce, EASE } from "@/lib/motion";
import { RevealText } from "@/components/RevealText";

/**
 * RSVP
 * A quiet, focused form on a soft glass panel. Gold is held for the focus ring
 * and the single call to action; everything else stays calm and legible.
 */
export function RSVPSection() {
  const [formData, setFormData] = useState({ name: "", guests: "1", attendance: "yes" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you — your RSVP is in. We can't wait to celebrate with you.");
      setFormData({ name: "", guests: "1", attendance: "yes" });
      setIsSubmitting(false);
    }, 600);
  };

  const fieldStyle: React.CSSProperties = {
    backgroundColor: "rgba(11,11,11,0.5)",
    border: "1px solid var(--hairline)",
    color: "var(--paper)",
  };

  const deadline = new Date(weddingData.rsvp.deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });

  return (
    <section className="relative w-full px-6 py-28 md:px-8 md:py-36 lg:py-44">
      <motion.div
        className="mb-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerParent(0.1)}
      >
        <motion.p className="eyebrow mb-5" variants={fadeUp}>
          {weddingData.rsvpSection.subtitle}
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
          <RevealText text={weddingData.rsvpSection.title} />
        </motion.h2>
        <motion.p className="eyebrow mt-5" style={{ fontSize: "0.62rem" }} variants={fadeUp}>
          Kindly respond by {deadline}
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto max-w-xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        viewport={viewportOnce}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg p-7 md:p-10"
          style={{ backgroundColor: "rgba(20,20,20,0.45)", border: "1px solid var(--hairline)", backdropFilter: "blur(10px)" }}
        >
          <div>
            <label htmlFor="rsvp-name" className="eyebrow mb-3 block" style={{ fontSize: "0.62rem" }}>
              Your name
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="First and last name"
              autoComplete="name"
              className="w-full rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors placeholder:text-[var(--paper-dim)]/60 focus:border-[var(--gold)]"
              style={fieldStyle}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="rsvp-guests" className="eyebrow mb-3 block" style={{ fontSize: "0.62rem" }}>
                Guests
              </label>
              <select
                id="rsvp-guests"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--gold)]"
                style={fieldStyle}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n} style={{ backgroundColor: "#141414" }}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rsvp-attend" className="eyebrow mb-3 block" style={{ fontSize: "0.62rem" }}>
                Will you attend?
              </label>
              <select
                id="rsvp-attend"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--gold)]"
                style={fieldStyle}
              >
                <option value="yes" style={{ backgroundColor: "#141414" }}>Joyfully accepts</option>
                <option value="no" style={{ backgroundColor: "#141414" }}>Regretfully declines</option>
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md py-3.5 text-[0.8rem] font-semibold tracking-[0.18em] uppercase transition-opacity disabled:opacity-50"
            style={{ backgroundColor: "var(--gold)", color: "#0B0B0B" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSubmitting ? "Sending…" : "Send RSVP"}
          </motion.button>
        </form>

        <p className="mt-9 text-center text-[0.85rem]" style={{ color: "var(--paper-dim)" }}>
          Questions? Reach us at{" "}
          <span style={{ color: "var(--gold-soft)" }}>{weddingData.rsvp.email}</span>
          {" · "}
          <span style={{ color: "var(--gold-soft)" }}>{weddingData.rsvp.phone}</span>
        </p>
      </motion.div>
    </section>
  );
}
