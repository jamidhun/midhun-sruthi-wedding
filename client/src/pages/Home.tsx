import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { sectionWrapper, viewportOnce } from "@/lib/motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { EnvelopeReveal } from "@/components/EnvelopeReveal";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { VinylPlayer } from "@/components/VinylPlayer";
import { HeroSection } from "@/components/HeroSection";
import { CoupleSection } from "@/components/CoupleSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventsSection } from "@/components/EventsSection";
import { GallerySection } from "@/components/GallerySection";
import { RSVPSection } from "@/components/RSVPSection";
import { Footer } from "@/components/Footer";

type Phase = "loading" | "envelope" | "open";

/** Section wrapper — adds the nav anchor id + a calm entrance. */
function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <motion.div id={id} variants={sectionWrapper} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      {children}
    </motion.div>
  );
}

/**
 * HOME — orchestrates the experience:
 *   cinematic loader → envelope reveal (starts music) → the page.
 * The page is mounted behind the overlays; scroll is locked until opened.
 */
export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  const startMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    a.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
  };
  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    else { a.pause(); setMusicOn(false); }
  };
  const reveal = () => { setPhase("open"); window.scrollTo({ top: 0, behavior: "auto" }); };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}>
      <audio ref={audioRef} src={weddingData.music.src} loop preload="auto" />

      <AnimatePresence mode="wait">
        {phase === "loading" && <LoadingScreen key="loading" onComplete={() => setPhase("envelope")} />}
        {phase === "envelope" && <EnvelopeReveal key="envelope" onStartMusic={startMusic} onReveal={reveal} />}
      </AnimatePresence>

      {phase === "open" && (
        <>
          <ScrollProgress />
          <Navbar />
          <VinylPlayer playing={musicOn} onToggle={toggleMusic} />
        </>
      )}

      <main>
        <HeroSection />
        <Section id="couple"><CoupleSection /></Section>
        <Section id="countdown"><CountdownTimer /></Section>
        <Section id="events"><EventsSection /></Section>
        <GallerySection />
        <Section id="rsvp"><RSVPSection /></Section>
      </main>

      <Footer />
    </div>
  );
}
