// The hand-drawn objects used across the site, drawn with rough.js into plain SVG strings.
// Run `npm run drawings` after changing a drawing; it rewrites src/components/drawings.generated.ts.
// The seed is fixed, so the same code always draws the same wobbles.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import rough from 'roughjs';

const __dirname = import.meta.dirname;
const T = { ink: '#141414', paper: '#ffffff', c1: '#FFB338', c2: '#EE2F5E', c3: '#D21FA4', c4: '#FFC75A', c5: '#FF7A2A', fs: 'hachure', gap: 5, sw: 2.2 };

let seed = 7;
function mk() {
  const g = rough.generator();
  const out = [];
  const o = (fill, extra = {}) => Object.assign({
    stroke: T.ink, strokeWidth: T.sw, roughness: 1.3, bowing: 1.2, seed: seed++,
    fill, fillStyle: fill === T.paper ? 'solid' : T.fs, hachureGap: T.gap, fillWeight: 1.6, hachureAngle: -40,
  }, extra);
  const add = (d) => { for (const p of g.toPaths(d)) out.push(p); };
  return {
    rect: (x, y, w, h, fill = T.paper, e) => add(g.rectangle(x, y, w, h, o(fill, e))),
    ell: (x, y, w, h, fill = T.paper, e) => add(g.ellipse(x, y, w, h, o(fill, e))),
    line: (x1, y1, x2, y2, e) => add(g.line(x1, y1, x2, y2, o(undefined, e))),
    poly: (pts, fill = T.paper, e) => add(g.polygon(pts, o(fill, e))),
    path: (d, fill, e) => add(g.path(d, o(fill, e))),
    text: (x, y, str, size = 20, fill = T.ink, rot = 0) => out.push({ raw: `<text x="${x}" y="${y}" font-family="Caveat, 'Comic Sans MS', cursive" font-weight="700" font-size="${size}" fill="${fill}" text-anchor="middle"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}>${str}</text>` }),
    svg: (vb, label) => `<svg class="obj" viewBox="${vb}" aria-hidden="true" data-label="${label}" fill="none">` +
      out.map(p => p.raw ? p.raw : `<path pathLength="1" d="${p.d.replace(/(\d+\.\d)\d+/g, '$1')}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"/>`).join('') + '</svg>',
    raw: out,
  };
}

const parts = {};

// Website & blog: a laptop showing a little home page
parts.website = () => { const d = mk();
  d.rect(42, 26, 156, 106);
  d.rect(54, 38, 132, 82, T.paper);
  d.rect(62, 48, 66, 34, T.c1);
  d.line(138, 52, 178, 52); d.line(138, 62, 172, 62); d.line(138, 72, 160, 72);
  d.rect(62, 92, 34, 20, T.c2); d.rect(104, 92, 34, 20); d.rect(146, 92, 32, 20, T.c4);
  d.poly([[26, 136], [214, 136], [230, 160], [10, 160]]);
  d.line(100, 148, 140, 148);
  return d.svg('0 0 240 175', 'A laptop showing a website'); };

// Bookings: a calendar page with one day circled, plus a clock
parts.bookings = () => { const d = mk();
  d.rect(40, 34, 150, 132);
  d.rect(40, 34, 150, 30, T.c2);
  for (const x of [72, 115, 158]) d.ell(x, 34, 9, 24, T.paper);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) d.rect(54 + i * 26, 78 + j * 27, 14, 14, (i === 3 && j === 1) ? T.c4 : T.paper, { strokeWidth: 1.6 });
  d.ell(139, 112, 40, 34, undefined, { stroke: T.c2, strokeWidth: 3.2 });
  d.ell(196, 150, 56, 56, T.c4);
  d.line(196, 150, 196, 132); d.line(196, 150, 210, 158);
  return d.svg('0 0 240 185', 'A calendar with a booked day circled'); };

// Online store: a shopping bag with a price tag
parts.store = () => { const d = mk();
  d.path('M92 74 C90 30, 150 30, 148 74');
  d.poly([[56, 74], [184, 74], [196, 178], [44, 178]], T.c1);
  d.line(56, 92, 184, 92, { strokeWidth: 1.6 });
  d.ell(92, 74, 8, 8, T.ink); d.ell(148, 74, 8, 8, T.ink);
  d.poly([[160, 118], [214, 112], [222, 146], [168, 154], [150, 138]], T.paper);
  d.ell(164, 136, 9, 9);
  d.line(178, 128, 208, 125); d.line(180, 140, 202, 138);
  return d.svg('0 0 240 190', 'A shopping bag with a price tag'); };

// Community & courses: two chat bubbles and a graduation cap
parts.courses = () => { const d = mk();
  d.path('M28 58 h104 q10 0 10 10 v44 q0 10 -10 10 h-62 l-22 20 v-20 h-20 q-10 0 -10 -10 v-44 q0 -10 10 -10 z', T.c3);
  d.line(44, 80, 120, 80); d.line(44, 96, 100, 96);
  d.path('M112 112 h96 q10 0 10 10 v38 q0 10 -10 10 h-12 v20 l-22 -20 h-62 q-10 0 -10 -10 v-38 q0 -10 10 -10 z', T.paper);
  d.line(128, 132, 196, 132); d.line(128, 148, 176, 148);
  d.poly([[170, 12], [226, 30], [170, 48], [114, 30]], T.ink);
  d.path('M138 38 v18 q32 16 64 0 v-18', T.paper);
  d.line(222, 31, 224, 58); d.ell(224, 62, 8, 8, T.c4);
  return d.svg('0 0 240 200', 'Chat bubbles and a graduation cap'); };

// Everything: a little shopfront with a striped awning
parts.everything = () => { const d = mk();
  d.rect(40, 66, 160, 112);
  const xs = [30, 60, 90, 120, 150, 180, 210];
  for (let i = 0; i < 6; i++) d.poly([[xs[i] + 6, 34], [xs[i + 1] + 4, 34], [xs[i + 1], 66], [xs[i], 66]], i % 2 ? T.paper : T.c2);
  d.path('M30 66 q15 16 30 0 q15 16 30 0 q15 16 30 0 q15 16 30 0 q15 16 30 0 q15 16 30 0');
  d.rect(56, 96, 62, 48, T.c4);
  d.line(87, 96, 87, 144, { strokeWidth: 1.6 }); d.line(56, 120, 118, 120, { strokeWidth: 1.6 });
  d.rect(136, 100, 44, 78, T.c1);
  d.rect(142, 112, 32, 14, T.paper, { strokeWidth: 1.6 });
  d.ell(172, 146, 6, 6, T.ink);
  d.rect(84, 12, 72, 20, T.paper);
  return d.svg('0 0 240 190', 'A small shopfront with an awning'); };

// Our part: small objects
parts.domain = () => { const d = mk();
  d.line(60, 58, 60, 112, { strokeWidth: 3 });
  d.poly([[22, 30], [96, 30], [110, 44], [96, 58], [22, 58]], T.c1);
  d.line(32, 44, 88, 44, { strokeWidth: 1.6 });
  d.ell(60, 112, 50, 10, T.paper);
  return d.svg('0 0 120 120', 'A signpost'); };
parts.email = () => { const d = mk();
  d.rect(14, 30, 92, 62);
  d.path('M14 30 L60 66 L106 30');
  d.rect(80, 38, 18, 18, T.c2, { strokeWidth: 1.6 });
  return d.svg('0 0 120 120', 'An envelope'); };
parts.backup = () => { const d = mk();
  d.poly([[16, 40], [48, 40], [56, 50], [104, 50], [104, 98], [16, 98]], T.c4);
  d.path('M48 74 a14 14 0 1 0 6 -12'); d.path('M50 56 l5 7 l-8 2');
  return d.svg('0 0 120 120', 'A folder with a restore arrow'); };
parts.lock = () => { const d = mk();
  d.path('M38 56 v-14 q22 -32 44 0 v14');
  d.rect(28, 56, 64, 48, T.c2);
  d.ell(60, 76, 10, 10, T.ink); d.line(60, 80, 60, 92, { strokeWidth: 3 });
  return d.svg('0 0 120 120', 'A padlock'); };
parts.card = () => { const d = mk();
  d.rect(12, 34, 96, 60, T.c3);
  d.line(12, 50, 108, 50, { strokeWidth: 5 });
  d.rect(22, 62, 18, 14, T.c4, { strokeWidth: 1.6 });
  d.line(56, 82, 98, 82, { strokeWidth: 1.6 });
  return d.svg('0 0 120 120', 'A payment card'); };


// ---------- Your part: the three steps ----------
parts.pick = () => { const d = mk();
  d.rect(16, 34, 48, 62); d.rect(112, 34, 48, 62);
  d.rect(58, 22, 60, 78, T.c1);
  d.path('M72 60 l10 11 l20 -24', undefined, { stroke: T.c2, strokeWidth: 4.5 });
  d.line(24, 50, 52, 50, { strokeWidth: 1.4 }); d.line(24, 60, 46, 60, { strokeWidth: 1.4 });
  d.line(120, 50, 150, 50, { strokeWidth: 1.4 }); d.line(120, 60, 142, 60, { strokeWidth: 1.4 });
  d.poly([[112, 96], [112, 134], [121, 125], [128, 140], [135, 137], [128, 122], [140, 121]]);
  return d.svg('0 0 176 150', 'Choosing one card out of three'); };
parts.words = () => { const d = mk();
  d.rect(14, 20, 74, 86);
  d.rect(22, 28, 58, 50, T.c4);
  d.path('M24 76 l16 -18 l12 11 l9 -8 l19 15'); d.ell(66, 40, 12, 12, T.paper);
  d.rect(84, 44, 66, 82);
  for (const [y, w] of [[60, 48], [72, 40], [84, 50], [96, 30]]) d.line(94, y, 94 + w, y, { strokeWidth: 1.5 });
  d.poly([[104, 134], [150, 88], [160, 98], [114, 144], [100, 148]], T.c1);
  d.line(150, 88, 160, 98);
  return d.svg('0 0 176 156', 'A photo and a page of writing with a pencil'); };
parts.open = () => { const d = mk();
  d.rect(46, 14, 86, 124);
  d.poly([[46, 14], [100, 24], [100, 130], [46, 138]], T.c2);
  d.ell(90, 80, 7, 7, T.ink);
  d.path('M60 46 L72 32 L84 44', undefined, { strokeWidth: 1.4 });
  d.rect(52, 46, 40, 22, T.paper, { strokeWidth: 1.8 });
  d.text(72, 63, 'OPEN', 17, T.ink, 6);
  d.line(10, 138, 168, 138);
  for (const x of [148, 160]) d.line(x, 128, x + 6, 118, { strokeWidth: 1.6, stroke: T.c5 });
  d.line(20, 120, 28, 112, { strokeWidth: 1.6, stroke: T.c5 });
  return d.svg('0 0 176 150', 'A door swinging open with an open sign'); };

// ---------- Who it's for ----------
parts.makers = () => { const d = mk();
  d.path('M44 36 h40 v10 q22 22 16 58 q-4 22 -36 22 q-32 0 -36 -22 q-6 -36 16 -58 z', T.c1);
  d.path('M30 80 q34 10 68 0', undefined, { strokeWidth: 1.6 }); d.path('M28 96 q36 10 72 0', undefined, { strokeWidth: 1.6 });
  d.ell(134, 112, 46, 46, T.c2);
  d.path('M114 100 q20 -8 40 6', undefined, { strokeWidth: 1.4 }); d.path('M112 116 q22 -8 44 4', undefined, { strokeWidth: 1.4 });
  d.path('M156 118 q12 16 4 30', undefined, { strokeWidth: 1.6 });
  return d.svg('0 0 176 150', 'A clay vase and a ball of yarn'); };
parts.health = () => { const d = mk();
  d.rect(36, 30, 56, 18, T.c2);
  d.rect(30, 48, 68, 92);
  d.rect(30, 74, 68, 38, T.c4);
  d.path('M64 102 c-14 -8 -14 -20 0 -24 c14 4 14 16 0 24 z', T.paper, { strokeWidth: 1.6 });
  d.path('M118 120 l24 -24 q10 -10 18 0 q8 8 -2 18 l-24 24 q-10 8 -18 0 q-8 -8 2 -18 z', T.c3);
  d.line(130, 108, 146, 124, { strokeWidth: 1.6 });
  d.path('M118 56 q20 -32 44 -20 q-4 32 -44 20 z', T.c5); d.line(118, 56, 148, 40, { strokeWidth: 1.4 });
  return d.svg('0 0 176 150', 'A supplement bottle, a capsule and a leaf'); };
parts.teach = () => { const d = mk();
  d.line(44, 110, 30, 144); d.line(132, 110, 146, 144); d.line(88, 110, 88, 144);
  d.rect(16, 16, 144, 96);
  d.poly([[74, 42], [74, 86], [110, 64]], T.c2);
  d.line(28, 100, 60, 100, { strokeWidth: 1.4 });
  d.ell(140, 30, 10, 10, T.c4);
  return d.svg('0 0 176 150', 'A whiteboard with a play button'); };
parts.clubs = () => { const d = mk();
  d.poly([[64, 92], [48, 146], [68, 136], [80, 150], [88, 96]], T.c2);
  d.poly([[112, 92], [128, 146], [108, 136], [96, 150], [88, 96]], T.c3);
  d.ell(88, 62, 92, 92, T.c1);
  d.ell(88, 62, 56, 56, T.paper);
  d.text(88, 72, '#1', 28);
  return d.svg('0 0 176 156', 'A ribbon rosette'); };
parts.places = () => { const d = mk();
  d.poly([[10, 34], [56, 22], [112, 34], [166, 22], [166, 122], [112, 134], [56, 122], [10, 134]]);
  d.line(56, 22, 56, 122, { strokeWidth: 1.4 }); d.line(112, 34, 112, 134, { strokeWidth: 1.4 });
  d.path('M30 104 q30 -40 58 -20 q30 20 54 -26', undefined, { strokeWidth: 1.4, stroke: T.c5 });
  const pin = (x, y, c) => { d.path(`M${x} ${y} c-12 -16 -14 -30 0 -30 c14 0 12 14 0 30 z`, c); d.ell(x, y - 20, 7, 7, T.paper); };
  pin(32, 110, T.c2); pin(88, 92, T.c1); pin(142, 64, T.c3);
  return d.svg('0 0 176 150', 'A map with three pins'); };
parts.agency = () => { const d = mk();
  const win = (x, y, c) => { d.rect(x, y, 84, 60, c); d.line(x, y + 12, x + 84, y + 12, { strokeWidth: 1.4 }); };
  win(14, 70, T.paper); win(42, 46, T.c4); win(70, 22, T.paper);
  d.rect(80, 44, 30, 18, T.c2, { strokeWidth: 1.4 }); d.line(116, 48, 144, 48, { strokeWidth: 1.4 }); d.line(116, 58, 138, 58, { strokeWidth: 1.4 });
  d.poly([[132, 140], [160, 112], [168, 120], [140, 148], [128, 150]], T.c1);
  return d.svg('0 0 176 156', 'A stack of client websites and a pencil'); };
parts.software = () => { const d = mk();
  d.rect(14, 18, 128, 96);
  d.line(14, 34, 142, 34, { strokeWidth: 1.6 });
  d.path('M58 58 l-16 14 l16 14', undefined, { strokeWidth: 3.2 });
  d.path('M98 58 l16 14 l-16 14', undefined, { strokeWidth: 3.2 });
  d.line(86, 52, 70, 92, { strokeWidth: 3.2, stroke: T.c2 });
  d.ell(140, 114, 46, 46, T.c3); d.ell(140, 114, 16, 16, T.paper);
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; d.line(140 + 23 * Math.cos(a), 114 + 23 * Math.sin(a), 140 + 31 * Math.cos(a), 114 + 31 * Math.sin(a), { strokeWidth: 4 }); }
  return d.svg('0 0 176 150', 'A code window and a gear'); };

// ---------- It stays yours ----------
parts.piggy = () => { const d = mk();
  d.poly([[56, 52], [62, 32], [76, 48]], T.c2);
  d.ell(84, 86, 112, 80, T.c2);
  d.ell(140, 88, 20, 26, T.paper); d.ell(136, 84, 3, 3, T.ink); d.ell(144, 92, 3, 3, T.ink);
  d.ell(112, 72, 5, 5, T.ink);
  d.rect(46, 118, 14, 18, T.c2); d.rect(98, 118, 14, 18, T.c2);
  d.line(68, 52, 96, 50, { strokeWidth: 3 });
  d.path('M28 84 q-14 -4 -10 -14 q6 -6 10 2', undefined, { strokeWidth: 1.8 });
  d.ell(82, 22, 30, 30, T.c4); d.text(82, 30, '$', 22);
  return d.svg('0 0 176 150', 'A piggy bank with a coin'); };
parts.nametag = () => { const d = mk();
  d.rect(14, 26, 148, 100);
  d.rect(14, 26, 148, 34, T.c2);
  d.text(88, 50, 'HELLO, I AM', 20, T.fs === 'solid' ? '#ffffff' : T.ink);
  d.text(88, 104, 'Your Shop', 34, T.ink, -3);
  d.line(40, 112, 136, 110, { strokeWidth: 1.4 });
  return d.svg('0 0 176 150', 'A name tag that says Your Shop'); };
parts.box = () => { const d = mk();
  d.rect(26, 60, 86, 72, T.c1);
  d.poly([[112, 60], [146, 44], [146, 114], [112, 132]], T.c4);
  d.poly([[26, 60], [60, 44], [146, 44], [112, 60]], T.c1);
  d.poly([[26, 60], [14, 38], [48, 24], [60, 44]], T.paper);
  d.path('M76 104 v-20 m-8 8 l8 -10 l8 10', undefined, { strokeWidth: 1.8 });
  d.path('M150 120 q20 -10 18 -36', undefined, { strokeWidth: 1.6, stroke: T.c5 }); d.path('M162 90 l6 -8 l6 8', undefined, { strokeWidth: 1.6, stroke: T.c5 });
  return d.svg('0 0 180 150', 'A moving box'); };
parts.thirty = () => { const d = mk();
  d.rect(36, 28, 104, 100);
  d.rect(36, 28, 104, 26, T.c2);
  for (const x of [60, 116]) d.ell(x, 28, 8, 20, T.paper);
  d.text(88, 108, '30', 52);
  d.path('M152 64 a62 62 0 1 1 -6 -26', undefined, { strokeWidth: 2.2, stroke: T.c5 });
  d.path('M138 32 l10 8 l-2 -14', undefined, { strokeWidth: 2.2, stroke: T.c5 });
  return d.svg('0 0 176 150', 'A calendar page showing 30 with a return arrow'); };

// ---------- Round 3 extras ----------
parts.tools = () => { const d = mk();
  d.poly([[40, 128], [104, 54], [116, 64], [52, 138]], T.c1);
  d.path('M104 54 q-6 -26 18 -34 l-6 18 l12 10 l18 -6 q-6 26 -32 22', T.paper);
  d.poly([[132, 132], [72, 70], [80, 62], [140, 124]], T.c3);
  d.rect(60, 48, 26, 26, T.c2);
  d.ell(48, 132, 10, 10, T.paper);
  return d.svg('0 0 176 156', 'A wrench and a screwdriver'); };
parts.paint = () => { const d = mk();
  d.path('M30 96 q-10 -54 50 -62 q62 -6 70 40 q4 26 -22 24 q-18 -2 -16 16 q2 22 -26 24 q-50 2 -56 -42 z', T.paper);
  d.ell(62, 62, 18, 18, T.c2); d.ell(92, 52, 18, 18, T.c1); d.ell(120, 64, 18, 18, T.c3); d.ell(56, 94, 18, 18, T.c4);
  d.poly([[110, 140], [150, 96], [158, 104], [118, 148]], T.c5);
  d.path('M150 96 l10 -12 q8 -2 6 8 l-8 12', T.paper);
  return d.svg('0 0 176 156', 'A paint palette and brush'); };
parts.question = () => { const d = mk();
  d.path('M30 30 h116 q12 0 12 12 v58 q0 12 -12 12 h-64 l-26 22 v-22 h-26 q-12 0 -12 -12 v-58 q0 -12 12 -12 z', T.c4);
  d.text(88, 92, '?', 58);
  return d.svg('0 0 176 150', 'A speech bubble with a question mark'); };
parts.sell = () => { const d = mk();
  d.rect(24, 60, 100, 80);
  const xs = [18, 38, 58, 78, 98, 118, 130];
  for (let i = 0; i < 5; i++) d.poly([[xs[i] + 4, 40], [xs[i + 1] + 2, 40], [xs[i + 1], 60], [xs[i], 60]], i % 2 ? T.paper : T.c3);
  d.rect(40, 86, 40, 54, T.c4);
  d.rect(36, 18, 76, 20, T.paper); d.text(74, 33, 'YOUR NAME', 14);
  d.poly([[112, 92], [160, 84], [168, 116], [120, 124], [104, 110]], T.c1);
  d.ell(116, 108, 7, 7); d.text(140, 110, '$$', 18);
  return d.svg('0 0 176 150', 'A shop with your name on it and a price tag'); };

// ---------- Inner pages ----------
// Move your site: a moving truck with a box in the back
parts.truck = () => { const d = mk();
  d.rect(14, 44, 96, 70, T.c1);
  d.text(62, 86, 'YOUR SITE', 15);
  d.poly([[110, 64], [146, 64], [166, 88], [166, 114], [110, 114]], T.paper);
  d.poly([[118, 72], [142, 72], [156, 88], [118, 88]], T.c4, { strokeWidth: 1.6 });
  d.ell(44, 118, 26, 26, T.ink); d.ell(140, 118, 26, 26, T.ink);
  d.ell(44, 118, 9, 9, T.paper); d.ell(140, 118, 9, 9, T.paper);
  for (const y of [56, 72, 88]) d.line(168 + (y - 56) / 6, y + 6, 176, y + 2, { strokeWidth: 1.6, stroke: T.c5 });
  return d.svg('0 0 180 140', 'A moving truck carrying your site'); };

// The import code: a ticket that starts with AP1.
parts.ticket = () => { const d = mk();
  d.path('M16 40 h144 v22 q-12 4 -12 16 q0 12 12 16 v22 h-144 v-22 q12 -4 12 -16 q0 -12 -12 -16 z', T.c4);
  d.line(52, 44, 52, 112, { strokeWidth: 1.4 });
  d.text(104, 86, 'AP1.', 32);
  return d.svg('0 0 176 150', 'A ticket with an import code'); };

// A plug: the free export plugin
parts.plug = () => { const d = mk();
  d.rect(48, 52, 64, 50, T.c2);
  d.line(64, 52, 64, 26, { strokeWidth: 4 }); d.line(96, 52, 96, 26, { strokeWidth: 4 });
  d.path('M80 102 v18 q0 18 24 18 h44', undefined, { strokeWidth: 3 });
  d.path('M150 130 l12 8 l-12 8', undefined, { strokeWidth: 2 });
  return d.svg('0 0 176 150', 'A plug'); };

// Compare: a balance scale tipping our way
parts.scales = () => { const d = mk();
  d.line(88, 24, 88, 132, { strokeWidth: 3 });
  d.poly([[58, 138], [118, 138], [104, 126], [72, 126]], T.paper);
  d.line(28, 44, 148, 30, { strokeWidth: 3 });
  d.ell(88, 36, 10, 10, T.c2);
  d.line(28, 44, 14, 82, { strokeWidth: 1.4 }); d.line(28, 44, 42, 82, { strokeWidth: 1.4 });
  d.line(148, 30, 134, 66, { strokeWidth: 1.4 }); d.line(148, 30, 162, 66, { strokeWidth: 1.4 });
  d.path('M8 82 q20 18 40 0 z', T.c1);
  d.path('M128 66 q20 18 40 0 z', T.paper);
  for (const [x, y] of [[20, 74], [30, 70], [26, 62]]) d.rect(x - 4, y - 4, 10, 10, T.c3, { strokeWidth: 1.2 });
  return d.svg('0 0 176 150', 'A balance scale'); };

// Resellers: three shopfronts in a row, each with its own sign
parts.shops = () => { const d = mk();
  const shop = (x, c, w = 48) => {
    d.rect(x, 64, w, 62);
    for (let i = 0; i < 3; i++) d.poly([[x - 4 + i * (w + 8) / 3, 46], [x - 4 + (i + 1) * (w + 8) / 3, 46], [x - 4 + (i + 1) * (w + 8) / 3, 64], [x - 4 + i * (w + 8) / 3, 64]], i % 2 ? T.paper : c, { strokeWidth: 1.6 });
    d.rect(x + 14, 96, 20, 30, c, { strokeWidth: 1.6 });
  };
  shop(10, T.c2); shop(64, T.c1); shop(118, T.c3);
  d.line(0, 128, 176, 128);
  d.rect(56, 10, 64, 22, T.paper); d.text(88, 27, 'ONE LOGIN', 14);
  return d.svg('0 0 176 140', 'Three shops under one login'); };

// Partner keys
parts.key = () => { const d = mk();
  d.ell(50, 74, 60, 60, T.c1); d.ell(42, 74, 18, 18, T.paper);
  d.line(80, 74, 160, 74, { strokeWidth: 4 });
  d.line(140, 74, 140, 92, { strokeWidth: 4 }); d.line(124, 74, 124, 88, { strokeWidth: 4 });
  return d.svg('0 0 176 150', 'A key'); };

// One monthly bill
parts.bill = () => { const d = mk();
  d.path('M40 16 h96 v118 l-12 -8 l-12 8 l-12 -8 l-12 8 l-12 -8 l-12 8 l-12 -8 l-12 8 z', T.paper);
  d.rect(52, 28, 72, 18, T.c2, { strokeWidth: 1.6 });
  for (const y of [62, 76, 90]) { d.line(54, y, 100, y, { strokeWidth: 1.4 }); d.line(110, y, 122, y, { strokeWidth: 1.4 }); }
  d.line(54, 106, 122, 106, { strokeWidth: 2.4 });
  d.ell(138, 116, 40, 40, T.c4); d.text(138, 124, '1st', 18);
  return d.svg('0 0 176 150', 'A monthly bill'); };

// Affiliates: a stack of coins and a megaphone
parts.coins = () => { const d = mk();
  for (let i = 0; i < 4; i++) d.ell(120, 128 - i * 14, 64, 20, i === 3 ? T.c4 : T.c1);
  d.text(120, 90, '30%', 16);
  d.poly([[18, 64], [70, 40], [70, 112], [18, 88]], T.c2);
  d.rect(8, 64, 12, 24, T.paper);
  d.path('M34 92 l6 26 h12 l-6 -22', T.paper, { strokeWidth: 1.6 });
  for (const [x1, y1, x2, y2] of [[80, 50, 94, 42], [82, 76, 98, 76], [80, 102, 94, 110]]) d.line(x1, y1, x2, y2, { strokeWidth: 1.6, stroke: T.c5 });
  return d.svg('0 0 176 150', 'A megaphone and a stack of coins'); };

// Run it yourself: a server box with lights
parts.server = () => { const d = mk();
  for (let i = 0; i < 3; i++) {
    d.rect(30, 20 + i * 38, 116, 30, i === 1 ? T.c4 : T.paper);
    d.ell(48, 35 + i * 38, 8, 8, i === 2 ? T.c2 : T.ink);
    for (const x of [100, 112, 124]) d.line(x, 28 + i * 38, x, 42 + i * 38, { strokeWidth: 1.6 });
  }
  d.line(88, 134, 88, 144); d.line(56, 144, 120, 144);
  return d.svg('0 0 176 150', 'A server'); };

// Contact: a mailbox with its flag up
parts.mailbox = () => { const d = mk();
  d.path('M26 104 v-46 q0 -28 30 -28 h64 q30 0 30 28 v46 z', T.c2);
  d.path('M26 104 v-46 q0 -28 30 -28 q30 0 30 28 v46', undefined, { strokeWidth: 1.6 });
  d.rect(36, 62, 40, 30, T.paper, { strokeWidth: 1.6 });
  d.line(42, 72, 70, 72, { strokeWidth: 1.2 }); d.line(42, 80, 64, 80, { strokeWidth: 1.2 });
  d.line(132, 60, 132, 16, { strokeWidth: 3 }); d.poly([[132, 16], [160, 22], [132, 32]], T.c1);
  d.line(88, 104, 88, 142, { strokeWidth: 5 }); d.line(62, 142, 114, 142);
  return d.svg('0 0 176 150', 'A mailbox with its flag up'); };

// Help: a life ring
parts.lifebuoy = () => { const d = mk();
  d.ell(88, 76, 116, 116, T.paper); d.ell(88, 76, 52, 52, T.paper);
  for (const a of [0.3, 1.87, 3.44, 5.01]) {
    const p = (r, t) => [88 + r * Math.cos(t), 76 + r * Math.sin(t)];
    d.poly([p(27, a - 0.38), p(57, a - 0.3), p(57, a + 0.3), p(27, a + 0.38)], T.c2, { strokeWidth: 1.6 });
  }
  d.path('M150 120 q14 10 6 24', undefined, { strokeWidth: 1.6 });
  return d.svg('0 0 176 150', 'A life ring'); };

// About: a heart drawn on a sticky note
parts.note = () => { const d = mk();
  d.poly([[28, 22], [148, 18], [152, 122], [124, 136], [30, 134]], T.c4);
  d.poly([[124, 136], [126, 112], [152, 122]], T.paper, { strokeWidth: 1.6 });
  d.path('M90 106 c-30 -20 -36 -44 -16 -50 c10 -2 14 4 16 10 c2 -6 6 -12 16 -10 c20 6 14 30 -16 50 z', T.c2);
  return d.svg('0 0 176 150', 'A sticky note with a heart'); };

// Legal pages: a scroll with a seal
parts.scroll = () => { const d = mk();
  d.rect(36, 24, 100, 104);
  d.ell(36, 76, 16, 104, T.c1); d.ell(136, 76, 16, 104, T.c1);
  for (const y of [44, 56, 68, 80, 92]) d.line(52, y, 120, y, { strokeWidth: 1.3 });
  d.ell(110, 110, 26, 26, T.c2);
  return d.svg('0 0 176 150', 'A scroll with a seal'); };

// Sizes: three boxes, small, medium and large
parts.sizes = () => { const d = mk();
  d.rect(10, 96, 34, 34, T.paper); d.rect(54, 72, 50, 58, T.c4); d.rect(114, 40, 56, 90, T.c1);
  d.text(27, 120, 'S', 20); d.text(79, 108, 'M', 24); d.text(142, 92, 'L', 30);
  d.line(4, 132, 174, 132);
  return d.svg('0 0 176 140', 'Small, medium and large boxes'); };


const result = {};
for (const [k, f] of Object.entries(parts)) result[k] = f();

// Hero scene: the shopfront in the middle with the other things around it
{
  const pick = (k) => result[k].replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  result.hero = `<svg class="obj hero-scene" viewBox="0 0 640 400" aria-hidden="true" fill="none">
<g transform="translate(196 120) scale(1.2)"><g class="bob b0">${pick('everything')}</g></g>
<g transform="translate(6 70) scale(.78)"><g class="bob b1">${pick('website')}</g></g>
<g transform="translate(470 40) scale(.7)"><g class="bob b2">${pick('bookings')}</g></g>
<g transform="translate(40 250) scale(.66)"><g class="bob b3">${pick('store')}</g></g>
<g transform="translate(470 236) scale(.68)"><g class="bob b4">${pick('courses')}</g></g>
<g transform="translate(270 0) scale(.8)"><g class="bob b5">${pick('email')}</g></g>
<g transform="translate(575 172) scale(.45)"><g class="bob b6">${pick('lock')}</g></g>
<g transform="translate(176 20) scale(.55)"><g class="bob b7">${pick('domain')}</g></g>
</svg>`;
}
// Each drawing is its own file in public/drawings, fetched when it's needed, so pages stay small.
// The TypeScript side only gets the names, sizes (to hold the space while a drawing loads) and a
// short hash of each file, so a changed drawing gets a fresh URL.
const dir = path.join(__dirname, '..', 'public', 'drawings');
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });
const meta = {};
for (const [k, v] of Object.entries(result)) {
  const svg = v.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  fs.writeFileSync(path.join(dir, `${k}.svg`), svg);
  const [, , w, h] = /viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/.exec(svg).slice(1).map(Number);
  meta[k] = [w, h, crypto.createHash('sha1').update(svg).digest('hex').slice(0, 8)];
}
const out = path.join(__dirname, '..', 'src', 'components', 'drawings.generated.ts');
const body = Object.entries(meta).map(([k, v]) => `  ${k}: [${v[0]}, ${v[1]}, "${v[2]}"],`).join('\n');
fs.writeFileSync(out, `// Generated by scripts/drawings.mjs. Don't edit by hand: change the script and run \`npm run drawings\`.\n` +
  `// name: [width, height, version]\nexport const DRAWINGS = {\n${body}\n} as const;\n\nexport type DrawingName = keyof typeof DRAWINGS;\n`);
console.log(`wrote ${Object.keys(meta).length} drawings to public/drawings`);
