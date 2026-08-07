import type { Category, Localized } from "@/lib/types";

/**
 * Every string the interface can render lives here, in both languages.
 * Project copy lives in projects.json; nothing else is hardcoded in a component.
 */
export const ui = {
  meta: {
    title: {
      en: "Davron — AI / ML Engineer",
      uz: "Davron — AI / ML muhandisi",
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
    role: { en: "AI / ML Engineer", uz: "AI / ML muhandisi" },
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
    // @todo Add your career-transition narrative — where you came from, what
    // pulled you into ML, and what you are aiming at next. Two or three
    // sentences, specific and personal. Rendered only once non-empty.
    story: {
      en: "",
      uz: "",
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
      en: "Grouped from the technologies actually used in the projects above — this list cannot drift away from the work.",
      uz: "Yuqoridagi loyihalarda haqiqatan ishlatilgan texnologiyalardan guruhlangan — bu ro'yxat ishlardan ajralib qola olmaydi.",
    },
    usedIn: { en: "used in", uz: "loyihada" },
    groups: {
      languages: { en: "Languages & Core", uz: "Tillar va asos" },
      modelling: { en: "ML & Modelling", uz: "ML va modellashtirish" },
      agents: { en: "LLM & Agents", uz: "LLM va agentlar" },
      interfaces: { en: "APIs & Interfaces", uz: "API va interfeyslar" },
      platform: { en: "Cloud, Data & DevOps", uz: "Bulut, ma'lumot va DevOps" },
    },
  },

  experience: {
    eyebrow: { en: "Experience", uz: "Tajriba" },
    heading: { en: "Roadmap", uz: "Yo'l xaritasi" },
  },

  contact: {
    eyebrow: { en: "Contact", uz: "Aloqa" },
    heading: { en: "Get in touch", uz: "Bog'lanish" },
    intro: {
      en: "Open to AI/ML engineering roles and collaborations. The fastest route is email.",
      uz: "AI/ML muhandisligi bo'yicha ish va hamkorlik takliflariga ochiqman. Eng tez yo'l — elektron pochta.",
    },
    email: { en: "Email", uz: "Elektron pochta" },
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
