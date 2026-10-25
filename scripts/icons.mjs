// Small hand-drawn icons for the "Made for" chips, drawn with rough.js like scripts/drawings.mjs but on a 24 x 24 grid
// with a lighter wobble so they stay readable at chip size. Run `npm run icons` after changing one; it rewrites
// src/components/icons.generated.ts.
import fs from 'node:fs';
import path from 'node:path';
import rough from 'roughjs';

const T = { ink: '#141414', paper: '#ffffff', honey: '#FFC75A', rose: '#EE2F5E' };
let seed = 3;

function mk() {
  const g = rough.generator();
  const out = [];
  const o = (fill, e = {}) => ({
    stroke: T.ink, strokeWidth: 1.5, roughness: 0.55, bowing: 0.6, seed: seed++,
    fill, fillStyle: 'solid', ...e,
  });
  const add = (d) => {
    for (const p of g.toPaths(d)) out.push(`<path d="${p.d.replace(/(\d+\.\d)\d+/g, '$1')}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill || 'none'}"/>`);
  };
  const api = {
    rect: (x, y, w, h, f, e) => (add(g.rectangle(x, y, w, h, o(f, e))), api),
    ell: (x, y, w, h, f, e) => (add(g.ellipse(x, y, w, h, o(f, e))), api),
    line: (x1, y1, x2, y2, e) => (add(g.line(x1, y1, x2, y2, o(undefined, e))), api),
    poly: (pts, f, e) => (add(g.polygon(pts, o(f, e))), api),
    path: (d, f, e) => (add(g.path(d, o(f, e))), api),
    done: () => out.join(''),
  };
  return api;
}

const icons = {
  bag: () => mk().path('M8.5 9 C8.5 4, 15.5 4, 15.5 9').poly([[4.5, 9], [19.5, 9], [20.5, 20.5], [3.5, 20.5]], T.honey).done(),
  storefront: () => mk().rect(4, 10, 16, 10.5, T.paper).poly([[3, 6], [21, 6], [21, 10], [3, 10]], T.rose).rect(10, 14, 4, 6.5, T.honey).done(),
  calendar: () => mk().rect(3.5, 5, 17, 15.5, T.paper).rect(3.5, 5, 17, 4.5, T.rose).line(8, 3, 8, 6.5).line(16, 3, 16, 6.5).rect(13, 13, 4, 4, T.honey).done(),
  cap: () => mk().poly([[12, 4], [22, 8.5], [12, 13], [2, 8.5]], T.ink).path('M6 10.8 v4.5 q6 4 12 0 v-4.5', T.paper).line(21, 9, 21, 15).done(),
  columns: () => mk().poly([[12, 3], [21, 8], [3, 8]], T.honey).line(6, 10, 6, 18).line(10, 10, 10, 18).line(14, 10, 14, 18).line(18, 10, 18, 18).line(3, 20.5, 21, 20.5, { strokeWidth: 1.8 }).done(),
  church: () => mk().poly([[12, 5], [18, 11], [18, 20.5], [6, 20.5], [6, 11]], T.paper).rect(10, 15, 4, 5.5, T.honey).line(12, 1.5, 12, 5).line(10.5, 2.8, 13.5, 2.8).done(),
  shops: () => mk().rect(2.5, 11, 8.5, 9.5, T.paper).poly([[2, 8], [11.5, 8], [11.5, 11], [2, 11]], T.rose).rect(13, 11, 8.5, 9.5, T.paper).poly([[12.5, 8], [22, 8], [22, 11], [12.5, 11]], T.honey).done(),
  people: () => mk().ell(7, 7.5, 5.5, 5.5, T.honey).path('M2 20 q5 -10 10 0', T.honey).ell(17, 7.5, 5.5, 5.5, T.paper).path('M12 20 q5 -10 10 0', T.paper).done(),
  brush: () => mk().poly([[15, 3], [21, 9], [11, 17], [7, 13]], T.honey).path('M7 13 q-4 1 -4 7 q6 0 7 -4', T.rose).done(),
  briefcase: () => mk().rect(3, 8, 18, 12, T.honey).path('M9 8 v-3 h6 v3').line(3, 13, 21, 13).done(),
  megaphone: () => mk().poly([[4, 10], [14, 5], [14, 19], [4, 14]], T.honey).rect(14, 9, 4, 6, T.paper).path('M7 14.5 l1.5 5 h2.5 l-1 -4.5').done(),
  code: () => mk().rect(2.5, 4.5, 19, 15, T.paper).path('M9 9 l-3 3 l3 3', undefined, { strokeWidth: 1.8 }).path('M15 9 l3 3 l-3 3', undefined, { strokeWidth: 1.8 }).line(13, 8, 11, 16, { stroke: T.rose, strokeWidth: 1.8 }).done(),
  server: () => mk().rect(4, 3.5, 16, 7.5, T.paper).rect(4, 13, 16, 7.5, T.honey).ell(7.5, 7.2, 1.8, 1.8, T.ink).ell(7.5, 16.8, 1.8, 1.8, T.ink).line(11, 7.2, 17, 7.2).line(11, 16.8, 17, 16.8).done(),
  plug: () => mk().rect(7, 8, 10, 7, T.honey).line(9.5, 3.5, 9.5, 8).line(14.5, 3.5, 14.5, 8).path('M12 15 v3 q0 3 -4 3').done(),
  tag: () => mk().poly([[3, 4], [12, 4], [21, 13], [13, 21], [3, 12]], T.honey).ell(8, 8.5, 3, 3, T.paper).done(),
  laptop: () => mk().rect(5, 5, 14, 10, T.paper).rect(7, 7, 6, 4, T.honey, { strokeWidth: 1.1 }).poly([[3, 15], [21, 15], [22.5, 19], [1.5, 19]], T.paper).done(),
  chat: () => mk().path('M3 5 h13 q2 0 2 2 v6 q0 2 -2 2 h-7 l-4 4 v-4 h-2 q-2 0 -2 -2 z', T.rose).path('M12 17 h7 q2 0 2 -2 v-4', undefined).done(),
  video: () => mk().rect(2.5, 6.5, 13, 11, T.honey).poly([[15.5, 10], [21.5, 6.5], [21.5, 17.5], [15.5, 14]], T.paper).done(),
  truck: () => mk().rect(2, 7, 12, 9.5, T.honey).poly([[14, 10], [19, 10], [22, 13.5], [22, 16.5], [14, 16.5]], T.paper).ell(6.5, 18, 3.5, 3.5, T.paper).ell(17.5, 18, 3.5, 3.5, T.paper).done(),
  pen: () => mk().poly([[16, 3], [21, 8], [9, 20], [3.5, 20.5], [4, 15]], T.honey).line(14, 5, 19, 10).done(),
  frame: () => mk().rect(3, 4, 18, 16, T.paper).path('M5 18 l5 -6 l4 4 l2.5 -2.5 l3.5 4.5').ell(15.5, 8.5, 3, 3, T.honey).done(),
  box: () => mk().poly([[3, 8], [12, 4], [21, 8], [21, 17], [12, 21], [3, 17]], T.honey).path('M3 8 l9 4 l9 -4 M12 12 v9').done(),
  download: () => mk().line(12, 3, 12, 15, { strokeWidth: 1.8 }).path('M7 10.5 l5 5 l5 -5', undefined, { strokeWidth: 1.8 }).path('M3.5 15 v5 h17 v-5', undefined).rect(9, 17, 6, 1.5, T.honey, { strokeWidth: 0.8 }).done(),
  leaf: () => mk().path('M4 20 C4 9, 10 4, 20 4 C20 14, 15 20, 4 20 z', T.honey).path('M4 20 L14 10').done(),
  ticket: () => mk().path('M3 7 h18 v3 a2 2 0 0 0 0 4 v3 h-18 v-3 a2 2 0 0 0 0 -4 z', T.rose).line(15, 7.5, 15, 16.5, { strokeDasharray: '2 2' }).done(),
  apps: () => mk().rect(3, 3, 7.5, 7.5, T.honey).rect(13.5, 3, 7.5, 7.5, T.paper).rect(3, 13.5, 7.5, 7.5, T.paper).rect(13.5, 13.5, 7.5, 7.5, T.rose).done(),
  // For the "Everything you can do with it" lists on the /sites pages.
  page: () => mk().rect(5, 3, 14, 18, T.paper).line(8, 8, 16, 8).line(8, 12, 16, 12).rect(8, 15, 5, 2.5, T.honey, { strokeWidth: 1 }).done(),
  pages: () => mk().rect(8, 2.5, 13, 16, T.honey).rect(3.5, 5.5, 13, 16, T.paper).line(6.5, 10, 13.5, 10).line(6.5, 14, 13.5, 14).done(),
  phone: () => mk().rect(7, 2.5, 10, 19, T.paper).rect(9, 5, 6, 11, T.honey, { strokeWidth: 1.1 }).line(11, 18.8, 13, 18.8).done(),
  blocks: () => mk().rect(3, 3.5, 11, 7, T.paper).rect(9, 13.5, 12, 7, T.rose).path('M17 4 v6 M14.5 7.5 l2.5 2.5 l2.5 -2.5').done(),
  form: () => mk().rect(5, 4, 14, 17, T.paper).rect(9, 2.5, 6, 3.5, T.honey).rect(8, 9.5, 3, 3, T.rose, { strokeWidth: 1 }).line(13, 11, 16.5, 11).line(8, 16, 16.5, 16).done(),
  branch: () => mk().line(6.5, 5, 6.5, 19).path('M6.5 13 q0 -6 9 -7').ell(6.5, 4.5, 4, 4, T.honey).ell(6.5, 19.5, 4, 4, T.paper).ell(17, 6, 4, 4, T.rose).done(),
  inbox: () => mk().poly([[3, 13], [7, 5], [17, 5], [21, 13], [21, 20], [3, 20]], T.paper).poly([[3, 13], [8, 13], [9.5, 15.5], [14.5, 15.5], [16, 13], [21, 13], [21, 20], [3, 20]], T.honey).done(),
  mail: () => mk().rect(3, 6, 18, 13, T.honey).path('M3.5 6.5 l8.5 7 l8.5 -7').done(),
  search: () => mk().line(14.5, 14.5, 20.5, 20.5, { strokeWidth: 2.4 }).ell(10, 10, 11, 11, T.paper).ell(10, 10, 5, 5, T.honey, { strokeWidth: 0.8 }).done(),
  redirect: () => mk().path('M5 19 v-7 q0 -5 5 -5 h9').path('M15.5 3.5 l3.5 3.5 l-3.5 3.5', undefined, { strokeWidth: 1.8 }).ell(5, 19.5, 4, 4, T.rose).done(),
  globe: () => mk().ell(12, 12, 18, 18, T.honey).ell(12, 12, 8, 18).line(3, 12, 21, 12).done(),
  chart: () => mk().rect(4.5, 12, 4, 8.5, T.honey).rect(10, 7, 4, 13.5, T.rose).rect(15.5, 3.5, 4, 17, T.paper).line(2.5, 20.5, 21.5, 20.5, { strokeWidth: 1.8 }).done(),
  contact: () => mk().rect(2.5, 5, 19, 14, T.paper).ell(8, 10.5, 4.5, 4.5, T.honey).path('M4.5 16.5 q3.5 -4 7 0').line(14, 10, 19, 10).line(14, 13.5, 18, 13.5).done(),
  person: () => mk().ell(12, 8, 8, 8, T.honey).path('M4 21 q8 -12 16 0 z', T.paper).done(),
  send: () => mk().poly([[2.5, 11], [21.5, 3], [15, 21]], T.paper).poly([[11, 13.5], [21.5, 3], [15, 21]], T.honey).done(),
  eye: () => mk().path('M2 12 q10 -10 20 0 q-10 10 -20 0 z', T.paper).ell(12, 12, 6.5, 6.5, T.rose).done(),
  bolt: () => mk().poly([[13.5, 2.5], [5, 13.5], [11, 13.5], [10, 21.5], [19, 9.5], [13, 9.5]], T.honey).done(),
  clock: () => mk().ell(12, 12, 18, 18, T.paper).path('M12 7 v5 l3.5 2.5', undefined, { strokeWidth: 1.8 }).ell(12, 12, 1.6, 1.6, T.rose).done(),
  card: () => mk().rect(2.5, 5.5, 19, 13, T.honey).rect(2.5, 9, 19, 2.5, T.ink).line(5.5, 15, 10, 15).done(),
  coin: () => mk().ell(12, 12, 18, 18, T.honey).ell(12, 12, 11, 11).path('M13.5 9.5 q-1.5 -1.2 -3 0 q-1 1.3 1.5 2.5 q2.5 1.2 1.5 2.5 q-1.5 1.2 -3 0', undefined, { strokeWidth: 1.2 }).done(),
  bell: () => mk().path('M6 17 v-6 q0 -6 6 -6 q6 0 6 6 v6 z', T.honey).line(4, 17, 20, 17).ell(12, 19.5, 3, 3, T.ink).done(),
  repeat: () => mk().path('M4.5 12 q0 -6 6.5 -6 h6.5').path('M15 3 l3 3 l-3 3', undefined, { strokeWidth: 1.8 }).path('M19.5 12 q0 6 -6.5 6 h-6.5', undefined, { stroke: T.rose }).path('M9 15 l-3 3 l3 3', undefined, { stroke: T.rose, strokeWidth: 1.8 }).done(),
  pin: () => mk().path('M12 21.5 C6 15, 5 12.5, 5 9.5 C5 5.5, 8 2.5, 12 2.5 C16 2.5, 19 5.5, 19 9.5 C19 12.5, 18 15, 12 21.5 z', T.rose).ell(12, 9.5, 5, 5, T.paper).done(),
  cup: () => mk().path('M16 11 h1.5 q2.5 0 2.5 2.5 q0 2.5 -3.5 2.5').path('M4.5 9 h11.5 v6 q0 5 -5.75 5 q-5.75 0 -5.75 -5 z', T.honey).path('M8.5 3 q1.2 1.5 0 3 M12 3 q1.2 1.5 0 3').done(),
  shield: () => mk().path('M12 2.5 l8 3 v6 q0 7 -8 10 q-8 -3 -8 -10 v-6 z', T.honey).path('M8.5 12 l2.5 2.5 l4.5 -5', undefined, { strokeWidth: 1.8 }).done(),
  lock: () => mk().path('M8 10.5 v-3 q0 -4.5 4 -4.5 q4 0 4 4.5 v3').rect(4.5, 10.5, 15, 10, T.honey).ell(12, 15.5, 2.5, 2.5, T.ink).done(),
  unlock: () => mk().path('M8 10.5 v-3 q0 -4.5 4 -4.5 q3.5 0 4 3').rect(4.5, 10.5, 15, 10, T.rose).ell(12, 15.5, 2.5, 2.5, T.paper).done(),
  cloud: () => mk().path('M7 18.5 q-4.5 0 -4.5 -4 q0 -4 4.5 -4 q1 -5 6 -5 q5 0 5.5 5 q4 0.5 4 4 q0 4 -4.5 4 z', T.paper).path('M12 9.5 v6.5 M9.5 13.5 l2.5 2.5 l2.5 -2.5', undefined, { stroke: T.rose, strokeWidth: 1.8 }).done(),
  key: () => mk().path('M11.5 12 h10 M18 12 v3.5 M21 12 v2.5', undefined, { strokeWidth: 1.8 }).ell(7.5, 12, 9, 9, T.honey).ell(7.5, 12, 2.5, 2.5, T.paper).done(),
  funnel: () => mk().poly([[3, 4], [21, 4], [14, 12.5], [14, 20.5], [10, 18.5], [10, 12.5]], T.honey).done(),
  star: () => mk().poly([[12.0, 3.0], [14.4, 9.3], [21.0, 9.6], [15.8, 13.7], [17.6, 20.2], [12.0, 16.5], [6.4, 20.2], [8.2, 13.7], [3.0, 9.6], [9.6, 9.3]], T.honey).done(),
  percent: () => mk().line(18.5, 4.5, 5.5, 19.5, { strokeWidth: 1.8 }).ell(7, 7, 5.5, 5.5, T.honey).ell(17, 17, 5.5, 5.5, T.rose).done(),
  receipt: () => mk().path('M5 2.5 h14 v19 l-2.3 -1.5 l-2.3 1.5 l-2.4 -1.5 l-2.4 1.5 l-2.3 -1.5 l-2.3 1.5 z', T.paper).line(8, 7, 16, 7).line(8, 11, 16, 11).rect(8, 14, 5, 2.5, T.honey, { strokeWidth: 1 }).done(),
  refund: () => mk().ell(14, 14, 13, 13, T.honey).path('M8.5 3.5 l-4.5 4 l4.5 4', undefined, { strokeWidth: 1.8 }).path('M4.5 7.5 h8 q3 0 5 2', undefined, { strokeWidth: 1.8 }).done(),
  heart: () => mk().path('M12 20 C3 14, 2 9, 5 6 C8 3, 11 5, 12 7.5 C13 5, 16 3, 19 6 C22 9, 21 14, 12 20 z', T.rose).done(),
  poll: () => mk().rect(3, 3.5, 15, 4, T.honey).rect(3, 10, 9, 4, T.rose).rect(3, 16.5, 18, 4, T.paper).done(),
  book: () => mk().path('M12 6 q-4 -2.5 -9 -2 v15 q5 -0.5 9 2 z', T.paper).path('M12 6 q4 -2.5 9 -2 v15 q-5 -0.5 -9 2 z', T.honey).done(),
  progress: () => mk().rect(2.5, 8.5, 19, 7, T.paper).rect(2.5, 8.5, 12, 7, T.honey).path('M17 12 l1.5 1.5 l2 -3', undefined, { strokeWidth: 1.2 }).done(),
  moon: () => mk().ell(12, 12, 18, 18, T.paper).path('M12 3 C17 3, 21 7, 21 12 C21 17, 17 21, 12 21 z', T.ink).done(),
  link: () => mk().path('M10 8.5 l-4 4 q-2.5 2.5 0 5 q2.5 2.5 5 0 l4 -4', undefined, { strokeWidth: 2 }).path('M14 15.5 l4 -4 q2.5 -2.5 0 -5 q-2.5 -2.5 -5 0 l-4 4', undefined, { stroke: T.rose, strokeWidth: 2 }).done(),
};

let ts = '// Generated by scripts/icons.mjs. Don\'t edit by hand: change the script and run `npm run icons`.\nexport const ICONS = {\n';
for (const [name, draw] of Object.entries(icons)) ts += `  ${name}: ${JSON.stringify(draw())},\n`;
ts += '} as const;\n\nexport type IconName = keyof typeof ICONS;\n';
fs.writeFileSync(path.join(import.meta.dirname, '..', 'src', 'components', 'icons.generated.ts'), ts);
console.log(`wrote ${Object.keys(icons).length} icons`);
