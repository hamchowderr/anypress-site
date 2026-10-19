// A tiny Lottie writer for our booklet-style line drawings: ink strokes that draw themselves in,
// paper fills, and parts that move, scale or fade. Every animation shares one 480x380 frame so it
// can sit in the same white card as the static drawings.

export const W = 480;
export const H = 380;
export const FPS = 30;

export const INK = [0.09, 0.075, 0.11, 1];
export const PAPER = [1, 1, 1, 1];
export const STROKE = 2.5;

// cubic-bezier(0.16, 1, 0.3, 1): fast start, soft landing.
const EASE_OUT = { o: { x: [0.16], y: [1] }, i: { x: [0.3], y: [1] } };
// A small overshoot for things that pop into place.
const EASE_POP = { o: { x: [0.34], y: [1.56] }, i: { x: [0.64], y: [1] } };
export const EASES = { out: EASE_OUT, pop: EASE_POP };

const list = (v) => (Array.isArray(v) ? v : [v]);

export const fixed = (v) => ({ a: 0, k: v });

/** Keyframes from [frame, value] pairs. `hold` jumps instead of easing (for blinking). */
export function keys(frames, { ease = EASE_OUT, hold = false } = {}) {
  return {
    a: 1,
    k: frames.map(([t, v], i) => {
      const k = { t, s: list(v) };
      if (i < frames.length - 1) {
        if (hold) k.h = 1;
        else Object.assign(k, ease);
      }
      return k;
    }),
  };
}

const prop = (v) => (v && typeof v === "object" && "a" in v ? v : fixed(v));

function transform({ p = [0, 0], a = [0, 0], s = [100, 100], r = 0, o = 100 } = {}) {
  return { ty: "tr", p: prop(p), a: prop(a), s: prop(s), r: prop(r), o: prop(o), sk: fixed(0), sa: fixed(0) };
}

// ---- Geometry -------------------------------------------------------------------------------

/** A path from points; each point is [x, y] or [x, y, inX, inY, outX, outY] (tangents relative). */
export function path(points, closed = false) {
  return {
    ty: "sh",
    ks: fixed({
      c: closed,
      v: points.map((p) => [p[0], p[1]]),
      i: points.map((p) => [p[2] ?? 0, p[3] ?? 0]),
      o: points.map((p) => [p[4] ?? 0, p[5] ?? 0]),
    }),
  };
}

export const line = (...pts) => path(pts);
export const poly = (...pts) => path(pts, true);

/** A rectangle by its top-left corner, like SVG. */
export function rect(x, y, w, h, r = 0) {
  return { ty: "rc", p: fixed([x + w / 2, y + h / 2]), s: fixed([w, h]), r: fixed(r), d: 1 };
}

export function circle(cx, cy, r) {
  return { ty: "el", p: fixed([cx, cy]), s: fixed([r * 2, r * 2]), d: 1 };
}

/** An arc as a bezier path, angles in degrees (0 = right, clockwise on screen). */
export function arc(cx, cy, r, from, to) {
  const segs = Math.max(1, Math.ceil(Math.abs(to - from) / 90));
  const step = ((to - from) / segs) * (Math.PI / 180);
  const k = (4 / 3) * Math.tan(step / 4) * r;
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const a = from * (Math.PI / 180) + step * i;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    const tx = -Math.sin(a) * k;
    const ty = Math.cos(a) * k;
    pts.push([x, y, i === 0 ? 0 : -tx, i === 0 ? 0 : -ty, i === segs ? 0 : tx, i === segs ? 0 : ty]);
  }
  return path(pts);
}

// ---- Parts ----------------------------------------------------------------------------------

/**
 * One drawn part: shapes stroked in ink (optionally filled), drawing itself in between
 * `draw[0]` and `draw[1]`, with optional movement. `fill` is "paper" or "ink".
 */
export function part(shapes, opts = {}) {
  const { draw, fill, fillIn, stroke = true, width = STROKE, color = INK, dash, p, a, s, r, o, name = "part" } = opts;
  const items = [];
  const shapeList = list(shapes);
  // Outline (trimmed so it draws in).
  if (stroke) {
    const it = [...shapeList.map((x) => structuredClone(x))];
    if (draw) it.push({ ty: "tm", s: fixed(0), e: keys([[draw[0], 0], [draw[1], 100]]), o: fixed(0), m: 1 });
    const st = { ty: "st", c: fixed(color), o: fixed(100), w: fixed(width), lc: 2, lj: 2, ml: 4 };
    if (dash) st.d = [{ n: "d", nm: "dash", v: fixed(dash[0]) }, { n: "g", nm: "gap", v: fixed(dash[1]) }, { n: "o", nm: "offset", v: fixed(0) }];
    it.push(st);
    it.push(transform());
    items.push({ ty: "gr", nm: `${name} line`, it });
  }
  // Fill underneath the outline, fading in as the outline finishes.
  if (fill) {
    const start = fillIn ?? (draw ? draw[1] - 4 : 0);
    const it = [...shapeList.map((x) => structuredClone(x))];
    it.push({ ty: "fl", c: fixed(fill === "ink" ? INK : fill === "paper" ? PAPER : fill), o: draw || fillIn ? keys([[start, 0], [start + 6, 100]]) : fixed(100), r: 1 });
    it.push(transform());
    items.push({ ty: "gr", nm: `${name} fill`, it });
  }
  return { ty: "gr", nm: name, it: [...items, transform({ p, a, s, r, o })] };
}

/** Several parts moving together. Children are listed back to front. */
export function group(children, { p, a, s, r, o, name = "group" } = {}) {
  return { ty: "gr", nm: name, it: [...[...children].reverse(), transform({ p, a, s, r, o })] };
}

/** Fade + slide in from an offset, for parts that arrive rather than draw. */
export function arrive(t0, t1, [dx, dy] = [0, 20]) {
  return {
    p: keys([[t0, [dx, dy]], [t1, [0, 0]]]),
    o: keys([[t0, 0], [t0 + Math.max(2, Math.round((t1 - t0) / 3)), 100]]),
  };
}

/** Scale up from nothing around a pivot point, with a little overshoot. */
export function pop(t0, t1, [cx, cy]) {
  return {
    a: [cx, cy],
    p: [cx, cy],
    s: keys([[t0, [0, 0]], [t1, [100, 100]]], { ease: EASE_POP }),
    o: keys([[t0, 0], [t0 + 1, 100]]),
  };
}

// ---- Single-stroke digits for prices --------------------------------------------------------

// Glyphs in a 10 x 16 box, drawn with strokes so they need no font.
const GLYPHS = {
  "0": [() => ({ ty: "el", p: fixed([5, 8]), s: fixed([8.5, 15]), d: 1 })],
  "$": [
    () => path([[8.6, 3.2, 0, 0, -1.5, -2.2], [1.6, 4.4, 0, -3.4, 0, 3.6], [8.4, 11.6, 0, -4.2, 0, 3.6], [1.2, 12.6, 2, 2.6, 0, 0]]),
    () => line([5, -0.5], [5, 16.5]),
  ],
  ".": [() => circle(2, 15, 0.4)],
};

/** Text made of single-stroke glyphs, `size` = glyph height. Supports "$", "0" and ".". */
export function digits(text, x, y, size, opts) {
  const k = size / 16;
  let cx = x;
  const parts = [];
  for (const ch of text) {
    const g = GLYPHS[ch];
    if (!g) throw new Error(`No glyph for ${ch}`);
    const adv = ch === "." ? 5 : 11;
    parts.push(group([part(g.map((f) => f()), { width: ch === "." ? 3.2 / k : STROKE / k, ...opts })], { p: [cx, y], s: [k * 100, k * 100], name: `glyph ${ch}` }));
    cx += adv * k;
  }
  return parts;
}

// ---- File -----------------------------------------------------------------------------------

/** A finished animation: one shape layer holding every part (listed back to front). */
export function animation(name, frames, parts) {
  return {
    v: "5.12.0",
    fr: FPS,
    ip: 0,
    op: frames,
    w: W,
    h: H,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: name,
        sr: 1,
        ks: { o: fixed(100), r: fixed(0), p: fixed([0, 0, 0]), a: fixed([0, 0, 0]), s: fixed([100, 100, 100]) },
        ao: 0,
        shapes: [...parts].reverse(),
        ip: 0,
        op: frames,
        st: 0,
        bm: 0,
      },
    ],
  };
}
