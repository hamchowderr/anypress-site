// The little animated scenes in "Everything you can do with it" on each /sites/<type> page.
// Each scene is drawn with rough.js, like the drawings in scripts/drawings.mjs, and written out as Lottie JSON
// into public/lottie/<name>.json. Run `npm run vignettes` after changing one.
// The seed is fixed, so the same code always draws the same wobbles. Scenes play once when they scroll into view,
// and their last frame is the finished picture (it's also what people who turn off motion see).
import fs from 'node:fs';
import path from 'node:path';
import rough from 'roughjs';

const OUT = path.join(import.meta.dirname, '..', 'public', 'lottie');
const W = 320;
const H = 200;
const FR = 30;
const OP = 110;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const T = { ink: '#141414', paper: '#ffffff', c1: '#FFB338', c2: '#EE2F5E', c3: '#D21FA4', c4: '#FFC75A', c5: '#FF7A2A', sw: 2.2 };

// Easing anchors, as cubic-bezier [x1, y1, x2, y2].
const EASE = {
  settle: [0, 0.65, 0.51, 0.99],
  enter: [0.2, 0.75, 0.34, 0.94],
  travel: [1, 0.49, 0, 0.55],
  pop: [0.94, 0.75, 0.34, 0.94],
  hold: null,
};

let seed = 11;

// ---------- rough.js shapes into Lottie shape groups ----------

function opsToPaths(ops, closed) {
  const paths = [];
  let cur = null;
  for (const { op, data } of ops) {
    if (op === 'move') {
      if (cur && cur.v.length > 1) paths.push(cur);
      cur = { v: [[data[0], data[1]]], i: [[0, 0]], o: [[0, 0]] };
    } else if (op === 'lineTo') {
      cur.v.push([data[0], data[1]]);
      cur.i.push([0, 0]);
      cur.o.push([0, 0]);
    } else if (op === 'bcurveTo') {
      const last = cur.v[cur.v.length - 1];
      cur.o[cur.o.length - 1] = [data[0] - last[0], data[1] - last[1]];
      cur.v.push([data[4], data[5]]);
      cur.i.push([data[2] - data[4], data[3] - data[5]]);
      cur.o.push([0, 0]);
    }
  }
  if (cur && cur.v.length > 1) paths.push(cur);
  const r = (n) => Math.round(n * 10) / 10;
  return paths.map((p) => ({
    ty: 'sh',
    ks: { a: 0, k: { c: closed, v: p.v.map((x) => x.map(r)), i: p.i.map((x) => x.map(r)), o: p.o.map((x) => x.map(r)) } },
  }));
}

const tr = () => ({ ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } });
const stroke = (c, w) => ({ ty: 'st', c: { a: 0, k: [...hex(c), 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: w }, lc: 2, lj: 2 });
const fill = (c) => ({ ty: 'fl', c: { a: 0, k: [...hex(c), 1] }, o: { a: 0, k: 100 }, r: 1 });

// A pen for one moving part. Coordinates are in the scene's 320 x 200 space.
function pen() {
  const g = rough.generator();
  const items = [];
  const o = (f, e = {}) => ((f = f === 'none' ? undefined : f), {
    stroke: T.ink, strokeWidth: T.sw, roughness: 1.2, bowing: 1, seed: seed++,
    fill: f, fillStyle: f === T.paper ? 'solid' : 'hachure', hachureGap: 5, fillWeight: 1.6, hachureAngle: -40, ...e,
  });
  const add = (d) => {
    for (const set of d.sets) {
      if (set.type === 'path') items.push({ ty: 'gr', it: [...opsToPaths(set.ops, false), stroke(d.options.stroke, d.options.strokeWidth), tr()] });
      else if (set.type === 'fillSketch') items.push({ ty: 'gr', it: [...opsToPaths(set.ops, false), stroke(d.options.fill, d.options.fillWeight), tr()] });
      else if (set.type === 'fillPath') items.push({ ty: 'gr', it: [...opsToPaths(set.ops, true), fill(d.options.fill), tr()] });
    }
  };
  const p = {
    rect: (x, y, w, h, f = T.paper, e) => (add(g.rectangle(x, y, w, h, o(f, e))), p),
    ell: (x, y, w, h, f = T.paper, e) => (add(g.ellipse(x, y, w, h, o(f, e))), p),
    line: (x1, y1, x2, y2, e) => (add(g.line(x1, y1, x2, y2, o(undefined, e))), p),
    poly: (pts, f = T.paper, e) => (add(g.polygon(pts, o(f, e))), p),
    path: (d, f, e) => (add(g.path(d, o(f, e))), p),
    // Placeholder words: a few short lines.
    words: (x, y, widths, gap = 10, e = {}) => {
      widths.forEach((w, i) => p.line(x, y + i * gap, x + w, y + i * gap, { strokeWidth: 1.5, ...e }));
      return p;
    },
    // Later shapes sit on top, and Lottie draws the first item on top, so flip the list.
    items: () => [...items].reverse(),
  };
  return p;
}

// ---------- keyframes ----------

// keys: [[frame, value, ease?], ...]. The ease belongs to the move that starts at that frame.
function anim(keys, dims) {
  const wrap = (v) => (Array.isArray(v) ? v : [v]);
  if (keys.length === 1) return { a: 0, k: dims === 1 ? keys[0][1] : wrap(keys[0][1]) };
  return {
    a: 1,
    k: keys.map(([t, v, e = 'settle'], idx) => {
      const k = { t, s: wrap(v) };
      const ez = EASE[e];
      if (idx < keys.length - 1) {
        if (ez === null) k.h = 1;
        else {
          k.o = { x: ez[0], y: ez[1] };
          k.i = { x: ez[2], y: ez[3] };
        }
      }
      return k;
    }),
  };
}

// One moving part. `at` is its pivot in scene coordinates; p, s, r, o are keyframe lists for position (offset
// from where it was drawn), scale (%), rotation (deg) and opacity (%). `draw` = [from, to] draws it on with a pen.
function part(name, pn, { at = [W / 2, H / 2], p, s, r, o, draw, from = 0 } = {}) {
  const shapes = pn.items();
  if (draw) {
    shapes.push({
      ty: 'tm',
      s: { a: 0, k: 0 },
      e: anim([[draw[0], 0, 'enter'], [draw[1], 100]], 1),
      o: { a: 0, k: 0 },
      m: 1,
    });
  }
  const pos = (p ?? [[0, [0, 0]]]).map(([t, v, e]) => [t, [at[0] + v[0], at[1] + v[1], 0], e]);
  const ks = {
    o: anim(o ?? [[0, 100]], 1),
    r: anim(r ?? [[0, 0]], 1),
    p: anim(pos, 3),
    a: { a: 0, k: [at[0], at[1], 0] },
    s: anim((s ?? [[0, 100]]).map(([t, v, e]) => [t, [v, v, 100], e]), 3),
  };
  if (ks.p.a) for (const k of ks.p.k) Object.assign(k, { to: [0, 0, 0], ti: [0, 0, 0] });
  return { ddd: 0, ty: 4, nm: name, sr: 1, ks, ao: 0, shapes, ip: from, op: OP, st: 0, bm: 0 };
}

// Common moves.
const popIn = (t, peak = 112) => ({ s: [[0, 0, 'hold'], [t, 0, 'pop'], [t + 8, peak, 'settle'], [t + 14, 100]], o: [[0, 0, 'hold'], [t, 100]] });
const fadeIn = (t, d = 8) => ({ o: [[0, 0, 'hold'], [t, 0, 'enter'], [t + d, 100]] });
const slideIn = (t, dx, dy, d = 16) => ({ p: [[0, [dx, dy], 'hold'], [t, [dx, dy], 'enter'], [t + d, [0, 0]]], o: [[0, 0, 'hold'], [t, 0, 'enter'], [t + 6, 100]] });
const press = (t) => ({ s: [[0, 100, 'hold'], [t, 100, 'enter'], [t + 4, 90, 'settle'], [t + 10, 100]] });

// ---------- props ----------

const tick = (x, y, sz = 1, c = T.c2) => pen().path(`M${x - 9 * sz} ${y} l${7 * sz} ${8 * sz} l${14 * sz} -${17 * sz}`, undefined, { stroke: c, strokeWidth: 4.2 * sz, roughness: 0.8 });
const cursor = (x, y) => pen().poly([[x, y], [x, y + 30], [x + 7, y + 23], [x + 12, y + 35], [x + 18, y + 32], [x + 13, y + 20], [x + 23, y + 19]], T.paper, { roughness: 0.7 });
const envelope = (x, y, w = 58, h = 40) => pen().rect(x, y, w, h).path(`M${x} ${y} L${x + w / 2} ${y + h * 0.58} L${x + w} ${y}`);
const browser = (x, y, w, h) => {
  const b = pen().rect(x, y, w, h).line(x, y + 16, x + w, y + 16, { strokeWidth: 1.6 });
  for (const i of [0, 1, 2]) b.ell(x + 10 + i * 9, y + 8, 5, 5, T.paper, { strokeWidth: 1.2 });
  return b;
};
const coin = (x, y, d = 30) => pen().ell(x, y, d, d, T.c4).ell(x, y, d * 0.55, d * 0.55, 'none', { strokeWidth: 1.4 });
const renew = (x, y, rad = 16, c = T.c2) =>
  pen().path(`M${x + rad} ${y} A${rad} ${rad} 0 1 1 ${x} ${y - rad}`, undefined, { stroke: c, strokeWidth: 3 }).path(`M${x - 6} ${y - rad - 6} L${x + 2} ${y - rad} L${x - 5} ${y - rad + 7}`, undefined, { stroke: c, strokeWidth: 3 });

// ---------- the scenes ----------

const scenes = {};

// Website: pages, a blog, and it fits a phone.
scenes['website-pages'] = () => [
  part('browser', browser(28, 30, 190, 132), { draw: [0, 22] }),
  part('hero', pen().rect(42, 56, 76, 38, T.c1), { at: [80, 75], ...popIn(18) }),
  part('copy', pen().words(130, 62, [70, 56, 64]), { at: [160, 72], ...fadeIn(26) }),
  part('page1', pen().rect(42, 108, 48, 40).words(50, 120, [30, 22], 9), slideIn(32, 30, 0)),
  part('page2', pen().rect(98, 108, 48, 40, T.c4).words(106, 120, [30, 22], 9), slideIn(40, 30, 0)),
  part('page3', pen().rect(154, 108, 48, 40).words(162, 120, [30, 22], 9), slideIn(48, 30, 0)),
  part('phone', pen().rect(234, 52, 62, 118).rect(242, 70, 46, 26, T.c1).words(244, 108, [40, 32, 36], 10).ell(265, 160, 8, 8, T.ink), {
    at: [265, 111],
    ...popIn(66, 108),
    r: [[0, 8, 'hold'], [66, 8, 'settle'], [86, 3]],
  }),
];

// Website: forms, a newsletter and set up for Google.
scenes['website-forms'] = () => [
  part('form', pen().rect(40, 24, 150, 152).words(56, 42, [60]), { draw: [0, 20] }),
  part('field1', pen().rect(56, 56, 118, 24), fadeIn(14)),
  part('typed1', pen().line(64, 68, 140, 68, { strokeWidth: 1.8 }), { at: [64, 68], s: [[0, 0, 'hold'], [20, 0, 'settle'], [38, 100]], o: [[0, 0, 'hold'], [20, 100]] }),
  part('field2', pen().rect(56, 90, 118, 36), fadeIn(18)),
  part('typed2', pen().words(64, 102, [96, 70], 12, { strokeWidth: 1.8 }), { at: [64, 108], s: [[0, 0, 'hold'], [36, 0, 'settle'], [54, 100]], o: [[0, 0, 'hold'], [36, 100]] }),
  part('button', pen().rect(56, 138, 70, 24, T.c2), { at: [91, 150], ...fadeIn(22), ...press(60) }),
  part('mail', envelope(206, 70), { at: [235, 90], p: [[0, [-140, 60], 'hold'], [64, [-140, 60], 'travel'], [86, [0, 0]]], s: [[0, 40, 'hold'], [64, 40, 'travel'], [86, 100]], r: [[0, -20, 'hold'], [64, -20, 'settle'], [90, 6]], o: [[0, 0, 'hold'], [64, 100]] }),
  part('ok', tick(286, 66, 0.9), { at: [286, 62], ...popIn(90) }),
];

// Website: your colours, logo, domain and team.
scenes['website-yours'] = () => [
  part('browser', browser(30, 26, 200, 140), { draw: [0, 22] }),
  part('header1', pen().rect(40, 50, 180, 30, T.c4), fadeIn(16)),
  part('header2', pen().rect(40, 50, 180, 30, T.c2), { o: [[0, 0, 'hold'], [44, 0, 'enter'], [52, 100]] }),
  part('logo', pen().ell(60, 65, 22, 22, T.paper).ell(60, 65, 9, 9, T.ink), { at: [60, 65], ...popIn(70) }),
  part('body', pen().words(48, 98, [120, 150, 100, 130], 14), fadeIn(20)),
  part('sw1', pen().ell(262, 50, 30, 30, T.c4), { at: [262, 50], ...popIn(10) }),
  part('sw2', pen().ell(262, 92, 30, 30, T.c2), { at: [262, 92], ...popIn(14) }),
  part('sw3', pen().ell(262, 134, 30, 30, T.c3), { at: [262, 134], ...popIn(18) }),
  part('cursor', cursor(266, 94), { at: [266, 94], p: [[0, [20, 80], 'hold'], [22, [20, 80], 'travel'], [40, [0, 0]]], ...fadeIn(22, 6), ...press(42) }),
];

// Bookings: any kind of appointment, class or call.
scenes['bookings-calendar'] = () => {
  const cal = pen().rect(60, 22, 200, 156).rect(60, 22, 200, 30, T.c2);
  const days = pen();
  for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) if (!(i === 3 && j === 1)) days.rect(78 + i * 36, 66 + j * 36, 22, 22, T.paper, { strokeWidth: 1.5 });
  return [
    part('calendar', cal, { draw: [0, 22] }),
    part('days', days, fadeIn(14, 10)),
    part('slot', pen().rect(186, 102, 22, 22, T.paper, { strokeWidth: 1.5 }), fadeIn(14, 10)),
    part('booked', pen().rect(186, 102, 22, 22, T.c4, { strokeWidth: 1.5 }), { at: [197, 113], ...popIn(54) }),
    part('ring', pen().ell(197, 113, 46, 40, 'none', { stroke: T.c2, strokeWidth: 3.2 }), { draw: [58, 76], ...fadeIn(58, 2) }),
    part('cursor', cursor(200, 116), { at: [200, 116], p: [[0, [90, 50], 'hold'], [26, [90, 50], 'travel'], [46, [0, 0]]], ...fadeIn(26, 6), ...press(48) }),
    part('ok', tick(286, 46), { at: [286, 42], ...popIn(84) }),
  ];
};

// Bookings: paid when they book, with confirmations and reminders.
scenes['bookings-paid'] = () => [
  part('card', pen().rect(26, 62, 120, 76, T.c3).line(26, 82, 146, 82, { strokeWidth: 5 }).rect(38, 96, 22, 16, T.c4, { strokeWidth: 1.5 }).line(80, 122, 132, 122, { strokeWidth: 1.5 }), {
    at: [86, 100],
    ...slideIn(4, -60, 0, 20),
    r: [[0, -10, 'hold'], [4, -10, 'settle'], [26, -4]],
  }),
  part('paid', tick(140, 64, 1.1), { at: [140, 60], ...popIn(30) }),
  part('mail', envelope(172, 92, 64, 44), slideIn(46, 0, 40)),
  part('bell', pen().path('M262 60 q0 -22 20 -22 q20 0 20 22 v16 l8 10 h-56 l8 -10 z', T.c4).ell(282, 92, 10, 8, T.ink), {
    at: [282, 40],
    ...popIn(64),
    r: [[0, 0, 'hold'], [72, 0, 'settle'], [77, 16, 'settle'], [83, -12, 'settle'], [89, 8, 'settle'], [95, 0]],
  }),
];

// Bookings: your hours, breaks and questions.
scenes['bookings-hours'] = () => [
  part('clock', pen().ell(92, 96, 120, 120, T.paper).ell(92, 96, 8, 8, T.ink), { draw: [0, 20] }),
  part('ticks', pen().line(92, 44, 92, 52).line(144, 96, 136, 96).line(92, 148, 92, 140).line(40, 96, 48, 96), fadeIn(16)),
  part('minute', pen().line(92, 96, 92, 54, { strokeWidth: 3 }), { at: [92, 96], r: [[0, 0, 'hold'], [18, 0, 'travel'], [64, 300]], ...fadeIn(16) }),
  part('hour', pen().line(92, 96, 118, 96, { strokeWidth: 3.4 }), { at: [92, 96], r: [[0, -60, 'hold'], [18, -60, 'travel'], [64, -35]], ...fadeIn(16) }),
  part('day', pen().words(166, 60, [12], 0).words(166, 100, [12], 0).words(166, 140, [12], 0), { draw: [8, 26] }),
  part('free1', pen().rect(182, 48, 54, 24, T.c4), { at: [209, 60], ...popIn(34) }),
  part('break', pen().rect(242, 48, 40, 24, T.ink, { hachureGap: 4 }), { at: [262, 60], ...popIn(42) }),
  part('free2', pen().rect(198, 88, 70, 24, T.c4), { at: [233, 100], ...popIn(50) }),
  part('free3', pen().rect(182, 128, 44, 24, T.c4), { at: [204, 140], ...popIn(58) }),
  part('booked', pen().rect(232, 128, 56, 24, T.c2), { at: [260, 140], ...popIn(76) }),
];

// Store: products with options, downloads and subscriptions.
scenes['store-products'] = () => [
  part('product', pen().rect(30, 22, 130, 156).rect(42, 34, 106, 70, T.c1).words(44, 118, [70, 46], 11), { draw: [0, 22] }),
  part('chips', pen().rect(42, 144, 26, 22).rect(78, 144, 26, 22).rect(114, 144, 26, 22), fadeIn(18)),
  part('pick', pen().ell(55, 155, 40, 36, 'none', { stroke: T.c2, strokeWidth: 3 }), {
    at: [55, 155],
    p: [[0, [0, 0], 'hold'], [34, [0, 0], 'travel'], [46, [36, 0], 'hold'], [58, [36, 0], 'travel'], [70, [72, 0]]],
    ...popIn(24),
  }),
  part('tray', pen().path('M196 120 v26 h80 v-26', undefined, { strokeWidth: 2.6 }), { draw: [12, 30] }),
  part('download', pen().line(236, 40, 236, 108, { strokeWidth: 3.4 }).path('M220 92 L236 110 L252 92', undefined, { strokeWidth: 3.4 }), {
    at: [236, 80],
    p: [[0, [0, -40], 'hold'], [40, [0, -40], 'enter'], [62, [0, 0]]],
    o: [[0, 0, 'hold'], [40, 0, 'enter'], [46, 100]],
  }),
  part('renew', renew(286, 52, 15), { at: [286, 52], ...popIn(74), r: [[0, -180, 'hold'], [74, -180, 'settle'], [104, 0]] }),
];

// Store: discount codes, customer accounts and order emails.
scenes['store-checkout'] = () => [
  part('receipt', pen().path('M60 24 h120 v150 l-15 -10 l-15 10 l-15 -10 l-15 10 l-15 -10 l-15 10 l-15 -10 l-15 10 z').words(76, 46, [60, 80, 50], 16), { draw: [0, 24] }),
  part('total', pen().rect(76, 118, 88, 22, T.c4), { at: [76, 129], s: [[0, 100, 'hold'], [44, 100, 'settle'], [58, 62]], ...fadeIn(20) }),
  part('tag', pen().poly([[198, 40], [244, 34], [254, 62], [206, 70], [188, 56]], T.c2).ell(200, 54, 7, 7, T.paper), {
    at: [220, 52],
    p: [[0, [30, -60], 'hold'], [26, [30, -60], 'travel'], [44, [-40, 60]]],
    r: [[0, 30, 'hold'], [26, 30, 'settle'], [48, -8]],
    o: [[0, 0, 'hold'], [26, 100]],
  }),
  part('mail', envelope(220, 120, 62, 42), slideIn(66, 0, 30)),
  part('ok', tick(292, 112), { at: [292, 108], ...popIn(88) }),
];

// Store: shipping, tax and getting found.
scenes['store-shipping'] = () => [
  part('road', pen().path('M40 150 C110 120, 190 170, 262 136', undefined, { strokeDasharray: '1', strokeWidth: 2 }), { draw: [0, 30] }),
  part('house', pen().poly([[244, 92], [276, 64], [308, 92]], T.c2).rect(252, 92, 48, 46).rect(270, 112, 12, 26, T.c4, { strokeWidth: 1.5 }), { draw: [6, 26] }),
  part('box', pen().rect(22, 110, 46, 40, T.c1).line(22, 124, 68, 124, { strokeWidth: 1.6 }).line(45, 110, 45, 124, { strokeWidth: 1.6 }), {
    at: [45, 150],
    p: [[0, [0, 0], 'hold'], [28, [0, 0], 'travel'], [48, [80, -6], 'travel'], [70, [150, -10]]],
    r: [[0, 0, 'hold'], [28, 0, 'settle'], [38, -6, 'settle'], [52, 4, 'settle'], [70, 0]],
    ...fadeIn(10),
  }),
  part('pin', pen().path('M276 26 q-14 0 -14 14 q0 12 14 26 q14 -14 14 -26 q0 -14 -14 -14 z', T.c2).ell(276, 40, 8, 8, T.paper), { at: [276, 64], ...popIn(78, 118) }),
];

// Community: a feed, groups and member profiles.
scenes['community-feed'] = () => [
  part('av1', pen().ell(46, 50, 30, 30, T.c4), { at: [46, 50], ...popIn(4) }),
  part('b1', pen().path('M70 30 h150 q8 0 8 8 v26 q0 8 -8 8 h-142 l-12 8 v-42 q0 -8 4 -8 z', T.paper).words(84, 46, [110, 80], 12), { at: [70, 50], ...popIn(8, 106) }),
  part('av2', pen().ell(274, 106, 30, 30, T.c2), { at: [274, 106], ...popIn(22) }),
  part('b2', pen().path('M100 86 h142 q6 0 6 6 v28 l10 10 h-158 q-8 0 -8 -8 v-28 q0 -8 8 -8 z', T.c3).words(114, 102, [104, 70], 12), { at: [250, 108], ...popIn(26, 106) }),
  part('av3', pen().ell(46, 160, 30, 30, T.c1), { at: [46, 160], ...popIn(40) }),
  part('b3', pen().path('M70 142 h120 q8 0 8 8 v22 q0 8 -8 8 h-112 l-12 6 v-36 q0 -8 4 -8 z', T.paper).words(84, 158, [90]), { at: [70, 160], ...popIn(44, 106) }),
  part('heart', pen().path('M262 150 c-8 -12 -26 -4 -18 10 l18 16 l18 -16 c8 -14 -10 -22 -18 -10 z', T.c2, { strokeWidth: 2 }), { at: [262, 164], ...popIn(70, 130) }),
];

// Community: courses with lessons and progress.
scenes['community-courses'] = () => {
  const rows = pen();
  for (const i of [0, 1, 2]) rows.rect(52, 40 + i * 38, 22, 22, T.paper, { strokeWidth: 1.6 }).words(88, 51 + i * 38, [110 - i * 20]);
  return [
    part('list', pen().rect(36, 22, 196, 136), { draw: [0, 20] }),
    part('rows', rows, fadeIn(12)),
    part('t1', tick(63, 52, 0.8), { at: [63, 50], ...popIn(26) }),
    part('t2', tick(63, 90, 0.8), { at: [63, 88], ...popIn(42) }),
    part('t3', tick(63, 128, 0.8), { at: [63, 126], ...popIn(58) }),
    part('track', pen().rect(36, 170, 196, 14), fadeIn(12)),
    part('fill', pen().rect(36, 170, 196, 14, T.c4), { at: [36, 177], s: [[0, 0, 'hold'], [22, 0, 'settle'], [30, 33, 'hold'], [38, 33, 'settle'], [46, 66, 'hold'], [54, 66, 'settle'], [64, 100]], o: [[0, 0, 'hold'], [22, 100]] }),
    part('cap', pen().poly([[276, 56], [314, 70], [276, 84], [238, 70]], T.ink).path('M254 78 v14 q22 12 44 0 v-14', T.paper).line(311, 71, 312, 96).ell(312, 100, 7, 7, T.c4), { at: [276, 80], ...popIn(74, 116) }),
  ];
};

// Community: free and paid memberships, paid once or monthly.
scenes['community-members'] = () => [
  part('card', pen().rect(40, 48, 160, 104, T.paper).rect(40, 48, 160, 26, T.c3).ell(76, 112, 34, 34, T.c4).words(104, 104, [70, 50], 14), { draw: [0, 22] }),
  part('s1', pen().poly(star(226, 52, 11), T.c4), { at: [226, 52], ...popIn(30) }),
  part('s2', pen().poly(star(254, 52, 11), T.c4), { at: [254, 52], ...popIn(38) }),
  part('s3', pen().poly(star(282, 52, 11), T.c4), { at: [282, 52], ...popIn(46) }),
  part('coin', coin(256, 120, 36), { at: [256, 120], p: [[0, [0, -90], 'hold'], [56, [0, -90], 'travel'], [70, [0, 0], 'settle'], [76, [0, -10], 'settle'], [82, [0, 0]]], o: [[0, 0, 'hold'], [56, 100]] }),
  part('renew', renew(256, 120, 30, T.c2), { at: [256, 120], ...fadeIn(84), r: [[0, -120, 'hold'], [84, -120, 'settle'], [106, 0]] }),
];

// Everything: a shop and bookings on one site.
scenes['everything-sell'] = () => [
  part('bag', pen().path('M78 76 C76 40, 126 40, 124 76').poly([[50, 76], [152, 76], [162, 166], [40, 166]], T.c1).ell(78, 76, 7, 7, T.ink).ell(124, 76, 7, 7, T.ink), { at: [101, 166], ...popIn(4, 106) }),
  part('cal', pen().rect(186, 52, 110, 104).rect(186, 52, 110, 24, T.c2).rect(200, 88, 18, 18, T.paper, { strokeWidth: 1.5 }).rect(232, 88, 18, 18, T.paper, { strokeWidth: 1.5 }).rect(264, 88, 18, 18, T.paper, { strokeWidth: 1.5 }).rect(200, 120, 18, 18, T.paper, { strokeWidth: 1.5 }).rect(264, 120, 18, 18, T.paper, { strokeWidth: 1.5 }), { draw: [16, 38] }),
  part('day', pen().rect(232, 120, 18, 18, T.c4, { strokeWidth: 1.5 }), { at: [241, 129], ...popIn(50) }),
  part('tag', pen().poly([[130, 100], [170, 96], [176, 122], [136, 128], [122, 114]], T.paper).ell(132, 112, 6, 6), { at: [150, 112], ...popIn(30), r: [[0, -20, 'hold'], [30, -20, 'settle'], [50, 4]] }),
  part('ok', tick(241, 128, 0.7), { at: [241, 126], ...popIn(64) }),
];

// Everything: courses, members and a help desk.
scenes['everything-teach'] = () => [
  part('screen', pen().rect(26, 34, 150, 120).words(42, 56, [90, 110]), { draw: [0, 20] }),
  part('track', pen().rect(42, 120, 118, 14), fadeIn(14)),
  part('fill', pen().rect(42, 120, 118, 14, T.c4), { at: [42, 127], s: [[0, 0, 'hold'], [20, 0, 'travel'], [56, 75]], o: [[0, 0, 'hold'], [20, 100]] }),
  part('q', pen().path('M196 40 h96 q8 0 8 8 v28 q0 8 -8 8 h-80 l-16 12 v-48 q0 -8 0 -8 z', T.paper).words(208, 56, [70, 50], 12), { at: [196, 62], ...popIn(36, 106) }),
  part('a', pen().path('M206 104 h88 q8 0 8 8 v26 l12 12 h-108 q-8 0 -8 -8 v-30 q0 -8 8 -8 z', T.c3).words(218, 120, [64, 44], 12), { at: [300, 128], ...popIn(62, 106) }),
];

// Everything: one record for every customer.
scenes['everything-record'] = () => [
  part('record', pen().rect(96, 30, 128, 140, T.paper).ell(160, 70, 40, 40, T.c4).words(124, 104, [72, 56], 14), { at: [160, 100], ...popIn(4, 104) }),
  part('mail', envelope(20, 40, 46, 32), { at: [43, 56], p: [[0, [0, 0], 'hold'], [34, [0, 0], 'travel'], [54, [85, 96]]], s: [[0, 100, 'hold'], [34, 100, 'travel'], [54, 45]], ...fadeIn(10) }),
  part('bag', pen().path('M266 46 C265 30, 287 30, 286 46').poly([[256, 46], [296, 46], [300, 80], [252, 80]], T.c1), { at: [276, 64], p: [[0, [0, 0], 'hold'], [42, [0, 0], 'travel'], [62, [-116, 88]]], s: [[0, 100, 'hold'], [42, 100, 'travel'], [62, 45]], ...fadeIn(16) }),
  part('form', pen().rect(250, 128, 46, 46).words(258, 142, [30, 24, 28], 9), { at: [273, 151], p: [[0, [0, 0], 'hold'], [50, [0, 0], 'travel'], [70, [-81, 1]]], s: [[0, 100, 'hold'], [50, 100, 'travel'], [70, 45]], ...fadeIn(22) }),
  part('ok', tick(214, 44), { at: [214, 40], ...popIn(80) }),
];

function star(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return pts;
}

fs.mkdirSync(OUT, { recursive: true });
for (const [name, build] of Object.entries(scenes)) {
  seed = 11 + name.length * 7;
  // The first part in the list is drawn on top in Lottie, so later parts go first.
  const layers = build().reverse().map((l, i) => ({ ...l, ind: i + 1 }));
  const doc = { v: '5.12.2', fr: FR, ip: 0, op: OP, w: W, h: H, nm: name, ddd: 0, assets: [], layers };
  fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(doc));
}
console.log(`wrote ${Object.keys(scenes).length} scenes to public/lottie`);
