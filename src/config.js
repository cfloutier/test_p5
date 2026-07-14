export const config = {
  // ---------- document / paper ----------
  document: {
    width: 210,          // mm  (A4 portrait)
    height: 297,         // mm
    units: 'mm',
    margin: 15,          // mm  all sides
    background: '#ffffff',
    stroke: '#111111',
    strokeWeight: 0.5,   // px at preview scale (maps to ~0.3 mm)
  },

  // ---------- preview ----------
  preview: {
    // 1 mm → N px on screen.  3 gives a ~630×890 px canvas for A4.
    scale: 3,
  },

  // ---------- sketch parameters ----------
  sketch: {
    name: 'example-grid',
    seed: 42,            // deterministic RNG seed

    // grid
    cols: 8,
    rows: 11,

    // per-cell circle approximation
    circleSegments: 48,  // number of segments to approximate a circle
    radiusFactor: 0.35,  // circle radius as a fraction of cell size

    // jitter applied to vertex positions (mm)
    jitter: 1.2,

    // probability that a cell draws something
    density: 0.75,
  },
};
