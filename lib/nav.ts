// Site structure — used by header, mobile menu, footer and sitemap.
// Labels & descriptions live in messages/*.json under "nav".
export type NavLeaf = { key: string; href: string; dot: string };
export type NavItem =
  | { key: string; href: string; children?: undefined; primary?: boolean }
  | { key: string; href?: undefined; children: NavLeaf[] };

export const nav: NavItem[] = [
  {
    key: "about",
    children: [
      { key: "leadership", href: "/biz-haqimizda/rahbariyat", dot: "var(--navy)" },
      { key: "mission", href: "/biz-haqimizda/maqsad-va-vazifalar", dot: "var(--purple)" },
      { key: "gallery", href: "/biz-haqimizda/fotogalereya", dot: "var(--amber)" },
      { key: "news", href: "/biz-haqimizda/yangiliklar", dot: "var(--green)" },
    ],
  },
  { key: "admission", href: "/qabul" },
  {
    key: "life",
    children: [{ key: "dorm", href: "/maktab-hayoti/yotoqxona", dot: "var(--orange)" }],
  },
  {
    key: "directions",
    children: [
      { key: "chinese", href: "/yonalishlar/xitoy-tili", dot: "var(--red)" },
      { key: "english", href: "/yonalishlar/ingliz-tili", dot: "var(--amber)" },
    ],
  },
];

export const contactHref = "/boglanish";

export const staticRoutes = [
  "/",
  "/biz-haqimizda/rahbariyat",
  "/biz-haqimizda/maqsad-va-vazifalar",
  "/biz-haqimizda/fotogalereya",
  "/biz-haqimizda/yangiliklar",
  "/qabul",
  "/maktab-hayoti/yotoqxona",
  "/yonalishlar/xitoy-tili",
  "/yonalishlar/ingliz-tili",
  "/boglanish",
] as const;
