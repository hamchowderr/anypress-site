// Builds the site's Lottie animations into public/lottie/. Run: node scripts/lottie/build.mjs
// Each animation plays once when it scrolls into view and holds on its last frame, which matches
// the static drawing it replaces. Numbers in them are made-up examples.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAPER, animation, arc, arrive, circle, digits, group, keys, line, part, path, poly, pop, rect } from "./lib.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../../public/lottie");

/** A browser window outline: frame, top bar and the three dots. */
function windowFrame(x, y, w, h, t0) {
  return [
    part(rect(x, y, w, h, 14), { draw: [t0, t0 + 22], fill: "paper", name: "window" }),
    part(line([x, y + 40], [x + w, y + 40]), { draw: [t0 + 10, t0 + 24] }),
    ...[22, 38, 54].map((dx, i) => part(circle(x + dx, y + 20, 4), pop(t0 + 18 + i * 2, t0 + 26 + i * 2, [x + dx, y + 20]))),
  ];
}

/** Step 3: your site, your domain, your words. */
function makeItYours() {
  const caretBlink = keys(
    [[56, 0], [58, 100], [68, 0], [78, 100], [88, 0], [98, 100], [108, 0], [118, 100]],
    { hold: true },
  );
  return animation("make-it-yours", 150, [
    ...windowFrame(40, 30, 400, 300, 0),
    part(rect(120, 40, 240, 20, 10), { draw: [20, 30] }),
    part(line([134, 50], [256, 50]), { draw: [30, 56], width: 4 }),
    part(line([262, 44], [262, 56]), { o: caretBlink, width: 2 }),
    part(line([64, 108], [300, 108]), { draw: [44, 62], width: 9 }),
    part(line([64, 132], [250, 132]), { draw: [52, 68], width: 9 }),
    part(line([64, 164], [330, 164]), { draw: [62, 74] }),
    part(line([64, 184], [310, 184]), { draw: [66, 78] }),
    part(line([64, 204], [280, 204]), { draw: [70, 82] }),
    part(rect(64, 232, 110, 74, 8), { draw: [76, 90] }),
    part(rect(190, 232, 110, 74, 8), { draw: [84, 98], dash: [7, 8] }),
    part([line([245, 256], [245, 282]), line([232, 269], [258, 269])], pop(110, 122, [245, 269])),
    // The pencil arrives and "draws" the new item.
    group(
      [
        group(
          [
            part(rect(364, 96, 32, 150, 5), { fill: "paper" }),
            part(line([364, 120], [396, 120])),
            part(poly([364, 246], [380, 286], [396, 246]), { fill: "paper" }),
            part(poly([374, 271], [380, 286], [386, 271]), { fill: "ink" }),
          ],
          { r: 38, a: [380, 200], p: [380, 200], name: "pencil" },
        ),
      ],
      { ...arrive(90, 110, [70, -70]), name: "pencil move" },
    ),
  ]);
}

/** Step 4: an order comes in, and the AnyPress fee is $0.00. */
function openTheDoors() {
  const zig = [[130, 30], [350, 30], [350, 320]];
  for (let x = 332, up = false; x >= 130; x -= 18, up = !up) zig.push([x, up ? 320 : 336]);
  zig.push([130, 320]);
  return animation("open-the-doors", 140, [
    part(poly(...zig), { draw: [0, 28], fill: "paper", name: "receipt" }),
    part(line([156, 68], [250, 68]), { draw: [24, 34], width: 8 }),
    part(line([156, 90], [324, 90]), { draw: [30, 40], dash: [2, 7] }),
    part(line([156, 118], [236, 118]), { draw: [38, 48], width: 5 }),
    part(line([290, 118], [324, 118]), { draw: [42, 50], width: 5 }),
    part(line([156, 148], [226, 148]), { draw: [44, 54], width: 5 }),
    part(line([296, 148], [324, 148]), { draw: [48, 56], width: 5 }),
    part(line([156, 172], [324, 172]), { draw: [50, 58], dash: [2, 7] }),
    part(line([156, 200], [206, 200]), { draw: [56, 66], width: 6 }),
    part(line([280, 200], [324, 200]), { draw: [60, 68], width: 6 }),
    group(
      [
        part(rect(146, 226, 188, 44, 8), { fill: "ink" }),
        part(line([162, 248], [236, 248]), { draw: [80, 90], width: 5, color: PAPER }),
        ...digits("$0.00", 266, 239, 18, { draw: [84, 100], color: PAPER }),
      ],
      { ...pop(70, 84, [240, 248]), name: "fee" },
    ),
    group(
      [
        part(circle(380, 110, 46), { fill: "paper" }),
        part(circle(380, 110, 38)),
        part(line([362, 111], [375, 124], [400, 96]), { draw: [112, 126], width: 5 }),
      ],
      { a: [380, 110], p: [380, 110], r: keys([[104, -30], [120, -14]]), s: keys([[104, [160, 160]], [118, [100, 100]]]), o: keys([[104, 0], [107, 100]]), name: "stamp" },
    ),
  ]);
}

/** The crescent left when a smaller circle covers part of a bigger one. */
function crescent(c1, r1, c2, r2) {
  const [x1, y1] = c1;
  const [x2, y2] = c2;
  const d = Math.hypot(x2 - x1, y2 - y1);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(r1 * r1 - a * a);
  const mx = x1 + (a * (x2 - x1)) / d;
  const my = y1 + (a * (y2 - y1)) / d;
  const pA = [mx + (h * (y2 - y1)) / d, my - (h * (x2 - x1)) / d];
  const pB = [mx - (h * (y2 - y1)) / d, my + (h * (x2 - x1)) / d];
  const ang = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
  let a1 = ang(c1, pA);
  let b1 = ang(c1, pB);
  // Long way round the big circle, from A to B away from the small circle.
  if (b1 > a1) b1 -= 360;
  let a2 = ang(c2, pB);
  let b2 = ang(c2, pA);
  if (b2 < a2) b2 += 360;
  if (b2 - a2 > 180) b2 -= 360;
  const outer = arc(x1, y1, r1, a1, b1).ks.k;
  const inner = arc(x2, y2, r2, a2, b2).ks.k;
  return path(
    [
      ...outer.v.map((v, i) => [v[0], v[1], ...outer.i[i], ...outer.o[i]]),
      ...inner.v.slice(1).map((v, j) => [v[0], v[1], ...inner.i[j + 1], ...inner.o[j + 1]]),
    ],
    true,
  );
}

/** Step 5: a copy saved every night, locked up safe. */
function keepItRunning() {
  const copies = [0, 1, 2, 3].map((i) =>
    group(
      [
        part(rect(96 + i * 22, 176 + i * 30, 220, 64, 10), { fill: "paper" }),
        part(line([116 + i * 22, 196 + i * 30], [152 + i * 22, 196 + i * 30]), { width: 6 }),
        part(line([268 + i * 22, 196 + i * 30], [296 + i * 22, 196 + i * 30]), { width: 6 }),
      ],
      { ...arrive(30 + i * 12, 46 + i * 12, [0, -36]), name: `copy ${i + 1}` },
    ),
  );
  return animation("keep-it-running", 130, [
    part(crescent([136, 100], 46, [160, 82], 38), { draw: [0, 22], fill: "paper", name: "moon" }),
    ...[[210, 60], [300, 40], [262, 110]].map(([x, y], i) =>
      part([line([x - 4, y], [x + 4, y]), line([x, y - 4], [x, y + 4])], pop(16 + i * 5, 26 + i * 5, [x, y])),
    ),
    ...copies,
    group(
      [
        part([line([370, 112], [370, 78]), arc(392, 78, 22, 180, 360), line([414, 78], [414, 112])], { width: 5, p: keys([[84, [0, -16]], [100, [0, 0]]]) }),
        part(rect(356, 96, 72, 58, 10), { fill: "ink" }),
        part(circle(392, 122, 5), { fill: "paper", stroke: false }),
      ],
      { ...pop(76, 88, [392, 125]), name: "padlock" },
    ),
  ]);
}

/** Step 6: start small, then grow on the same site. */
function growWithYou() {
  const box = (x, y, k) => [
    part(poly([x + 20 * k, y + 40 * k], [x + 70 * k, y + 58 * k], [x + 120 * k, y + 40 * k], [x + 120 * k, y + 112 * k], [x + 70 * k, y + 130 * k], [x + 20 * k, y + 112 * k]), { fill: "paper" }),
    part([line([x + 70 * k, y + 58 * k], [x + 70 * k, y + 130 * k]), line([x + 20 * k, y + 40 * k], [x + 70 * k, y + 22 * k], [x + 120 * k, y + 40 * k])]),
  ];
  return animation("grow-with-you", 100, [
    group(box(40, 150, 1), { o: keys([[0, 0], [8, 100]]), p: keys([[0, [0, 20]], [18, [0, 0]]]), name: "small box" }),
    part(line([190, 220], [262, 220]), { draw: [20, 32] }),
    part(line([246, 204], [262, 220], [246, 236]), { draw: [28, 36] }),
    group(box(270, 60, 1.5), { ...pop(36, 60, [375, 340]), name: "big box" }),
    part([circle(412, 190, 22), line([412, 178], [412, 202]), line([400, 190], [424, 190])], { fill: "paper", ...pop(60, 74, [412, 190]) }),
  ]);
}

/** A box: back edges, then (optionally) what's inside, then the front faces on top. */
function boxParts(inside, t0 = 0) {
  return [
    part(line([150, 230], [240, 198], [330, 230]), { draw: [t0, t0 + 14] }),
    ...inside,
    part(poly([150, 230], [240, 262], [240, 350], [150, 318]), { draw: [t0, t0 + 20], fill: "paper" }),
    part(poly([240, 262], [330, 230], [330, 318], [240, 350]), { draw: [t0 + 4, t0 + 22], fill: "paper" }),
  ];
}

/** About: the loose parts of a website drop into one box. */
function partsIntoBox() {
  // Each part pivots around its own centre `at`, falling from an offset above the box.
  const fall = (at, t0, dx, dy, r) => ({
    a: at,
    p: keys([[t0, [at[0] + dx, at[1] + dy]], [t0 + 26, at]]),
    r: keys([[t0, r], [t0 + 26, 0]]),
    o: keys([[t0, 0], [t0 + 4, 100]]),
  });
  const inside = [
    group([part(rect(168, 176, 70, 52, 6), { fill: "paper" }), part(line([178, 192], [214, 192]), { width: 5 })], fall([203, 202], 18, -60, -200, -30)),
    group([part(rect(250, 168, 56, 56, 6), { fill: "paper" }), part(line([250, 184], [306, 184])), part(circle(278, 204, 6), { fill: "ink" })], fall([278, 196], 28, 70, -220, 35)),
    group([part(rect(274, 210, 52, 34, 4), { fill: "paper" }), part(line([274, 210], [300, 230], [326, 210]))], fall([300, 227], 38, 90, -190, -20)),
    group([part([line([216, 212], [216, 202]), arc(228, 202, 12, 180, 360), line([240, 202], [240, 212])], { width: 4 }), part(rect(210, 210, 36, 28, 5), { fill: "ink" })], fall([228, 222], 46, -10, -240, 25)),
  ];
  return animation("parts-into-box", 120, [
    ...boxParts(inside),
    part([circle(292, 296, 20), line([283, 297], [290, 304], [302, 289])], pop(84, 98, [292, 296])),
  ]);
}

/** Agencies: one site you set up, copied for every client. */
function oneToMany() {
  const siteCard = (x, y, w, h, t0) => [
    part(rect(x, y, w, h, 8), { draw: t0 === null ? undefined : [t0, t0 + 18], fill: "paper" }),
    part(line([x + 12, y + 16], [x + 40, y + 16]), { width: 6, draw: t0 === null ? undefined : [t0 + 10, t0 + 20] }),
    part(line([x + 12, y + h * 0.45], [x + w - 16, y + h * 0.45]), { draw: t0 === null ? undefined : [t0 + 14, t0 + 24] }),
    part(line([x + 12, y + h * 0.65], [x + w * 0.6, y + h * 0.65]), { draw: t0 === null ? undefined : [t0 + 16, t0 + 26] }),
  ];
  return animation("one-to-many", 120, [
    ...siteCard(40, 90, 150, 200, 0),
    part(rect(52, 190, 126, 70, 6), { draw: [16, 30] }),
    part(line([206, 190], [266, 190]), { draw: [30, 42] }),
    part(line([252, 176], [266, 190], [252, 204]), { draw: [38, 44] }),
    ...[0, 1, 2].map((i) =>
      group(
        [...siteCard(290, 50 + i * 100, 150, 80, null), part([circle(430, 60 + i * 100, 12), line([424, 60 + i * 100], [429, 65 + i * 100], [437, 55 + i * 100])], { fill: "paper", ...pop(70 + i * 12, 82 + i * 12, [430, 60 + i * 100]) })],
        { ...arrive(42 + i * 12, 62 + i * 12, [-120, 0]), name: `copy ${i + 1}` },
      ),
    ),
  ]);
}

/** Prices: open the box and your site comes out ready. */
function boxOpens() {
  const flapL = part(poly([150, 230], [240, 198], [220, 140], [130, 172]), { fill: "paper", a: [195, 214], p: [195, 214], s: keys([[10, [100, 0]], [30, [100, 100]]], { ease: { o: { x: [0.34], y: [1.56] }, i: { x: [0.64], y: [1] } } }) });
  const flapR = part(poly([240, 198], [330, 230], [350, 172], [260, 140]), { fill: "paper", a: [285, 214], p: [285, 214], s: keys([[16, [100, 0]], [36, [100, 100]]], { ease: { o: { x: [0.34], y: [1.56] }, i: { x: [0.64], y: [1] } } }) });
  const site = group(
    [
      part(rect(190, 120, 100, 80, 8), { fill: "paper" }),
      part(line([202, 136], [226, 136]), { width: 6 }),
      part(line([202, 160], [276, 160])),
      part(line([202, 176], [252, 176])),
    ],
    { p: keys([[36, [0, 110]], [66, [0, 0]]]), o: keys([[36, 0], [44, 100]]), name: "site" },
  );
  return animation("box-opens", 100, [
    ...boxParts([flapL, flapR, site]),
    ...[[176, 108], [312, 100], [334, 150]].map(([x, y], i) =>
      part([line([x - 6, y], [x + 6, y]), line([x, y - 6], [x, y + 6])], pop(66 + i * 5, 78 + i * 5, [x, y])),
    ),
  ]);
}

const ALL = { "make-it-yours": makeItYours, "open-the-doors": openTheDoors, "keep-it-running": keepItRunning, "grow-with-you": growWithYou, "parts-into-box": partsIntoBox, "one-to-many": oneToMany, "box-opens": boxOpens };

mkdirSync(OUT, { recursive: true });
for (const [name, make] of Object.entries(ALL)) {
  const json = JSON.stringify(make());
  writeFileSync(join(OUT, `${name}.json`), json);
  console.log(`${name}.json  ${(json.length / 1024).toFixed(1)} KB`);
}
