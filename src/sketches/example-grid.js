/**
 * example-grid.js — a simple parametric drawing for testing the plotter starter.
 *
 * Generates a grid where each cell contains either:
 *   - a circle approximated by a polyline
 *   - a single horizontal or vertical segment
 *
 * All coordinates are in millimetres.
 */

import { drawableArea } from '../lib/plotter.js';

// --- Deterministic pseudo-random (mulberry32) --------------------------------

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Geometry helpers --------------------------------------------------------

function circlePolyline(cx, cy, r, steps) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }
  return pts;
}

function hSegment(cx, cy, halfLen) {
  return [
    { x: cx - halfLen, y: cy },
    { x: cx + halfLen, y: cy }
  ];
}

function vSegment(cx, cy, halfLen) {
  return [
    { x: cx, y: cy - halfLen },
    { x: cx, y: cy + halfLen }
  ];
}

// --- Main generator ----------------------------------------------------------

/**
 * @param {object} config
 * @returns {{ name: string, polylines: Array<Array<{x, y}>> }}
 */
export function generateExampleGrid(config) {
  const { document: doc, sketch } = config;
  const { cols, rows, circleSteps, jitter, probCircle, seed, title } = sketch;

  const rand = mulberry32(seed);
  const area = drawableArea(doc);
  const polylines = [];

  const cellW = area.width / cols;
  const cellH = area.height / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Cell centre (in mm, relative to document origin)
      const baseCx = area.x + (col + 0.5) * cellW;
      const baseCy = area.y + (row + 0.5) * cellH;

      // Apply jitter
      const cx = baseCx + (rand() - 0.5) * jitter;
      const cy = baseCy + (rand() - 0.5) * jitter;

      const maxR = Math.min(cellW, cellH) * 0.42;

      if (rand() < probCircle) {
        // Circle with random radius
        const r = maxR * (0.3 + rand() * 0.7);
        polylines.push(circlePolyline(cx, cy, r, circleSteps));
      } else {
        // Horizontal or vertical segment
        const halfLen = maxR * (0.4 + rand() * 0.6);
        if (rand() < 0.5) {
          polylines.push(hSegment(cx, cy, halfLen));
        } else {
          polylines.push(vSegment(cx, cy, halfLen));
        }
      }
    }
  }

  return { name: title, polylines };
}
