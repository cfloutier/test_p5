export const config = {
  // --- Document / paper ---
  document: {
    width: 210,       // mm  (A4 portrait)
    height: 297,      // mm
    margin: 15,       // mm
    units: 'mm',
    background: '#ffffff',
    stroke: '#000000',
    strokeWeight: 0.4 // mm (approx 0.05 mm pen)
  },

  // --- Preview (browser canvas) ---
  preview: {
    // 1 mm → n px  (3 ≈ 800 px wide for A4)
    scale: 3
  },

  // --- Drawing / sketch parameters ---
  sketch: {
    seed: 42,

    // Grid
    cols: 8,
    rows: 11,

    // Per-cell circle approximation
    circleSteps: 32,   // vertices to approximate one circle

    // Jitter applied to grid points (mm)
    jitter: 3,

    // Probability that a cell contains a circle (vs. a line)
    probCircle: 0.6,

    // Title used for the exported file name
    title: 'example-grid'
  }
};
