/**
 * plotter.js — geometry helpers for plotter-oriented sketches.
 * All coordinates are in millimetres unless otherwise noted.
 */

/**
 * Return the drawable rectangle (inside margins).
 * @param {object} doc - config.document
 * @returns {{ x, y, width, height }}
 */
export function drawableArea(doc) {
  return {
    x: doc.margin,
    y: doc.margin,
    width: doc.width - doc.margin * 2,
    height: doc.height - doc.margin * 2
  };
}

/**
 * Clamp a point so it stays inside the drawable area.
 * @param {{ x, y }} point
 * @param {object} doc - config.document
 * @returns {{ x, y }}
 */
export function constrainPoint(point, doc) {
  const area = drawableArea(doc);
  return {
    x: Math.max(area.x, Math.min(area.x + area.width, point.x)),
    y: Math.max(area.y, Math.min(area.y + area.height, point.y))
  };
}

/**
 * Convert millimetres to pixels for the browser preview.
 * @param {number} mm
 * @param {number} scale - pixels per mm (from config.preview.scale)
 * @returns {number}
 */
export function mmToPx(mm, scale) {
  return mm * scale;
}
