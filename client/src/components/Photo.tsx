import { useState } from "react";

/**
 * PHOTO — loads from /public/photos and, if the file is missing, shows an
 * elegant placeholder (blurred golden gradient + a minimalist single-line motif)
 * rather than a broken image. Drop real photos in later with zero code changes.
 */
interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  eager?: boolean;
}

export function Photo({ src, alt, className = "", imgClassName = "", label, eager = false }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: "var(--surface)" }}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 28%, rgba(201,164,92,0.16), transparent 60%), linear-gradient(160deg, #17130C 0%, #0A0908 100%)",
          }}
        >
          {/* minimalist single-line motif */}
          <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" aria-hidden style={{ maxWidth: 160, opacity: 0.5 }}>
            <circle cx="50" cy="38" r="22" stroke="rgba(212,175,55,0.5)" strokeWidth="0.75" />
            <path d="M28 80 Q50 58 72 80" stroke="rgba(212,175,55,0.5)" strokeWidth="0.75" />
            <path d="M50 16 l3 6 -3 6 -3 -6 z" fill="rgba(212,175,55,0.4)" />
          </svg>
          {label && (
            <span
              className="absolute bottom-4 left-0 right-0 text-center"
              style={{ fontFamily: "var(--font-accent)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,164,92,0.6)" }}
            >
              {label}
            </span>
          )}
          <span className="pointer-events-none absolute inset-3 rounded-[2px]" style={{ border: "1px solid rgba(212,175,55,0.16)" }} />
        </div>
      )}
    </div>
  );
}
