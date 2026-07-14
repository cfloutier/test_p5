/**
 * svg-export.js — build and download an SVG from an array of polylines.
 * All coordinates are expected in millimetres; the SVG viewBox mirrors that.
 */

/**
 * Convert an array of polylines to a complete SVG string.
 *
 * @param {object} options
 * @param {object} options.document - config.document  ({ width, height, margin, stroke, strokeWeight })
 * @param {Array<Array<{x, y}>>} options.polylines
 * @returns {string} SVG markup
 */
export function buildSvg({ document: doc, polylines }) {
  const { width, height, stroke, strokeWeight } = doc;

  const paths = polylines
    .filter((pl) => pl.length >= 2)
    .map((pl) => {
      const d = pl
        .map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(3)},${pt.y.toFixed(3)}`)
        .join(' ');
      return `  <path d="${d}" />`;
    })
    .join('\n');

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg"`,
    `     width="${width}mm" height="${height}mm"`,
    `     viewBox="0 0 ${width} ${height}">`,
    `  <g fill="none" stroke="${stroke}" stroke-width="${strokeWeight}" stroke-linecap="round" stroke-linejoin="round">`,
    paths,
    `  </g>`,
    `</svg>`
  ].join('\n');
}

/**
 * Trigger a browser download of the given SVG string.
 *
 * @param {string} filename - e.g. 'my-drawing.svg'
 * @param {string} svgString
 */
export function downloadSvg(filename, svgString) {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
