# Luxury Wedding Invitation

A single-page, ultra-premium wedding invitation built to the Production-Grade
Implementation Blueprint. React 19 + TypeScript, Vite, Tailwind CSS v4 and
Framer Motion.

> Content is currently the placeholder couple (**Arjun & Sia**). Edit
> `client/src/data/wedding.ts` to drop in real names, dates and venues — nothing
> else needs to change.

---

## Run it locally

Requires **Node.js 18+**.

```bash
npm install --legacy-peer-deps
npm run dev
```

Open the URL Vite prints (default http://localhost:3000).

```bash
npm run build     # production build → dist/public
npm run preview   # preview the production build
npm run check     # TypeScript type-check
```

---

## Add your photos

Drop images into **`client/public/photos/`** with these exact names — they load
automatically, and any missing file shows an elegant golden placeholder.

```
hero-1.jpg, hero-2.jpg          → hero background(s)
gallery-1.jpg … gallery-20.jpg  → the polaroid gallery (use as many as you like)
```

To change which gallery photos appear or their captions, edit the `gallery`
array in `client/src/data/wedding.ts`.

## Add your music

Replace **`client/public/music/song.mp3`** (keep the name). A short silent
placeholder ships so the vinyl player works out of the box; it starts when the
envelope is opened and can be paused/resumed any time.

---

## What's implemented (from the blueprint)

- **Cinematic loader** — 3 stages: monogram pulse → blur/glow build → curtain split
- **Envelope reveal** — wax seal, flap opens on rotateX(180°), card springs up
  (the tap also starts the music)
- **Vinyl player** — 120px disc (80px mobile), tonearm needle (−15°→25°),
  33⅓ RPM (1.8s/rotation), brass glow, wood base
- **Polaroid gallery** — draggable rail, 3:4 cards, ±2° tilt, spec shadows,
  lightbox (drag desktop / swipe mobile)
- **Motion system** — exact hero-text / section-wrapper / gallery-card variants
- **Design system** — blueprint colours (#080808 / #C9A45C / #D4AF37 …) and the
  Cormorant Garamond · Inter · Cinzel type hierarchy
- **Kerala accents (5–10%)** — faint single-line temple-bell watermark, mural
  micro-texture on glass, teak/rosewood grain, brass glow
- **Sticky glass navigation** + scroll-progress bar
- Sticky-glass everything, mobile-first, full `prefers-reduced-motion` support

## Structure

```
client/
  index.html
  public/photos/   ← your images
  public/music/    ← your music (song.mp3)
  src/
    pages/Home.tsx        ← orchestrates loader → envelope → page
    components/           ← loader, envelope, vinyl, gallery, sections, accents
    data/wedding.ts       ← ALL editable content
    lib/motion.ts         ← blueprint motion variants
    index.css             ← blueprint design tokens
```
