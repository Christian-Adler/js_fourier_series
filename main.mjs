import {dft, Fourier} from "./fourier.mjs";
import {Series} from "./series.mjs";
import {Vector} from "./vector.mjs";
import {drawing} from "./drawing.mjs";
import {deg2rad} from "./utils.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;
let worldWidth2 = worldWidth / 2;
let worldHeight2 = worldHeight / 2;
let worldUpdated = true;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    worldWidth2 = worldWidth / 2;
    worldHeight2 = worldHeight / 2;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
    worldUpdated = true;
  }
};

updateWorldSettings();

const slowly = false;
let counter = 0;
const onlyY = false;
const onlyYOffsetX = 500;
const standardFourierSeries = false;

const HALF_PI = Math.PI / 2;

const fourierX = new Fourier(550, 150, 100);
const fourierY = new Fourier(250, worldHeight2, 100, HALF_PI);
const series = new Series(onlyY ? onlyYOffsetX : 0, 0);

let x = [];
let y = [];

// y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100,];
for (let i = 0; i < 100; i++) {
  // x.push((Math.random() - 0.5) * 200);
  // y.push((Math.random() - 0.5) * 200);

  // saegezahn
  // y.push(i * 3 - 150);
  // x.push(i * 3 - 150);

  // sin / circle
  const angle = deg2rad(i / 100 * 360);
  // x.push(100 * Math.cos(angle));
  // y.push(100 * Math.sin(angle));
}

for (let i = 0; i < drawing.length; i += 10) {
  const drawingElement = drawing[i];
  // x.push(drawingElement.x);
  // y.push(drawingElement.y);
}

// svg
const svgPath = document.getElementById('path');
const svgPathLength = Math.floor(svgPath.getTotalLength());
for (let i = 0; i <= 100; i++) {
  const pt = svgPath.getPointAtLength(i * svgPathLength / 100);
  x.push(Math.round(pt.x));
  y.push(Math.round(pt.y));
}

const fourierSeriesX = dft(x);
const fourierSeriesY = dft(y);


const update = () => {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);

  let actVecX;
  let actVecY;
  if (standardFourierSeries) {
    actVecY = fourierY.drawFourier(ctx);
  } else {
    if (!onlyY)
      actVecX = fourierX.drawFourierSeries(ctx, fourierSeriesX);
    actVecY = fourierY.drawFourierSeries(ctx, fourierSeriesY);
  }

  if (onlyY) {
    series.add(actVecY, y.length);
    series.drawWithOffset(ctx);

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(actVecY.x, actVecY.y);
    ctx.lineTo(onlyYOffsetX, actVecY.y);
    ctx.stroke();
  } else {
    series.add(new Vector(actVecX.x, actVecY.y), y.length, true);
    series.draw(ctx);

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(actVecX.x, actVecX.y);
    ctx.lineTo(actVecX.x, actVecY.y);
    ctx.moveTo(actVecY.x, actVecY.y);
    ctx.lineTo(actVecX.x, actVecY.y);
    ctx.stroke();
  }

  //
  counter++;
  if (!slowly || counter % 10 === 0) {
    if (!onlyY)
      fourierX.update();
    fourierY.update();
    counter = 0;
  }

  updateWorldSettings();

  requestAnimationFrame(update);
}

update();