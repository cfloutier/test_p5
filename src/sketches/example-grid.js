/**
 * example-grid.js — parametric drawing: grid of circles and segments.
 *
 * Returns a drawing object compatible with main.js / svg-export.js:
 *   { name: string, polylines: Array<Array<{x,y}>> }
 *
 * All coordinates are in millimetres.
 */

import { drawableArea } from '../lib/plotter.js';

/**
 * Minimal deterministic pseudo-random number generator (mulberry32).
 *
 * @param {number} seed
 * @returns {() => number}  Returns a function yielding floats in [0, 1).
 */
function makePrng(seed) {
  let s = seed >>> 0;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Approximate a circle as a closed polyline.
 *
 * @param {number} cx  centre x (mm)
 * @param {number} cy  centre y (mm)
 * @param {number} r   radius (mm)
 * @param {number} segments  number of line segments
 * @param {function} rng     PRNG for jitter
 * @param {number} jitter    max jitter amplitude (mm)
 * @returns {Array<{x:number,y:number}>}
 */
function circlePolyline(cx, cy, r, segments, rng, jitter) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const jr = jitter > 0 ? (rng() - 0.5) * jitter : 0;
    const jx = jitter > 0 ? (rng() - 0.5) * jitter : 0;
    const jy = jitter > 0 ? (rng() - 0.5) * jitter : 0;
    pts.push({
      x: cx + (r + jr) * Math.cos(angle) + jx,
      y: cy + (r + jr) * Math.sin(angle) + jy,
    });
  }
  return pts;
}

/**
 * Generate the example grid drawing.
 *
 * @param {object} cfg  full config object from config.js
 * @returns {{ name: string, polylines: Array<Array<{x:number,y:number}>> }}
 */
export function generateExampleGrid(cfg) {
  const { document: doc, sketch } = cfg;
  const { x, y, w, h } = drawableArea(doc);
  const rng = makePrng(sketch.seed);

  const cols = sketch.cols;
  const rows = sketch.rows;
  const cellW = w / cols;
  const cellH = h / rows;

  const polylines = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rng() > sketch.density) continue;

      const cx = x + col * cellW + cellW / 2;
      const cy = y + row * cellH + cellH / 2;
      const r = Math.min(cellW, cellH) * sketch.radiusFactor;

      // alternate between circle and horizontal / vertical segment
      const choice = Math.floor(rng() * 3);

      if (choice === 0) {
        // circle approximated as polyline
        polylines.push(
          circlePolyline(cx, cy, r, sketch.circleSegments, rng, sketch.jitter)
        );
      } else if (choice === 1) {
        // horizontal segment with slight jitter
        const jx = (rng() - 0.5) * sketch.jitter;
        const jy = (rng() - 0.5) * sketch.jitter;
        polylines.push([
          { x: cx - r + jx, y: cy + jy },
          { x: cx + r + jx, y: cy + jy },
        ]);
      } else {
        // vertical segment with slight jitter
        const jx = (rng() - 0.5) * sketch.jitter;
        const jy = (rng() - 0.5) * sketch.jitter;
        polylines.push([
          { x: cx + jx, y: cy - r + jy },
          { x: cx + jx, y: cy + r + jy },
        ]);
      }
    }
  }

  return {
    name: sketch.name,
    polylines,
  };
}
