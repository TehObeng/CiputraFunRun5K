export const enEvent = {
  meta: {
    title: "Event Details",
    description:
      "5K route details, event rundown, participant kit, hydration support, treasure hunt programming, and on-site experience for CitraLand Megah Treasure Hunt Fun Run 5K.",
  },
  intro: {
    eyebrow: "Event details",
    title: "A 5K route built to feel organized, social, and easy to sell as an experience.",
    description:
      "The event slides from the presentation are reorganized into clearer blocks for route highlights, support points, race-day flow, and participant value.",
  },
  advantages: [
    {
      title: "Photo moments that work for social sharing",
      description: "Visual checkpoints along the route help participants create organic content that extends sponsor reach.",
    },
    {
      title: "Open to walkers, joggers, and community runners",
      description: "The format feels inclusive rather than elite, making it easier to attract a broader participation base.",
    },
    {
      title: "A finish area that stays active",
      description: "After crossing the line, participants move into an ongoing program of music, food, treasure hunt moments, and partner activation.",
    },
  ],
  route: {
    eyebrow: "5K route",
    title: "The course starts and finishes at CitraLand Megah Batam, with hydration points at key kilometers.",
    description:
      "The route from the PPT is preserved as a city-facing journey that is easy to explain to both participants and sponsor teams evaluating visibility.",
    checkpoints: [
      "CitraLand Megah Batam",
      "Masjid Raya Batam",
      "One Batam Mall",
      "AMP",
      "Mitra 10",
      "Bundaran BP Batam",
      "Mega Mall",
      "Bank BTN",
      "Return to CitraLand Megah Batam",
    ],
    waterStations: ["KM 1", "KM 3", "KM 5"],
  },
  timeline: {
    eyebrow: "Rundown & activation",
    title: "Four hours of event flow, from opening gate to closing program.",
    description:
      "The operating timeline is intentionally compressed into an easy scanning format for sponsors, organizers, and participants.",
    items: [
      {
        time: "05:00 WIB",
        title: "Start gate opens",
        description: "Opening music, warm-up sessions, active sponsor booths, and photo-friendly spaces begin as participants arrive.",
      },
      {
        time: "Along the route",
        title: "Hydration and medical support",
        description: "Water, sports drinks, and basic first aid provide core support across the run.",
      },
      {
        time: "07:30 WIB",
        title: "Finish line celebration",
        description: "Participants receive medals, take backdrop photos, enjoy light refreshments, and move into live entertainment.",
      },
      {
        time: "09:00 WIB",
        title: "Closing program",
        description: "Prize announcements, winner recognition, and the final closing happen after the activation block is complete.",
      },
    ],
  },
  afterRun: {
    eyebrow: "Post-run activation",
    title: "The finish area is designed to keep crowd energy high.",
    description: "This matters for sponsors because the strongest onsite interaction often happens after participants complete the run.",
    items: [
      {
        title: "DJ and live music",
        description: "High-energy sound keeps the event atmosphere alive after the finish line.",
      },
      {
        title: "Photo booth zone",
        description: "A professional photo area with props extends the shareable experience.",
      },
      {
        title: "Food stalls",
        description: "Food and beverage options encourage participants to stay longer in the event zone.",
      },
      {
        title: "Photo contest and awarding",
        description: "The program includes awards for the best social photo and race winners.",
      },
    ],
  },
  participantKit: {
    eyebrow: "Participant kit",
    title: "Event assets that make the experience feel premium from registration onward.",
    description:
      "The PPT references jerseys, medals, lanyards, BIBs, chip timing, and goodie bags. On the site, these become a clearer participant value stack.",
    items: [
      "CitraLand Fun Run jersey",
      "Finisher medal and lanyard",
      "Participant race BIB",
      "Professional timing chip",
      "Goodie bag and supporting event materials",
    ],
  },
  specialMoment: {
    eyebrow: "Special highlight",
    title: "The treasure hunt is the strongest differentiator after the run is over.",
    description:
      "A post-run treasure hunt with attractive prizes gives participants another reason to attend, stay longer, and keep talking about the event afterward.",
  },
} as const;
