import type { Category, Localized } from "@/lib/types";

/**
 * Every string the interface can render lives here, in both languages.
 * Project copy lives in projects.json; nothing else is hardcoded in a component.
 */
export const ui = {
  meta: {
    title: {
      en: "Davron Aliqulov — AI Engineer",
      uz: "Davron Aliqulov — AI muhandisi",
    },
    description: {
      en: "AI and ML engineer building systems that report their own error bars: retrieval agents with citation checks, risk models with stated limitations, and interfaces that flag what the model is unsure about.",
      uz: "O'z xatolik chegarasini ochiq ko'rsatadigan tizimlar quradigan AI va ML muhandisi: iqtibos tekshiruvi bilan ishlaydigan qidiruv agentlari, cheklovlari aytib o'tilgan risk modellari va model ishonchsiz bo'lgan holatlarni belgilaydigan interfeyslar.",
    },
  },

  a11y: {
    skipToContent: { en: "Skip to content", uz: "Asosiy qismga o'tish" },
    openMenu: { en: "Open menu", uz: "Menyuni ochish" },
    closeMenu: { en: "Close menu", uz: "Menyuni yopish" },
    toggleTheme: { en: "Switch colour theme", uz: "Rang mavzusini almashtirish" },
    switchLanguage: { en: "Switch language", uz: "Tilni almashtirish" },
    primaryNav: { en: "Primary", uz: "Asosiy" },
    projectGrid: { en: "Project list", uz: "Loyihalar ro'yxati" },
    categoryFilter: { en: "Filter projects by category", uz: "Loyihalarni toifa bo'yicha filtrlash" },
    screenshotOf: { en: "Screenshot of", uz: "Skrinshot:" },
    pendingScreenshot: {
      en: "Screenshot pending for",
      uz: "Skrinshot hali tayyorlanmagan:",
    },
  },

  nav: {
    about: { en: "About", uz: "Men haqimda" },
    projects: { en: "Projects", uz: "Loyihalar" },
    skills: { en: "Skills", uz: "Ko'nikmalar" },
    experience: { en: "Experience", uz: "Tajriba" },
    contact: { en: "Contact", uz: "Aloqa" },
  },

  hero: {
    role: { en: "AI Engineer", uz: "AI muhandisi" },
    tagline: {
      en: "I build machine-learning and LLM systems that report their own error bars — and refuse the questions they cannot answer.",
      uz: "Men o'z xatolik chegarasini ochiq ko'rsatadigan va javob bera olmaydigan savollarni rad etadigan mashinaviy o'rganish hamda LLM tizimlarini quraman.",
    },
    ctaProjects: { en: "See the projects", uz: "Loyihalarni ko'rish" },
    ctaCv: { en: "Download CV", uz: "CV yuklab olish" },
    ruleLabel: { en: "measured, not demoed", uz: "namoyish emas, o'lchangan" },
  },

  about: {
    eyebrow: { en: "About", uz: "Men haqimda" },
    heading: { en: "How I build", uz: "Men qanday ishlayman" },
    body: {
      en: [
        "Most of my work follows the same shape: take a decision someone currently makes by hand — which student to call, which case will miss its deadline, which sentence in a contract actually answers the question — and build the smallest system that makes that decision better, with the evidence attached.",
        "The part I care about is the honesty layer. A model that scores 0.99 on a random split and 0.45 on merchants it has never seen has not learned the task, it has memorised brand names, so I select on the harder number and say so. Where a system should not decide alone, it routes to a person instead of guessing. Where an answer is not in the source, it says so rather than inventing one.",
      ],
      uz: [
        "Ishlarimning aksariyati bir xil shaklda: hozir qo'lda qabul qilinadigan qarorni olaman — qaysi talabaga qo'ng'iroq qilish kerak, qaysi murojaat muddatni o'tkazib yuboradi, shartnomadagi qaysi jumla savolga haqiqatan javob beradi — va o'sha qarorni yaxshilaydigan eng ixcham tizimni, dalili bilan birga quraman.",
        "Men uchun eng muhimi — halollik qatlami. Tasodifiy bo'linishda 0.99, ilgari ko'rilmagan sotuvchilarda esa 0.45 ko'rsatadigan model vazifani o'rganmagan, u brend nomlarini yodlab olgan; shuning uchun men qiyinroq raqam bo'yicha tanlayman va buni ochiq aytaman. Tizim yolg'iz qaror qilmasligi kerak bo'lgan joyda u taxmin qilmasdan odamga yo'naltiradi. Javob manbada yo'q bo'lsa, o'ylab topmaydi — yo'qligini aytadi.",
      ],
    },
    story: {
      en: "I came to this from physical engineering at Karshi State University, then AI Solutions at PDP University. The part that shaped how I work was the year in between the theory and the systems: annotating and quality-checking training data for production models at Yandex, holding a 98% accuracy line and spending every day on exactly where models fail — the systematic errors, the edge cases, the confidently wrong output. That is where the habit came from. Since then I have been building backends for computer-vision systems and, in my own time, the fifteen end-to-end systems below.",
      uz: "Men bu yerga Qarshi davlat universitetidagi fizika muhandisligidan, so'ng PDP University'dagi AI yo'nalishidan keldim. Ishlash uslubimni esa nazariya bilan tizimlar orasidagi o'sha yil shakllantirdi: Yandex'da production modellari uchun o'quv ma'lumotlarini annotatsiya qilib, sifatini tekshirib, 98% aniqlik chizig'ini ushlab turdim va har kunimni modellar aynan qayerda xato qilishiga sarfladim — tizimli xatolar, chekka holatlar, ishonch bilan aytilgan noto'g'ri javoblar. Bu odat o'sha yerdan. O'shandan beri kompyuter ko'rish tizimlari uchun backend quraman, bo'sh vaqtimda esa quyidagi o'n beshta tizimni yaratdim.",
    },
  },

  projects: {
    eyebrow: { en: "Projects", uz: "Loyihalar" },
    heading: { en: "Selected work", uz: "Tanlangan ishlar" },
    intro: {
      en: "Fifteen end-to-end systems, each with a live demo and the source. Every number below comes from the project's own evaluation.",
      uz: "O'n beshta boshdan-oxir tizim, har birida jonli demo va manba kodi bor. Quyidagi har bir raqam loyihaning o'z baholashidan olingan.",
    },
    featuredHeading: { en: "Featured", uz: "Asosiy loyihalar" },
    featuredIntro: {
      en: "Four projects with a full case study: problem, solution, architecture, results.",
      uz: "To'liq case study bilan berilgan to'rtta loyiha: muammo, yechim, arxitektura, natijalar.",
    },
    allHeading: { en: "Everything else", uz: "Qolgan loyihalar" },
    filterAll: { en: "All", uz: "Hammasi" },
    caseStudyLink: { en: "Read the case study", uz: "Case study'ni o'qish" },
    viewCode: { en: "Code", uz: "Kod" },
    viewLive: { en: "Live demo", uz: "Jonli demo" },
    empty: {
      en: "No projects in this category yet.",
      uz: "Bu toifada hozircha loyiha yo'q.",
    },
  },

  categories: {
    ML: { en: "Machine Learning", uz: "Mashinaviy o'rganish" },
    "Cloud & Data": { en: "Cloud & Data", uz: "Bulut va ma'lumot" },
    "Full-Stack AI": { en: "Full-Stack AI", uz: "Full-Stack AI" },
    "LLM & RAG": { en: "LLM & RAG", uz: "LLM va RAG" },
    // Never abbreviated in the UI — "CV" collides with the CV download button.
    CV: { en: "Computer Vision", uz: "Kompyuter ko'rish" },
  } satisfies Record<Category, Localized>,

  caseStudy: {
    back: { en: "All projects", uz: "Barcha loyihalar" },
    eyebrow: { en: "Case study", uz: "Case study" },
    sections: {
      problem: { en: "Problem", uz: "Muammo" },
      solution: { en: "Solution", uz: "Yechim" },
      architecture: { en: "Architecture", uz: "Arxitektura" },
      results: { en: "Results", uz: "Natijalar" },
    },
    stack: { en: "Stack", uz: "Texnologiyalar" },
    category: { en: "Category", uz: "Toifa" },
  },

  skills: {
    eyebrow: { en: "Skills", uz: "Ko'nikmalar" },
    heading: { en: "What I work with", uz: "Men ishlatadigan texnologiyalar" },
    intro: {
      en: "The number beside a badge is how many of the projects above use it. Skills without a number come from professional work rather than a project on this site.",
      uz: "Belgi yonidagi raqam — uni yuqoridagi nechta loyiha ishlatgani. Raqamsiz ko'nikmalar bu saytdagi loyihadan emas, professional ishdan keladi.",
    },
    usedIn: { en: "projects use this", uz: "loyiha buni ishlatadi" },
    fromWork: {
      en: "from professional work, not a project here",
      uz: "bu yerdagi loyihadan emas, ish tajribasidan",
    },
    groups: {
      languages: { en: "Languages & Core", uz: "Tillar va asos" },
      modelling: { en: "ML & Data Science", uz: "ML va Data Science" },
      vision: { en: "Computer Vision", uz: "Kompyuter ko'rish" },
      language: { en: "NLP & Text", uz: "NLP va matn" },
      agents: { en: "LLM & Agents", uz: "LLM va agentlar" },
      interfaces: { en: "APIs & Interfaces", uz: "API va interfeyslar" },
      platform: { en: "Cloud & Tooling", uz: "Bulut va vositalar" },
    },
  },

  experience: {
    eyebrow: { en: "Experience", uz: "Tajriba" },
    heading: { en: "Where I have worked and studied", uz: "Qayerda ishlaganman va o'qiganman" },
  },

  contact: {
    eyebrow: { en: "Contact", uz: "Aloqa" },
    heading: { en: "Get in touch", uz: "Bog'lanish" },
    intro: {
      en: "Open to AI/ML engineering roles and collaborations. The fastest route is email.",
      uz: "AI/ML muhandisligi bo'yicha ish va hamkorlik takliflariga ochiqman. Eng tez yo'l — elektron pochta.",
    },
    email: { en: "Email", uz: "Elektron pochta" },
    phone: { en: "Phone", uz: "Telefon" },
    github: { en: "GitHub", uz: "GitHub" },
    linkedin: { en: "LinkedIn", uz: "LinkedIn" },
    telegram: { en: "Telegram", uz: "Telegram" },
  },

  footer: {
    rights: { en: "All rights reserved.", uz: "Barcha huquqlar himoyalangan." },
    builtWith: {
      en: "Built with Next.js and Tailwind CSS. Deployed on Vercel.",
      uz: "Next.js va Tailwind CSS bilan qurilgan. Vercel'da joylashtirilgan.",
    },
  },

  notFound: {
    heading: { en: "Page not found", uz: "Sahifa topilmadi" },
    body: {
      en: "That URL does not match a project or a section of this site.",
      uz: "Bu manzil saytdagi biror loyiha yoki bo'limga mos kelmadi.",
    },
    home: { en: "Back to the homepage", uz: "Bosh sahifaga qaytish" },
  },
};

export type Ui = typeof ui;
