import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { weddingData } from "@/data/wedding";
import { Photo } from "@/components/Photo";
import { galleryCard, EASE } from "@/lib/motion";

/**
 * GALLERY — three curated polaroid frames (3:4). They centre when they fit and
 * become a calm draggable rail only if they overflow. Tapping opens a soft
 * lightbox. Elegant placeholders show until photos are added.
 */
export function GallerySection() {
  const photos = weddingData.gallery;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const track = el.firstElementChild as HTMLElement | null;
      const overflow = track ? track.scrollWidth - el.clientWidth : 0;
      setConstraint(Math.max(0, overflow));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const draggable = constraint > 0;

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() => setSelected((i) => (i === null ? i : Math.max(0, i - 1))), []);
  const next = useCallback(() => setSelected((i) => (i === null ? i : Math.min(photos.length - 1, i + 1))), [photos.length]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected, close, prev, next]);

  return (
    <section id="gallery" className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="mb-12 px-6 text-center md:mb-16 md:px-8">
        <p className="eyebrow mb-5">{weddingData.gallerySection.subtitle}</p>
        <h2 className="font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "var(--paper)" }}>
          {weddingData.gallerySection.title}
        </h2>
        {draggable && <p className="mt-4 text-[0.8rem]" style={{ color: "var(--paper-dim)" }}>Drag to explore →</p>}
      </div>

      <div ref={wrapRef} className="overflow-hidden px-[8vw]">
        <motion.div
          className={`flex gap-8 md:gap-12 ${draggable ? "justify-start" : "justify-center"}`}
          style={{ cursor: draggable ? "grab" : "default", width: draggable ? "max-content" : "100%" }}
          drag={draggable ? "x" : false}
          dragConstraints={{ left: -constraint, right: 0 }}
          dragElastic={0.05}
          whileTap={draggable ? { cursor: "grabbing" } : undefined}
          onDragStart={() => { dragged.current = true; }}
          onDragEnd={() => { setTimeout(() => { dragged.current = false; }, 40); }}
        >
          {photos.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              className="relative shrink-0 select-none"
              style={{ width: "min(74vw, 300px)", transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              variants={galleryCard}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              onClick={() => { if (!dragged.current) setSelected(index); }}
              aria-label={`View ${photo.title}`}
            >
              <div
                className="rounded-[3px] p-3 pb-11"
                style={{ background: "linear-gradient(180deg, #f7f3ea, #efe9dc)", border: "1px solid rgba(120,85,40,0.45)", boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 1px 3px rgba(255,255,255,0.1) inset" }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                  <Photo src={photo.image} alt={photo.title} className="h-full w-full" imgClassName="pointer-events-none" label={photo.title} />
                </div>
                <p className="mt-3 text-center italic" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "#3a2c16" }}>
                  {photo.title}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: "rgba(5,5,5,0.94)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={close} role="dialog" aria-modal="true" aria-label={photos[selected].title}
          >
            <motion.div
              key={selected}
              className="max-h-[82vh] w-auto max-w-3xl"
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Photo src={photos[selected].image} alt={photos[selected].title} className="max-h-[78vh] w-[min(86vw,640px)]" imgClassName="!h-auto max-h-[78vh]" label={photos[selected].title} />
            </motion.div>

            <button type="button" className="absolute right-5 top-5 rounded-full p-2 hover:bg-white/10" style={{ color: "var(--gold)" }} onClick={close} aria-label="Close"><X className="h-7 w-7" /></button>
            {selected > 0 && (
              <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-white/10" style={{ color: "var(--gold)" }} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><ChevronLeft className="h-8 w-8" /></button>
            )}
            {selected < photos.length - 1 && (
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-white/10" style={{ color: "var(--gold)" }} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ChevronRight className="h-8 w-8" /></button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
