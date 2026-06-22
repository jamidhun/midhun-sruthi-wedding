/**
 * EDITABLE WEDDING DATA — single source of truth.
 * Photos live in client/public/photos/  → referenced as "/photos/<name>.jpg"
 * Music lives in client/public/music/    → "/music/song.mp3"
 * Missing photos fall back to an elegant placeholder automatically.
 */

export const weddingData = {
  loadingScreen: {
    enabled: true,
    subtitle: "A CELEBRATION OF LOVE",
  },

  couple: {
    brideName: "Sia",
    groomName: "Arjun",
    initials: "A & S",
  },

  wedding: {
    date: "2026-12-12T18:00:00+05:30",
    displayDate: "12 December 2026",
    time: "6:00 PM",
    timezone: "IST",
  },

  venue: {
    name: "The Grand Palace",
    city: "Kochi",
    state: "Kerala",
    country: "India",
    address: "Heritage Lane, Fort Kochi, Kerala 682001",
    googleMapsLink: "https://maps.google.com/maps?q=fort+kochi",
  },

  hero: {
    subtitle: "Together with their families",
    scrollIndicator: "SCROLL",
    backgroundImage: "/photos/hero-1.jpg",
    backgroundImage2: "/photos/hero-2.jpg",
  },

  coupleStory: {
    title: "Two Souls, One Journey",
    sectionSubtitle: "The Union",
    description:
      "We are so happy to celebrate our wedding with you. Join us for a day of love, laughter, and new beginnings.",
    quote: "Entering a new life of togetherness, with the blessings of our elders and loved ones.",
  },

  groom: {
    name: "Arjun",
    education: "B.Tech, IIT Bombay",
    profession: "Software Engineer",
    parentTitle: "Son of",
    parents: "Shri & Smt. Gupta",
  },

  bride: {
    name: "Sia",
    education: "M.Des, NID Ahmedabad",
    profession: "Creative Director",
    parentTitle: "Daughter of",
    parents: "Shri & Smt. Sharma",
  },

  countdown: {
    title: "Save the Date",
    subtitle: "The Countdown",
  },

  events: [
    { id: 1, title: "Mehendi", date: "2026-12-10", time: "6:00 PM", location: "The Grand Palace — Courtyard", description: "An evening of music, colour and celebration." },
    { id: 2, title: "Haldi", date: "2026-12-11", time: "5:00 PM", location: "The Grand Palace — Garden", description: "A traditional morning of turmeric and joy." },
    { id: 3, title: "Wedding Ceremony", date: "2026-12-12", time: "6:00 PM", location: "The Grand Palace — Main Hall", description: "The exchange of vows and blessings." },
    { id: 4, title: "Reception", date: "2026-12-12", time: "8:30 PM", location: "The Grand Palace — Banquet Hall", description: "Dinner and celebration with family and friends." },
  ],

  eventsSection: {
    title: "Wedding Events",
    subtitle: "The Celebration",
  },

  // Gallery — uses /photos/gallery-N.jpg (placeholders shown until added).
  // Add up to gallery-20.jpg; just extend this list.
  gallery: [
    { id: 1, title: "Engagement", image: "/photos/gallery-1.jpg" },
    { id: 2, title: "Pre-Wedding", image: "/photos/gallery-2.jpg" },
    { id: 3, title: "Candid", image: "/photos/gallery-3.jpg" },
    { id: 4, title: "Together", image: "/photos/gallery-4.jpg" },
    { id: 5, title: "Forever", image: "/photos/gallery-5.jpg" },
    { id: 6, title: "Always", image: "/photos/gallery-6.jpg" },
  ],

  gallerySection: {
    title: "Photo Gallery",
    subtitle: "Our Moments",
  },

  rsvp: {
    deadline: "2026-11-12",
    email: "rsvp@example.com",
    phone: "+91-XXXXX-XXXXX",
  },

  rsvpSection: {
    title: "Will You Join Us?",
    subtitle: "Please Respond",
  },

  social: {
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/910000000000",
    email: "hello@example.com",
  },

  music: {
    src: "/music/song.mp3",
    title: "Wedding Theme",
    artist: "Instrumental",
  },
};

export type WeddingData = typeof weddingData;
