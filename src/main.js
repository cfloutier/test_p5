import { config } from './config.js';
import { mmToPx } from './lib/plotter.js';
import { buildSvg, downloadSvg } from './lib/svg-export.js';
import { generateExampleGrid } from './sketches/example-grid.js';

const state = {
  drawing: null
};

function setupMeta() {
  const meta = document.getElementById('meta');
  meta.innerHTML = `
    <strong>Paper:</strong> ${config.document.width} × ${config.document.height} ${config.document.units}<br>
    <strong>Margin:</strong> ${config.document.margin} ${config.document.units}<br>
    <strong>Seed:</strong> ${config.sketch.seed}
  `;
}

function regenerate() {
  state.drawing = generateExampleGrid(config);
  if (window.redraw) {
    window.redraw();
  }
}

function exportCurrentSvg() {
  const svg = buildSvg({
    document: config.document,
    polylines: state.drawing.polylines
  });
  downloadSvg(`${state.drawing.name}.svg`, svg);
}

setupMeta();
regenerate();

document.getElementById('export-svg').addEventListener('click', exportCurrentSvg);
document.getElementById('redraw').addEventListener('click', regenerate);

new p5((p) => {
  const canvasWrap = document.getElementById('canvas-wrap');
  const availableWidth = canvasWrap.clientWidth || window.innerWidth - 32;
  const scale = Math.min(config.preview.scale, availableWidth / config.document.width);
  const widthPx = mmToPx(config.document.width, scale);
  const heightPx = mmToPx(config.document.height, scale);

  p.setup = () => {
    const parent = document.getElementById('canvas-wrap');
    const canvas = p.createCanvas(widthPx, heightPx);
    canvas.parent(parent);
    p.noLoop();
  };

  p.draw = () => {
    p.background(config.document.background);
    p.stroke(config.document.stroke);
    p.strokeWeight(config.document.strokeWeight);
    p.noFill();

    p.push();
    p.scale(scale);

    p.stroke(220);
    p.rectMode(p.CORNER);
    p.rect(
      config.document.margin,
      config.document.margin,
      config.document.width - config.document.margin * 2,
      config.document.height - config.document.margin * 2
    );

    p.stroke(config.document.stroke);
    for (const polyline of state.drawing.polylines) {
      p.beginShape();
      for (const point of polyline) {
        p.vertex(point.x, point.y);
      }
      p.endShape();
    }

    p.pop();
  };
});
