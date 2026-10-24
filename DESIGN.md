---
name: AnyPress
description: Real WordPress, set up and looked after for you. The sketchbook look.
colors:
  ink: "#141414"
  ink-soft: "#5f5a55"
  paper: "#ffffff"
  paper-2: "#faf8f5"
  line: "#e9e4de"
  hair: "#f1ede8"
  honey: "#ffc75a"
  amber: "#ffb338"
  orange: "#ff7a2a"
  red: "#f2413a"
  rose: "#ee2f5e"
  magenta: "#d21fa4"
  accent: "#c8264d"
  tick-green: "#17703d"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(44px, 7.4vw, 92px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(32px, 4.2vw, 52px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  hand:
    fontFamily: "Caveat, cursive"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  button: "10px"
  tile: "12px"
  card: "16px"
  panel: "18px"
  pick: "20px"
  pill: "999px"
spacing:
  gutter: "20px"
  section: "96px"
  container: "1180px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "0.8rem 1.35rem"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0.8rem 1.35rem"
  button-honey:
    backgroundColor: "{colors.honey}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0.8rem 1.35rem"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
  sketch-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.panel}"
  side-pill:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
---

# Design System: AnyPress

## Overview

**Creative North Star: "The Sketchbook"**

anypress.io reads like a friendly sketchbook laid on a white desk. Pages are plain white with near-black ink. Every idea gets a hand-drawn object that matches exactly what the line talks about: a laptop for a website, a calendar for bookings, a shop bag for a store, a piggy bank for "no cut of your sales". The drawings draw themselves as they scroll into view. Handwritten notes in Caveat sit beside headings like margin scribbles.

Sections are centered and generous, but each one carries real content: tables, calculators, lists and example sites. The ribbon colours from the logo are the only colour, used in the drawings' hatching and as hard offset shadows behind the things that matter. The owner chose this look on 2026-10-24 (round 3), after rejecting the "assembly booklet", people-only illustrations and the calm card look.

**Key Characteristics:**
- White pages, ink text, and hand-drawn objects for every concept. Never stock photos or illustrated people.
- A Caveat "eyebrow" note above most section headings.
- Ink outlines with a solid offset shadow (honey or rose) on the one or two things per section that matter.
- Motion that explains: drawings draw in, order dots travel along arrows, site tiles pop in one by one.
- Two audiences, marked with a side pill: website owners ("For you") and the technical side ("Technical").

## Colors

One ink, one paper, and the logo's ribbon colours as the only colour.

### Primary
- **Ink** (#141414): text, outlines, dark buttons, the drawings' strokes, and the dark "we look after it" bands.
- **Honey** (#ffc75a): the main offset shadow, the announcement bar, the honey button and the highlighter `mark`.

### Secondary
- **Rose** (#ee2f5e): the second offset shadow (technical-side and "engine" panels), slider accents and drawing hatching. Never small text on white.
- **Accent** (#c8264d): small coloured text, links, step labels and badges. It's readable on white (5.5:1 with white text on it).

### Tertiary
- **Amber, orange, red, magenta** (#ffb338, #ff7a2a, #f2413a, #d21fa4): hatching inside the drawings and the volume-tier shadows only.
- **Tick green** (#17703d): ticks in the "AnyPress" column of comparison tables and savings lines.

### Neutral
- **Paper** (#ffffff): page ground, cards and panels.
- **Paper 2** (#faf8f5): alternating `.soft` sections.
- **Ink soft** (#5f5a55): secondary text.
- **Line** (#e9e4de) and **Hair** (#f1ede8): borders and dividers.

### Named Rules
**The Ribbon-Only Rule.** No colour comes from outside the logo's ribbon, except tick green for "yes".
**The Readable Accent Rule.** Small coloured text uses Accent, never Rose or Orange.

## Typography

**Display Font:** Hanken Grotesk (with system-ui)
**Hand Font:** Caveat (600, 700)

**Character:** A sturdy, friendly grotesque for everything a visitor reads, and a quick handwriting for the notes in the margin.

### Hierarchy
- **Display** (800, clamp(44px, 7.4vw, 92px) on the homepage, clamp(40px, 6vw, 72px) on inner pages, 1.0): the h1. One `mark` highlight word at most.
- **Headline** (800, clamp(32px, 4.2vw, 52px), 1.05): section h2s, centered and balanced.
- **Title** (800, about 20 to 24px): card and step titles.
- **Body** (400, 17px, 1.6): copy, with leads at 18 to 19px and a 46 to 52ch measure.
- **Hand** (Caveat 700, about 1.4rem): eyebrows, margin notes, "most start here", the counters on the calculator sliders.

### Named Rules
**The Plain Words Rule.** Main pages use words a non-technical owner understands. Tool names and technical terms only appear on deeper pages: /included, /developers, /how-it-works "under the hood", and /compare.

## Layout

- Container `.in`: 1180px max with a 20px gutter. Sections `.sec` have 96px of vertical padding and alternate white and `.soft` (paper 2 with hairline borders).
- Section heads are centered with a drawing, an eyebrow, the h2 and a lead. Use `.sec-head.left` only beside a column of content.
- Grids: `.types` (5 across, then 3, then 1), `.yours` (4 across, then 2), `.cards` (flexible), `.calc` (inputs 1.4fr next to a sticky result 1fr), and `.sys-flow` (node, arrow, node, arrow, sites).
- Breakpoints sit at about 1000, 860, 760, 640 and 480px. Everything stacks to one column by 760px, and arrows turn vertical on phones.
- Pages may never scroll sideways at 390px.

## Elevation & Depth

The site is flat with one signature lift: a hard, unblurred offset shadow in a ribbon colour behind ink-outlined panels. There are no soft drop shadows.

### Shadow Vocabulary
- **Feature** (`box-shadow: 8px 8px 0 var(--honey)`): the panel that matters most in a section, such as the calculator result, the picked size or "your own flat".
- **Technical** (`box-shadow: 8px 8px 0 var(--rose)`): technical-side and "engine" panels.
- **Small** (`4px 4px 0` or `5px 5px 0`): pressed calculator buttons and the volume tiers.
- **Button hover** (`0 6px 0 0 var(--amber)`): the ink button lifts 2px onto an amber base.

### Named Rules
**The One-Lift Rule.** At most one or two offset shadows per section. If everything lifts, nothing does.

## Shapes

- Ink outlines are 1.5px on panels, buttons and tiles. Quiet cards use a 1px Line border.
- Radii run 10px (buttons), 12px (tiles), 16px (cards), 18px (panels), 20px (picker doors) and 999px (pills and chips).
- Dashed borders mean "more to come" or "try it": the site grid, the "try it yourself" strip and order chips.
- Hero sketch panels tilt slightly (about 0.5 to 0.8 degrees) to feel hand-placed.

## Components

- **Drawing** (`<Drawing name>`): rough.js objects from `scripts/drawings.mjs`, served from public/drawings and fetched on the client. They draw in on scroll; pass `still` for small icons. Add new drawings in the generator, never by hand.
- **PageHero / SectionHead / Questions / CtaBand** (src/components/ui.tsx): the building blocks of every page.
- **SystemDiagram**: one storefront, AnyPress builds, many separate sites, then "we look after every one". Used on the homepage, /agencies and /how-it-works.
- **PriceCalculator / EarningsCalculator**: real buttons with `aria-pressed`, labelled range sliders, and a sticky result panel with the feature shadow.
- **Buttons**: `.btn-ink` (main action), `.btn-paper` (second action) and `.btn-honey` (on dark bands). The focus ring is a 3px ink outline with a honey halo.
- **Side pill**: "For you" (owners) or "Technical" at the top of a page.

## Do's and Don'ts

- **Do** give every concept a drawing that matches it literally.
- **Do** keep the ribbon colours inside drawings and shadows.
- **Do** honour reduced motion: everything shows finished and nothing is hidden.
- **Don't** use gradient text, glassmorphism, stock photos, illustrated people or logo rows.
- **Don't** invent testimonials, customer counts or ratings.
- **Don't** type colours into components; use the tokens in globals.css.
- **Don't** use Rose or Orange for small text.
