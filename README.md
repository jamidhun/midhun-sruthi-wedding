# Midhun & Sruthi — Wedding Invitation

A single-page luxury wedding invitation for **Midhun J A** and **Sruthi Chandran**
— Sunday, 13 September 2026, Thiruvananthapuram. React 19 + TypeScript, Vite,
Tailwind CSS v4 and Framer Motion.

## Run locally

Requires Node.js 18+.

```bash
npm install --legacy-peer-deps
npm run dev
```

Open the URL Vite prints (default http://localhost:3000).

```bash
npm run build     # production build → dist/public
npm run preview   # preview the build
npm run check     # type-check
```

## Add your photos

Drop images into **`client/public/photos/`** (missing files show an elegant
placeholder until added):

```
hero.jpg        → hero background
gallery-1.jpg   → gallery frame 1
gallery-2.jpg   → gallery frame 2
gallery-3.jpg   → gallery frame 3
```

## Add your music

Replace **`client/public/music/song.mp3`** (keep the name). A short silent
placeholder ships so the player works immediately; it starts when the envelope
is opened and can be paused/resumed via the vinyl control.

## Edit content

Everything — names, parents, ceremony, reception, messages, RSVP number — lives
in **`client/src/data/wedding.ts`**. Change it there; the components update
automatically.

## Notes

- Two events only: Wedding Ceremony and Reception.
- RSVP is Call + WhatsApp only (no form, no email). The phone number appears only
  in the RSVP section — never in SEO/Open Graph/structured data.
- One easing curve throughout; calm, cinematic timings; full reduced-motion
  support; mobile-first.
