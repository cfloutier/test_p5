# test_p5

Starter repo for **p5.js** experiments focused on **parametric vector drawing** and **SVG export** for an **XY plotter**.

## Goals

- quick iteration in the browser with p5.js
- parametric drawing structure
- SVG export for plotter workflows
- reusable base for future generative/vector projects

## Project structure

- `index.html` — app entry point
- `src/main.js` — bootstraps the sketch and UI
- `src/config.js` — document, paper, and drawing parameters
- `src/sketches/example-grid.js` — first parametric drawing example
- `src/lib/svg-export.js` — simple SVG exporter from line segments
- `src/lib/plotter.js` — plotter-oriented helpers
- `src/styles.css` — minimal layout

## Notes

This starter keeps drawing logic separate from SVG generation:

- generate geometry first
- preview it in p5.js
- export the same geometry to SVG

That makes it easier to keep the project plotter-friendly.

## Next ideas

- add multiple sketches
- add a parameter panel
- add pen color/layer support
- add path optimization for plotting
- add support for A3 / portrait / landscape presets
