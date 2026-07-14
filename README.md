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
- `COPILOT_PROMPT.md` — handoff prompt to continue building the repo in a repo-scoped Copilot chat

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

## Continue in a repo-scoped Copilot prompt

Open a Copilot chat directly in this repository and paste the content of `COPILOT_PROMPT.md`.
That prompt tells Copilot exactly which files are already present and which files still need to be created to finish the starter.
