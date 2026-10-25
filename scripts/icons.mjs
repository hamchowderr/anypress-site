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
};

let ts = '// Generated by scripts/icons.mjs. Don\'t edit by hand: change the script and run `npm run icons`.\nexport const ICONS = {\n';
for (const [name, draw] of Object.entries(icons)) ts += `  ${name}: ${JSON.stringify(draw())},\n`;
ts += '} as const;\n\nexport type IconName = keyof typeof ICONS;\n';
fs.writeFileSync(path.join(import.meta.dirname, '..', 'src', 'components', 'icons.generated.ts'), ts);
console.log(`wrote ${Object.keys(icons).length} icons`);
