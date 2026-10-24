---
target: full audit of anypress.io
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/anypress-site/src/app/page.tsx"
target_fingerprint: "sha256:a42fbc9961914831c8bd7db66a93a6ea4ec172e4717e30d5023bc6594ece2112"
target_path: /home/user/anypress-site/src/app/page.tsx
timestamp: 2026-10-24T17-09-03Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

Target: anypress.io (main at 0f6758e, production build), 11 pages at 1440 and 390px.

## Design Health Score: 20/32 (Acceptable). Heuristics 7 and 10 n/a (marketing site)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | No current-page mark in the header; Start buttons never say you go to the shop to pay |
| 2 | Match with the real world | 3 | "1 CPU / 512 MB" at the buying moment; "database" on the homepage |
| 3 | User control and freedom | 3 | Mobile menu doesn't close on an outside tap |
| 4 | Consistency and standards | 2 | Medium same memory as Small; seller minimum 1 vs 3; /sell form off the design system |
| 5 | Error prevention | 2 | /sell pre-picked a radio answer; contact is email links only |
| 6 | Recognition rather than recall | 3 | Five identical "Start" buttons on mobile /pricing |
| 7 | Flexibility and efficiency | n/a | |
| 8 | Aesthetic and minimalist design | 3 | Homepage repeats the five inclusions three times and prices three times |
| 9 | Error recovery | 2 | Form errors show as one line above the button, not beside the field |
| 10 | Help and documentation | n/a | |

## Design Specificity Verdict
Mostly specific. The Sketchbook layer (literal rough.js drawings, Caveat notes, honey/rose offset shadows, the storefront-to-many-sites diagram, real example sites) could not be reused by another product. The page skeleton underneath is a standard SaaS template, and every section uses the same recipe (drawing, eyebrow, h2, lead), so the rhythm gets flat by the sixth section.

## Overall Impression
Honest, warm and clear. The weak spots are not the look but the facts at buying moments (sizes, seller rule, care claims) and a homepage that tries to serve owners and sellers at once.

## What's Working
1. The drawings are a real system, and the system diagram explains "every site is its own" better than words.
2. Proof is honest: labelled made-up businesses on real, clickable sites, with no invented logos, quotes or counts.
3. The calculators are real and checkable; the agencies one turns the reseller pitch into a number.

## Priority Issues
- [P1] Care claims go beyond what is offered. "Watched around the clock" (no per-site monitoring today) and "Updates done for you" (PRODUCT.md says not to claim automatic core updates; the Terms say we may update). Fix: removed "around the clock" (done); updates wording needs the owner.
- [P1] Sizes at the buying moment looked wrong and technical: Medium showed the same memory as Small. Fix: dropped the memory row (the Terms don't list it), added "pay on our shop, 30-day money-back" under the cards (done).
- [P1] Seller rule contradicted itself: "start at three" vs 0% for 1 to 2 sites. Nothing enforces a minimum. Fix: "no minimum, saving from the third site" everywhere (done).
- [P2] Homepage is long (about 17,000px on phones) and mixes two audiences: the seller storefront diagram, the 8-group grid and the sell band sit on the owner's homepage; /how-it-works opens with the seller view too. Fix: owner decision.
- [P2] Header Start button always went to the homepage picker and there was no current-page mark. Fix: Start stays on the type or group page; aria-current underline (done).

## Persona Red Flags
- Jordan (first-timer): the affiliate "Earn 30%" bar is the first thing on every page; "storefront", "starting site" and "the padlock" are never explained; nothing says Start leads to the shop.
- Riley (stress tester): Medium = 2x but same memory (fixed); seller minimum (fixed); example URLs show t-xxxx hashes that look like staging; form errors only above the button.
- Casey (mobile): about 17,000px homepage; affiliate bar takes 13% of the fold; 40px menu button (fixed to 44); five unlabelled Start buttons on /pricing; included strip clipped under reduced motion (fixed).
- Dana (pottery seller leaving a marketplace): /who/shops speaks to her, then sizes asked her to choose by CPU and MB; the last button forgot she wanted a store (fixed).
- Marcus (agency owner sizing up reselling): the earnings calculator sells it, but reseller wholesale prices are never shown, and /agencies carries a "Technical" pill.

## Technical evidence (detector, axe, speed)
- Detector: 99 findings, 98 advisory. 83 font sizes not in DESIGN.md's five type roles (a gap in the documented ramp, not drift), 10 undocumented warm tints, 5 radii, 1 bounce easing on the tile pop (off under reduced motion). Overlay: cramped "+ as many as you sell" tile (fixed), marquee (intentional), nested-cards on the mock browser bar (false positive).
- axe: 0 violations on 17 routes at both widths with reduced motion; the only flags with motion on are tiles caught mid-fade (false positive).
- Tap targets: footer email and standalone links were 22px (fixed); the rest are inline links in sentences (allowed).
- Speed on localhost: LCP 100 to 160ms, CLS 0 everywhere. The homepage grows to about 800 KB of page markup after its 30 drawings load (served HTML 88 KB, 17 KB zipped).
- No page scrolls sideways at 390px. Raw hex colours in sketch.css: 47 down to 13.

## Minor Observations
- /help questions changed width per group (fixed, full width).
- /sell form used an older button and red; pre-picked "Yes, I'll add our plugin" (fixed).
- /pricing ends on two buttons that mean the same thing ("Ask us" and "Talk to us").
- The fifth card sits alone at half width on phones in the type grid and price strip.
- FAQ layouts switch between centered and two-column with no clear reason.

## Questions to Consider
- Does the seller diagram belong on the homepage, or should "Sell websites" be one clear door?
- With testimonials off-limits, the example sites are the only proof. Why are they halfway down the page?
