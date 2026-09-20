# Design plan — International Language School

## Idea

One motif, taken from the logo: **the open ring** — a segmented grey arc, open on the right like a "C",
with six coloured landmark segments. The name flows out of the opening. We reuse it with discipline:

- intro loader (the ring draws itself = progress bar)
- header scroll-progress arc
- page transitions (a thin arc sweeps across)
- structural devices on specific pages (24h day dial, goals ring, skills wheel, HSK arc, 404 broken ring)

Everything else is calm: cool white paper, navy ink, confident Poppins headlines, lots of air, over a quiet animated
background (static dot grid, two slowly rotating logo rings, faint letters from the four languages).

## Tokens (sampled from logo.png by `scripts/prepare-logo.mjs`)

| token  | value   | use                                        |
| ------ | ------- | ------------------------------------------ |
| navy   | #024A8A | primary, wordmark, buttons                 |
| purple | #9A66BA | accent (Paris) — Values / albums           |
| green  | #027256 | accent (Pisa, tower) — STEM, success       |
| orange | #FE621A | accent — national identity pillar          |
| amber  | #FEA602 | accent (London) — English page, highlights |
| red    | #DA0202 | accent (pagoda) — Chinese page             |
| ring   | #CACED2 | grey arc, hairlines                        |

Surfaces — light: `paper #FAFBFD`, `surface #FFFFFF`, `ink #0B1A33`, `ink-2 #44536B`, `line #E2E7EF`.
Dark (designed, not inverted): `paper #07152B`, `surface #0C1F3B`, `ink #EDF2F9`, `ink-2 #A6B4C9`, `line #1C3356`,
primary becomes `#5FA4EE` for text/links (AA on ink navy); logo swaps to `logo-full-dark.png`.

Accents appear only as: a 2px line, a dot, an icon stroke, a hover state, one arc segment. Never fills of whole sections
(exception: the Admission CTA band is navy — the primary colour, not an accent).

## Type

- All text: **Poppins** 300/400/500/600 (latin subset — it already contains ʻ U+02BB and ʼ U+02BC).
- Russian: **Montserrat** (Cyrillic only, not preloaded) fills the glyphs Poppins lacks.
- Headings 600 with −0.035em tracking (−0.02em for Russian); large numerals in light 300.
- Chinese: **Noto Serif SC** (only loaded on /yonalishlar/xitoy-tili).
- Scale: 14 / 15 / 17 / 20 / 24 / 32 / 44 / 60 / 84 (clamp()).
- No eyebrow all-caps labels, no single coloured word in headlines, no arrow on every link.

## Loader storyboard (≤ 2.6 s, once per session, pure CSS)

```
0–1.4s  emblem (logo-mark-360.webp) resolves from blur, revealed by a conic sweep;
        one hairline ring draws around it; "Salom · Hello · 你好 · Привет" fade in
ready   (fonts + eager images, min 1.1s, max 1.7s) → the paper lifts like a curtain
Skip / Esc at any time. Reduced motion: static emblem, fade out.
```

## Performance rules

- No per-frame JavaScript for decoration: loader and ambient background are CSS animations on transforms.
- No backdrop-filter over the animated background (the `glass` utility is a near-opaque surface).
- No third-party iframes on load: maps are click-to-load (`components/ui/MapPreview.tsx`).
- Hero text is never hidden behind an entrance animation (it is the LCP element), and neither is the hero
  photo: only the kicker and the buttons rise, in CSS, so a tab that gets no frames cannot freeze them.
- Marquees / loops pause when off screen.
- Pages are static (SSG) and prefetched, so there are no route `loading.tsx` skeletons — a Suspense boundary
  there would hide the prerendered HTML until JS runs.

## Page sketches (each page has its own section vocabulary)

### Home

```
[ HERO ] full-bleed slider under the header: 4 real photos, the new one wipes in over the old one
         small text over the top-left (school name, headline, lead, two buttons) on a scrim
         bottom: the three numbers left, caption + 01/04 + four hairline segments + arrows right
         the active segment's CSS animation is the timer — its animationend advances the slider
[ ABOUT ] statement left | Venn: STEM ∩ Xorijiy tillar ∩ Milliy oʻzlik (hover/tap)
[ FIRST YEAR ] sticky horizontal scroll: 1–15 Jun → 22 315 → Cambridge → Sep 260+
[ DIRECTIONS ] English ▌▌▌▌▌▌ | ▌▌▌▌ Chinese  (hover expands 60/40, accent + photo)
[ A DAY ] 24h dial (ring) left, selected slot detail right; list on mobile
[ NEWS ] 1 large (left 7/12) + 3 compact stacked (right 5/12)
[ STRIP ] draggable infinite photo marquee → gallery
[ CTA ] navy band, big type, Qabul + ariza.piima.uz
```

### Rahbariyat — editorial magazine

```
portrait 5/12 | big welcome quote 7/12, signature line, reception hours
deputies: asymmetric grid (2 tall + 3 short), click → side drawer
org chart SVG (Director → deputies → departments)
```

### Maqsad va vazifalar

```
MISSION — full-width typographic hero, lines appear once
PINNED: ring (6 arcs) left | goal text right; each goal lights one arc
VALUES — two-column editorial: number + title left, prose right
statement band (own words): modern education + national identity
```

### Fotogalereya — filter chips, masonry (layout animation), albums toggle, lightbox

### Yangiliklar — featured split, filter + search, list with "load more"; article: hero, reading arc, gallery, share, related

### Qabul — status hero + countdown slot; numbered stepper; exam table; grades 5/6/7 as three big numerals; documents checklist; FAQ; portal buttons

### Yotoqxona — warm hero; room photo with hotspots; vertical routine timeline; care icons row; canteen day tabs; leisure grid; parents FAQ

### Xitoy tili (red) — 学 drawn stroke by stroke; why points; grade tabs + HSK arc; character-of-the-day card w/ speech; culture photo cards; teachers

### Ingliz tili (navy+amber) — typed-and-corrected sentence; skills wheel (4 arcs); grade tabs; exam pathway (TODO); horizontal club cards; teachers

### Bogʻlanish — split: details | form (zod), map below

### 404 — an incomplete ring that never closes, links back

## Check against the brief

- Not a template: no centred hero, no 3 equal cards, no gradient blobs, no rainbow — accents per page.
- Motion: one orchestrated moment per page (its hero); everything else responds to user input.
