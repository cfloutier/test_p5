/**
 * svg-export.js — build an SVG string from an array of polylines and
 * provide a one-click browser download.
 *
 * All coordinates are expected in millimetres.
 * The generated SVG uses stroke-only paths (no fill), suited for plotters.
 */

/**
 * Builds a complete SVG string.
 *
 * @param {object} options
 * @param {object} options.document   config.document  ({ width, height, margin, stroke, strokeWeight })
 * @param {Array<Array<{x:number,y:number}>>} options.polylines
 * @returns {string}
 */
export function buildSvg({ document: doc, polylines }) {
  const w = doc.width;
  const h = doc.height;
  const strokeColor = doc.stroke ?? '#000000';
  const strokeWidth = doc.strokeWeight ?? 0.3;

  const paths = polylines
    .filter((pl) => pl.length >= 2)
    .map((pl) => {
      const d = pl
        .map((pt, i) => `${i === 0 ? 'M' : 'L'}${round(pt.x)},${round(pt.y)}`)
        .join(' ');
      return `  <path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`;
    });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg"`,
    `     width="${w}mm" height="${h}mm"`,
    `     viewBox="0 0 ${w} ${h}">`,
    ...paths,
    `</svg>`,
  ].join('\n');
}

/**
 * Triggers a file download of an SVG string in the browser.
 *
 * @param {string} filename   e.g. "my-drawing.svg"
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

// ----- internal helpers -----

function round(n) {
  return Math.round(n * 100) / 100;
}
