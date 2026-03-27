export const enEvent = {
  meta: {
    title: "Event Details",
    description:
      "5K route details, event rundown, participant kit, hydration support, treasure hunt programming, and on-site experience for CitraLand Megah Treasure Hunt Fun Run 5K.",
  },
  intro: {
    eyebrow: "Event details",
    title: "A 5K route built to feel organized, social, and genuinely fun to join.",
    description:
      "This page gathers the race-day essentials in one place: route highlights, support points, event flow, post-run activation, and participant kit value.",
  },
  advantages: [
    {
      title: "Photo moments that support social sharing",
      description: "Visual checkpoints along the route help participants create organic content around the experience.",
    },
    {
      title: "Open to walkers, joggers, and community runners",
      description: "The format feels inclusive, making it easier for a broader mix of participants to join comfortably.",
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
      "The route is designed to stay easy for participants to understand, simple for organizers to brief, and clear for partners reviewing course visibility.",
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
      "The operating timeline is intentionally concise so sponsors, organizers, and participants can understand the key moments quickly.",
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
    description: "This matters because the strongest onsite interaction often happens after participants complete the run.",
    items: [
      {
        title: "DJ and live music",
        description: "High-energy sound keeps the atmosphere alive after the finish line.",
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
    title: "Event essentials that make the experience feel premium from registration onward.",
    description:
      "Jerseys, medals, lanyards, BIBs, timing chips, and goodie bags are presented as a clear participant value set from the start.",
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
