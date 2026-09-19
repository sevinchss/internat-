# International Language School — website

Official website of **Xorijiy tillarga ixtisoslashtirilgan maktab-internati** (International Language School /
Специализированная школа-интернат иностранных языков).

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl (uz / en / ru) · next-themes · Framer Motion · Lenis · lucide-react.

## Run

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /uz
npm run build && npm start   # production
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run format`,
`npm run logo` (regenerate brand assets), `npm run blur` (regenerate photo blur placeholders).

## Where to change things

| What | Where |
|---|---|
| **Logo** | Replace `logo.png` in the project root, then `npm run logo`. It regenerates `public/brand/*` (full, full-dark, mark, wordmark, OG image) and `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, and prints the brand colours sampled from the logo (also saved to `public/brand/colors.json`; tokens live in `app/globals.css`). The logo is never redrawn — every variant is cut from this file. |
| **Photos** | `lib/images.ts` — every photo slot on the site (74), with alt text in 3 languages. Put real photos in `public/images/<group>/…`, point `src` at them (e.g. `slot("/images/campus/hero.jpg", …)`), then run `npm run blur`. Staff portraits: `images.staff` (empty until real photos exist — pages show a designed placeholder instead of strangers' faces). |
| **Page content** | `data/*.ts` — every page's copy in `uz` / `en` / `ru` (news, staff, gallery, FAQ, menus, schedules, curricula…). |
| **UI strings** (menu, buttons, footer, meta titles) | `messages/uz.json`, `messages/en.json`, `messages/ru.json` |
| **Contacts, address, socials, map coordinates, domain** | `lib/site.ts` |
| **Navigation structure** | `lib/nav.ts` |
| **Design tokens** (colours, type scale) | `app/globals.css` · design notes in `DESIGN.md` |

Uzbek text uses `ʻ` (U+02BB) in oʻ / gʻ and `ʼ` (U+02BC) for tutuq belgisi — keep that when editing.

## Contact form → Telegram

1. Copy `.env.example` to `.env.local`.
2. Create a bot with [@BotFather](https://t.me/BotFather) and put its token in `TELEGRAM_BOT_TOKEN`.
3. Add the bot to the group/channel that should receive messages (or write to it once), then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy the `chat.id` into `TELEGRAM_CHAT_ID`.
4. Restart the server. Without these variables, submissions are only logged in the server console.

Set `NEXT_PUBLIC_SITE_URL` to the real domain (used for canonical URLs, sitemap, Open Graph).

## Structure

```
app/[locale]/…           routes (uz slugs for all locales), layout, 404, loading skeletons
app/api/contact/route.ts contact form handler
components/layout/       header, mobile menu, footer, intro loader, page transitions, smooth scroll
components/sections/<page>/  page sections
components/ui/           Photo, Button, Accordion, Tabs, Drawer, Lightbox, Portrait
components/brand/        Logo, ring motif
data/                    tri-lingual content
lib/                     images, site info, SEO helpers, utils
messages/                UI strings
scripts/                 prepare-logo.mjs, gen-blur.mjs
proxy.ts                 locale routing (Next 16's replacement for middleware)
```
