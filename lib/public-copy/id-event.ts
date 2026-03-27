export const idEvent = {
  meta: {
    title: "Detail Event",
    description:
      "Rute 5K, rundown acara, perlengkapan peserta, water station, treasure hunt, dan pengalaman hari H untuk CitraLand Megah Treasure Hunt Fun Run 5K.",
  },
  intro: {
    eyebrow: "Detail event",
    title: "Rute 5K yang rapi, aktif, dan terasa seperti pengalaman komunitas yang menyenangkan.",
    description:
      "Halaman ini merangkum titik penting hari H: keunggulan rute, titik pendukung, rundown acara, aktivasi pasca-lari, dan perlengkapan peserta.",
  },
  advantages: [
    {
      title: "Spot foto yang mendukung social sharing",
      description: "Titik-titik visual di sepanjang rute membantu peserta membagikan pengalaman mereka secara organik.",
    },
    {
      title: "Format terbuka untuk pejalan kaki hingga runner komunitas",
      description: "Fun run ini terasa inklusif sehingga basis peserta bisa lebih lebar, santai, dan beragam.",
    },
    {
      title: "Finish area yang tetap hidup",
      description: "Sesudah garis finish, peserta diarahkan ke pengalaman lanjutan: DJ, hiburan, makanan, treasure hunt, dan sesi pengumuman.",
    },
  ],
  route: {
    eyebrow: "Rute 5K",
    title: "Start dan finish kembali di CitraLand Megah Batam dengan water station di kilometer kunci.",
    description:
      "Rute ini dirancang mudah dipahami peserta, nyaman dikomunikasikan panitia, dan jelas untuk partner yang ingin melihat visibilitas jalur.",
    checkpoints: [
      "CitraLand Megah Batam",
      "Masjid Raya Batam",
      "One Batam Mall",
      "AMP",
      "Mitra 10",
      "Bundaran BP Batam",
      "Mega Mall",
      "Bank BTN",
      "Kembali ke CitraLand Megah Batam",
    ],
    waterStations: ["KM 1", "KM 3", "KM 5"],
  },
  timeline: {
    eyebrow: "Rundown & aktivitas",
    title: "Empat jam pengalaman penuh dari start gate sampai penutupan.",
    description:
      "Alur operasional dibuat ringkas agar sponsor, panitia, dan peserta dapat memahami momen-momen penting dalam satu kali baca.",
    items: [
      {
        time: "05.00 WIB",
        title: "Garis start dibuka",
        description: "Musik pembuka, sesi pemanasan, booth sponsor aktif, dan area foto mulai hidup sejak peserta datang.",
      },
      {
        time: "Sepanjang rute",
        title: "Pos hidrasi dan bantuan medis",
        description: "Air putih, minuman olahraga, dan pertolongan pertama dasar hadir sebagai dukungan utama selama lari.",
      },
      {
        time: "07.30 WIB",
        title: "Perayaan garis finish",
        description: "Peserta menerima medali, sesi foto backdrop, hidangan ringan, dan hiburan langsung setelah menyelesaikan 5K.",
      },
      {
        time: "09.00 WIB",
        title: "Acara penutup",
        description: "Penyerahan hadiah, pengumuman pemenang, dan penutupan acara dilakukan setelah sesi hiburan dan aktivasi selesai.",
      },
    ],
  },
  afterRun: {
    eyebrow: "Aktivasi pasca-lari",
    title: "Finish area dirancang untuk menjaga energi crowd tetap tinggi.",
    description: "Bagian ini penting karena justru di sinilah interaksi onsite paling kuat terjadi.",
    items: [
      {
        title: "DJ & musik live",
        description: "Musik berenergi tinggi menjaga suasana event tetap meriah setelah peserta menyentuh garis finish.",
      },
      {
        title: "Booth foto",
        description: "Area foto profesional dengan properti seru untuk memperpanjang momen shareable.",
      },
      {
        title: "Stan makanan",
        description: "Pilihan makanan dan minuman memberi alasan peserta untuk tinggal lebih lama di area acara.",
      },
      {
        title: "Lomba foto & awarding",
        description: "Ada hadiah untuk foto terbaik dan penghargaan bagi para pemenang lari.",
      },
    ],
  },
  participantKit: {
    eyebrow: "Perlengkapan peserta",
    title: "Perangkat event yang membuat pengalaman terasa premium sejak registrasi.",
    description:
      "Jersey, medali, lanyard, BIB, chip timing, dan goodie bag disusun sebagai paket manfaat yang mudah dipahami peserta sejak awal.",
    items: [
      "Jersey CitraLand Fun Run",
      "Medali finisher dan lanyard",
      "Nomor BIB peserta",
      "Chip pencatat waktu profesional",
      "Goodie bag dan materi pendukung",
    ],
  },
  specialMoment: {
    eyebrow: "Highlight spesial",
    title: "Treasure hunt menjadi pembeda utama setelah sesi lari selesai.",
    description:
      "Treasure hunt dengan hadiah menarik memberi alasan tambahan bagi peserta untuk datang, bertahan lebih lama, dan kembali membicarakan acara setelah event selesai.",
  },
} as const;
