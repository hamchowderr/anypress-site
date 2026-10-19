# Design

The anypress.io look: an assembly booklet. White manual paper, black line drawings, and each step of the story printed on a full-width page in one colour of the ribbon logo.

## Colour

| Token | Value | Use |
|---|---|---|
| `--ink` | `#17131c` | Text, rules, drawings, dark buttons, the last step |
| `--ink-soft` | `#3d3545` | Secondary text, only on white, `paper-2` or amber |
| `--paper` | `#ffffff` | Page ground, cards, light buttons |
| `--paper-2` | `#f4f2f6` | Quiet sections (who it's for, "in the box") |
| `--amber` | `#ffb338` | Step 1 / hero, closing call to action |
| `--orange` | `#ff7a2a` | Step 2 |
| `--red` | `#f2413a` | Step 3 |
| `--rose` | `#ee2f5e` | Step 4 (ink text only, at 4.5:1; never muted text) |
| `--magenta` | `#d21fa4` | Step 5 (white text) |

Bands run amber, orange, red, rose, magenta, ink, in that order, on the homepage. Inner pages take one band for their title page (`PageHero band=`). No gradients on text or surfaces; the five colours appear side by side only in the footer stripe.

## Type

- Display: Anybody, black (900), widened (`.font-display` = 118% width; `.font-display-wide` = 140% for step numbers). Headlines end with a full stop.
- Body: Atkinson Hyperlegible Next, 18 to 20px on marketing copy.
- Monospace only for real code on the developers page.

## Components

- Rules and outlines are 2.5px ink everywhere (`border-[2.5px] border-ink`).
- `.btn` is a box sticker: 2.5px ink outline, 12px corners, lifts 2px with a soft shadow on hover. `.btn-ink` (filled) is the main action, `.btn-paper` the second.
- `StepTag`: "Your part" (outline, person icon) or "Our part" (ink fill, ribbon mark).
- Lists are rows divided by ink rules, not grids of cards. Parts lists use check icons.
- No eyebrow labels above headings.

## Drawings

`src/components/Drawings.tsx`: inline SVG, `.drawing` class, one 2.5px round stroke, white and ink fills only. Names and numbers inside drawings are made-up examples.

## Motion

One signature move: `SiteParts state="assemble"` inside an `.assembly-scope` section slides the website's parts together as it scrolls into view (CSS scroll-driven animation). The drawing is assembled by default, so browsers without support and visitors with reduced motion see the finished site. Hovers are small lifts with an exponential ease-out.

## Words

Plain words on the homepage, site pages, prices and who-it's-for. Tool names, DNS, SSL, API and the like only on `/included` and `/developers`. See PRODUCT.md.
