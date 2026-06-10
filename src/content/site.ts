/* ============================================================================
   📝  NỘI DUNG WEBSITE  —  SỬA Ở ĐÂY
   ----------------------------------------------------------------------------
   Đây là file DUY NHẤT bạn cần đụng tới để cập nhật chữ, dự án, liên hệ...
   Không cần biết code: chỉ sửa phần trong dấu nháy " ... ".
   Ảnh đặt trong thư mục /public — đường dẫn bắt đầu bằng "/".
   Lưu ý: KHÔNG dùng dấu gạch dài "—", hãy dùng gạch thường "-".
   ============================================================================ */

export const profile = {
  name: "Dinh Phan Nhat Nam",
  nickname: "Danny",
  role: "UI/UX & Product Designer",
  secondaryRole: "Design Team Leader",
  // Câu tagline lớn ở đầu trang
  tagline: "From first spark to final experience, every step is shaped with intent.",
  // Câu giới thiệu ngắn (giữ dưới ~20 từ để hero gọn)
  intro:
    "I turn complex ideas into products people can see, use, and believe in - across Web3, education, and IoT.",
  yearsExperience: "5",
  projectCount: "30+",
  location: "Vietnam",
  email: "hello@dannyxs.com", // ⚠️ Đổi thành email thật của bạn
  available: true,
  rateFrom: "$30/hour",
} as const;

/* Liên kết mạng xã hội. Để trống "" nếu không muốn hiển thị.
   ⚠️ Hãy thay bằng link thật của bạn. */
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter", href: "https://x.com/" },
  { label: "Telegram", href: "https://t.me/" },
  { label: "WhatsApp", href: "https://wa.me/" },
  { label: "CV / Resume", href: "#" },
];

/* Dịch vụ cung cấp */
export const services = [
  "Product design",
  "UI/UX design",
  "Branding",
  "Landing pages",
  "Banner design",
  "Concept development",
];

/* Quy trình làm việc 4 bước (Discovery → Direction → Design → Delivery) */
export const process = [
  {
    title: "Discovery",
    body: "User research and problem framing to find what actually matters before a single pixel.",
  },
  {
    title: "Direction",
    body: "Strategic alignment on priorities, scope, and the design bets worth making.",
  },
  {
    title: "Design",
    body: "Wireframes, flows, and polished interfaces that hold up under real use.",
  },
  {
    title: "Delivery",
    body: "Close collaboration with developers through handoff, launch, and iteration.",
  },
];

/* Giải thưởng & ghi nhận */
export const awards = [
  { title: "Awwwards", detail: "Site of the Day nominee", count: "x2" },
  { title: "Superteam Malaysia", detail: "Top 3 shirt design", count: "" },
  { title: "Kibble minigame", detail: "700k players in one week", count: "" },
  { title: "Trùm Chinese", detail: "4.8★, top 5 education in Vietnam", count: "" },
];

/* ----------------------------------------------------------------------------
   DỰ ÁN  —  thứ tự trong mảng này = thứ tự hiển thị trên trang.
   Mỗi dự án có một trang chi tiết riêng tại /work/<slug>/
   - slug: phần đuôi đường dẫn (chỉ chữ thường, dùng gạch nối).
   - cover: ảnh đại diện trên trang chủ.
   - gallery: danh sách ảnh trong trang chi tiết.
   - featured: true = ô lớn nổi bật trên lưới trang chủ.
   ---------------------------------------------------------------------------- */
export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  role: string;
  tagline: string;
  summary: string;
  contribution: string[];
  cover: string;
  coverDark?: boolean; // ảnh nền tối? → dùng nền tối phía sau cho khít
  gallery: { src: string; caption: string; dark?: boolean }[];
  tags: string[];
  link?: { label: string; href: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "stormbit",
    name: "Stormbit",
    category: "Web3 / DeFi",
    year: "2025",
    role: "Branding, UI/UX, Product",
    tagline: "The hedged lending layer.",
    summary:
      "A full-cycle Web3 finance product: from brand identity to a lending and earning experience built for a global launch at ETHCC Cannes.",
    contribution: [
      "Brand identity and the lightning mark",
      "End-to-end UI/UX for earn and borrow flows",
      "Launch campaign and event key visuals",
    ],
    cover: "/work/stormbit-banner.png",
    coverDark: false,
    gallery: [
      { src: "/work/stormbit-logo.png", caption: "Brand mark, built around a charged lightning form.", dark: true },
      { src: "/work/stormbit-earn.png", caption: "Earn flow: supply in under a minute with a clear strategy picker." },
      { src: "/work/stormbit-loan.png", caption: "Borrow flow: every rate fixed, every position protected." },
      { src: "/work/stormbit-banner.png", caption: "ETHCC Cannes launch key visual." },
    ],
    tags: ["Web3", "Branding", "UI/UX"],
    link: { label: "stormbit.finance", href: "https://stormbit.finance" },
    featured: true,
  },
  {
    slug: "kibble-exchange",
    name: "Kibble Exchange",
    category: "Web3 / DEX",
    year: "2024",
    role: "UI/UX, Game design",
    tagline: "A DEX on TON, and a minigame that reached 700k players in a week.",
    summary:
      "A decentralized exchange on the TON network paired with a Telegram minigame that hit 700,000 players in its first week.",
    contribution: [
      "Swap and trading interface design",
      "Telegram minigame UX and onboarding",
      "TON Meetup Vietnam 2024 event branding",
    ],
    cover: "/work/kibble-swap.png",
    coverDark: true,
    gallery: [
      { src: "/work/kibble-swap.png", caption: "Swap interface with live charting and a fast trade panel.", dark: true },
      { src: "/work/kibble-event.png", caption: "TON Meetup Vietnam 2024, hosted by Kibble.", dark: true },
    ],
    tags: ["Web3", "TON", "UI/UX"],
    featured: true,
  },
  {
    slug: "qash",
    name: "Qash",
    category: "Web3 / Finance",
    year: "2026",
    role: "Landing, Banners, Team lead",
    tagline: "A multi-asset vault, made legible.",
    summary:
      "Landing page design, banner creation, and design team leadership for a Web3 finance platform built around vaults and yield.",
    contribution: [
      "Landing page and marketing visuals",
      "Banner system across campaigns",
      "Leading the design team and reviews",
    ],
    cover: "/work/qash-dashboard.png",
    coverDark: false,
    gallery: [
      { src: "/work/qash-dashboard.png", caption: "Vault overview: supply, earnings, and performance at a glance." },
    ],
    tags: ["Web3", "Landing", "Leadership"],
    featured: true,
  },
  {
    slug: "polypay",
    name: "PolyPay",
    category: "Web3 / Payments",
    year: "2025",
    role: "Brand, UI/UX, Team lead",
    tagline: "Crypto payroll that teams can trust.",
    summary:
      "Brand identity and the full journey from MVP to final UI for a cryptocurrency payments and payroll platform, with team management throughout.",
    contribution: [
      "Brand identity and app icon",
      "MVP to final product UI",
      "Market positioning visuals",
    ],
    cover: "/work/polypay-ui.png",
    coverDark: false,
    gallery: [
      { src: "/work/polypay-icon.png", caption: "App icon: a gradient P with a payment spark.", dark: true },
      { src: "/work/polypay-ui.png", caption: "Multi-signature transfers with batch approvals." },
      { src: "/work/polypay-market.png", caption: "Market and opportunity story for crypto payroll.", dark: true },
    ],
    tags: ["Web3", "Branding", "UI/UX"],
    featured: false,
  },
  {
    slug: "oneplan-travel",
    name: "OnePlan Travel",
    category: "Mobile / Travel",
    year: "2025",
    role: "Co-founder & CEO, Product",
    tagline: "Plan group trips without the chaos.",
    summary:
      "An iOS app for planning group travel, where I led both the product and the company as co-founder and CEO.",
    contribution: [
      "Product vision and roadmap",
      "End-to-end iOS app design",
      "Itinerary and shared-expense flows",
    ],
    cover: "/work/oneplan-trips.png",
    coverDark: false,
    gallery: [
      { src: "/work/oneplan-trips.png", caption: "Trips home: ongoing and planned journeys in one place." },
      { src: "/work/oneplan-dalat.png", caption: "Shareable day-by-day itineraries." },
      { src: "/work/oneplan-market.png", caption: "A marketplace for ready-made travel plans." },
    ],
    tags: ["iOS", "Product", "Travel"],
    featured: false,
  },
  {
    slug: "trum-chinese",
    name: "Trùm Chinese",
    category: "Mobile / Education",
    year: "2024",
    role: "UI/UX, Product",
    tagline: "Learn Chinese through stories.",
    summary:
      "A language-learning app that reached a 4.8-star rating and a top-5 spot in Vietnam by teaching Chinese through reading and AI translation.",
    contribution: [
      "Story reader and lesson UI",
      "AI translation experience",
      "Voice and character system",
    ],
    cover: "/work/trumchinese-reader.png",
    coverDark: false,
    gallery: [
      { src: "/work/trumchinese-reader.png", caption: "Immersive story reader with synced audio." },
      { src: "/work/trumchinese-translate.png", caption: "AI translation between Chinese and Vietnamese." },
      { src: "/work/trumchinese-avatars.png", caption: "Speak or type, in your chosen voice." },
    ],
    tags: ["Education", "Mobile", "AI"],
    featured: false,
  },
  {
    slug: "gear-runner",
    name: "Gear Runner",
    category: "Mobile / Game",
    year: "2024",
    role: "UI/UX, UX research",
    tagline: "Move to earn, geared up.",
    summary:
      "Mobile game UI and user-behavior research for a move-to-earn experience that rewards real-world activity with gear and progression.",
    contribution: [
      "Game UI and inventory system",
      "Activity and health tracking screens",
      "User-behavior research",
    ],
    cover: "/work/gearrunner-inventory.png",
    coverDark: false,
    gallery: [
      { src: "/work/gearrunner-home.png", caption: "Daily activity, steps, and goals." },
      { src: "/work/gearrunner-inventory.png", caption: "Inventory of gear that boosts performance." },
      { src: "/work/gearrunner-stats.png", caption: "Health stats and AI recommendations." },
    ],
    tags: ["Game", "Mobile", "Research"],
    featured: false,
  },
];

/* Tiện ích nội bộ - không cần sửa */
export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
