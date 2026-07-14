/**
 * plotter.js — geometry helpers for plotter-oriented drawings.
 *
 * All coordinates are in millimetres unless stated otherwise.
 */

/**
 * Returns the drawable area (inside margins) for a given document config.
 *
 * @param {object} doc  config.document
 * @returns {{ x: number, y: number, w: number, h: number }}
 */
export function drawableArea(doc) {
  const x = doc.margin;
  const y = doc.margin;
  const w = doc.width - doc.margin * 2;
  const h = doc.height - doc.margin * 2;
  return { x, y, w, h };
}

/**
 * Clamps a point so it stays inside the drawable area.
 *
 * @param {{ x: number, y: number }} pt
 * @param {object} doc  config.document
 * @returns {{ x: number, y: number }}
 */
export function clampToArea(pt, doc) {
  const area = drawableArea(doc);
  return {
    x: Math.max(area.x, Math.min(area.x + area.w, pt.x)),
    y: Math.max(area.y, Math.min(area.y + area.h, pt.y)),
  };
}

/**
 * Converts a millimetre value to pixels using the preview scale.
 *
 * @param {number} mm
 * @param {number} scale  config.preview.scale  (px per mm)
 * @returns {number}
 */
export function mmToPx(mm, scale) {
  return mm * scale;
}

/**
 * Converts a pixel value back to millimetres.
 *
 * @param {number} px
 * @param {number} scale  config.preview.scale  (px per mm)
 * @returns {number}
 */
export function pxToMm(px, scale) {
  return px / scale;
}
