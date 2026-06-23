/**
 * EDITABLE WEDDING DATA — single source of truth.
 * Photos live in client/public/photos/  → referenced as "/photos/<name>.jpg"
 * Music lives in client/public/music/    → "/music/song.mp3"
 * Missing photos fall back to an elegant placeholder automatically.
 */

export const weddingData = {
  loadingScreen: {
    enabled: true,
    subtitle: "A WEDDING CELEBRATION",
  },

  couple: {
    groomFirst: "Midhun",
    brideFirst: "Sruthi",
    groomFull: "Midhun J A",
    brideFull: "Sruthi Chandran",
    initials: "M & S",
  },

  wedding: {
    // Muhurtham start (IST) — drives the countdown.
    date: "2026-09-13T11:53:00+05:30",
    dayName: "Sunday",
    displayDate: "13 September 2026",
    malayalamDate: "28 Chingam 1202",
    muhurtham: "11:53 AM – 12:42 PM",
  },

  venue: {
    name: "Sree Panimoola Devi Temple",
    lines: ["Andoorkonam", "Pothencode", "Thiruvananthapuram"],
    city: "Thiruvananthapuram",
    state: "Kerala",
  },

  hero: {
    subtitle: "Together with their families",
    scrollIndicator: "SCROLL",
    backgroundImage: "/photos/hero.jpg",
  },

  // The Couple section: invitation message + the two families.
  couplesection: {
    eyebrow: "The Invitation",
    title: "With Your Blessings",
    message:
      "With the blessings of the Almighty and our beloved elders, we cordially request the pleasure of your gracious presence at the auspicious wedding ceremony of Midhun J A and Sruthi Chandran.",
  },

  groom: {
    role: "The Groom",
    name: "Midhun J A",
    relation: "Son of",
    parents: ["Mr M Janardhanan Pillai (Venu)", "Mrs K Anitha"],
  },

  bride: {
    role: "The Bride",
    name: "Sruthi Chandran",
    relation: "Daughter of",
    parents: ["Mr Chandran Pillai A", "Mrs Priji O P"],
  },

  countdown: {
    subtitle: "The Countdown",
    title: "Save the Date",
  },

  eventsSection: {
    subtitle: "The Day",
    title: "The Celebration",
  },

  // ONLY two events: the ceremony and the reception.
  ceremony: {
    label: "Wedding Ceremony",
    dayName: "Sunday",
    date: "13 September 2026",
    malayalamDate: "28 Chingam 1202",
    muhurtham: "11:53 AM – 12:42 PM",
    venueName: "Sree Panimoola Devi Temple",
    venueLines: ["Andoorkonam", "Pothencode", "Thiruvananthapuram"],
  },

  reception: {
    label: "Reception",
    date: "13 September 2026",
    time: "5:30 PM onwards",
    venueName: "Al Saj Convention Centre",
    venueLines: ["Karakkamandapam", "Nemom", "Thiruvananthapuram"],
  },

  gallerySection: {
    subtitle: "Gallery",
    title: "Cherished Moments",
  },

  // Exactly three curated frames → /photos/gallery-1..3.jpg (placeholders until added).
  gallery: [
    { id: 1, title: "Together", image: "/photos/gallery-1.jpg" },
    { id: 2, title: "Joy", image: "/photos/gallery-2.jpg" },
    { id: 3, title: "Forever", image: "/photos/gallery-3.jpg" },
  ],

  rsvp: {
    subtitle: "RSVP",
    title: "Will You Join Us?",
    note: "We would be honoured to celebrate with you. Kindly let us know.",
    phoneDisplay: "+91 91888 51528",
    phoneE164: "919188851528",
  },

  footer: {
    blessing:
      "Your gracious presence and blessings will make this joyous occasion all the more memorable for us.",
    complimentsLabel: "With Best Compliments from",
    compliments: "Family & Friends",
  },

  music: {
    src: "/music/song.mp3",
  },
};

export type WeddingData = typeof weddingData;
