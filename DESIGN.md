# Design plan — International Language School

## Idea
One motif, taken from the logo: **the open ring** — a segmented grey arc, open on the right like a "C",
with six coloured landmark segments. The name flows out of the opening. We reuse it with discipline:

- intro loader (the ring draws itself = progress bar)
- header scroll-progress arc
- page transitions (a thin arc sweeps across)
- structural devices on specific pages (24h day dial, goals ring, skills wheel, HSK arc, 404 broken ring)

Everything else is calm: cool white paper, navy ink, big confident Unbounded headlines, lots of air.

## Tokens (sampled from logo.png by `scripts/prepare-logo.mjs`)
| token     | value    | use |
|-----------|----------|-----|
| navy      | #024A8A  | primary, wordmark, buttons |
| purple    | #9A66BA  | accent (Paris) — Values / albums |
| green     | #027256  | accent (Pisa, tower) — STEM, success |
| orange    | #FE621A  | accent — national identity pillar |
| amber     | #FEA602  | accent (London) — English page, highlights |
| red       | #DA0202  | accent (pagoda) — Chinese page |
| ring      | #CACED2  | grey arc, hairlines |

Surfaces — light: `paper #FAFBFD`, `surface #FFFFFF`, `ink #0B1A33`, `ink-2 #44536B`, `line #E2E7EF`.
Dark (designed, not inverted): `paper #07152B`, `surface #0C1F3B`, `ink #EDF2F9`, `ink-2 #A6B4C9`, `line #1C3356`,
primary becomes `#5FA4EE` for text/links (AA on ink navy); logo swaps to `logo-full-dark.png`.

Accents appear only as: a 2px line, a dot, an icon stroke, a hover state, one arc segment. Never fills of whole sections
(exception: the Admission CTA band is navy — the primary colour, not an accent).

## Type
- Display: **Unbounded** 500/600 — headlines only, big, tight tracking, sentence case.
- Body/UI: **Manrope** 400/500/600/700, 17px body, 1.65 line-height, `max-w-[68ch]`.
- Chinese: **Noto Serif SC** (only loaded on /yonalishlar/xitoy-tili).
- Scale: 14 / 15 / 17 / 20 / 24 / 32 / 44 / 60 / 84 (clamp()).
- No eyebrow all-caps labels, no single coloured word in headlines, no arrow on every link.

## Loader storyboard (≤ 3.5 s, once per session)
```
t=0     paper bg. empty centre.            ( )
0–1.5s  grey arc draws clockwise = real progress (fonts + images, min 1.5s)
        logo-mark.png revealed by rotating conic mask, segment by segment
        centre word cycles  Salom → Hello → 你好 → Привет → Bonjour → Ciao → Salom
100%    wordmark (cropped from logo.png) slides out of the ring's opening →
        ring expands as circular hole (mask radial) → hero underneath
Skip button bottom-right, Esc skips. Reduced motion: static logo + thin bar, fade.
```

## Page sketches (each page has its own section vocabulary)

### Home
```
[ HERO ] text left ─────────── | huge circle-masked campus photo bleeding off right edge
                                  faint oversized ring arc behind; parallax
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
