import {dft, Fourier} from "./fourier.mjs";
import {Series} from "./series.mjs";
import {Vector} from "./vector.mjs";
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

const HALF_PI = Math.PI / 2;

const fourierX = new Fourier(550, 150, 100);
const fourierY = new Fourier(250, worldHeight2, 100, HALF_PI);
const series = new Series(0, 0);

let x = [];
let y = [];

// y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100,];
for (let i = 0; i < 100; i++) {
  // y.push((Math.random() - 0.5) * 200);

  // saegezahn
  // y.push(i * 3 - 150);
  // x.push(i * 3 - 150);

  // sin / circle
  const angle = deg2rad(i / 100 * 360);
  x.push(100 * Math.cos(angle));
  y.push(100 * Math.sin(angle));
}

const fourierSeriesX = dft(x);
const fourierSeriesY = dft(y);

const slowly = true;
let counter = 0;

const update = () => {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);
  //
  counter++;
  if (!slowly || counter % 10 === 0) {
    fourierY.update();
    fourierX.update();
    counter = 0;
  }
  // const actVecY = fourierY.drawFourier(ctx);
  const actVecX = fourierX.drawFourierSeries(ctx, fourierSeriesX);
  const actVecY = fourierY.drawFourierSeries(ctx, fourierSeriesY);
  // series.add(actVecY);
  series.add(new Vector(actVecX.x, actVecY.y));
  series.draw(ctx);
  // series.drawWithOffset(ctx);

  // only one
  // ctx.strokeStyle = "red";
  // ctx.beginPath();
  // ctx.moveTo(actVecY.x, actVecY.y);
  // ctx.lineTo(250 + 250, actVecY.y);
  // ctx.stroke();

  // two
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(actVecX.x, actVecX.y);
  ctx.lineTo(actVecX.x, actVecY.y);
  ctx.moveTo(actVecY.x, actVecY.y);
  ctx.lineTo(actVecX.x, actVecY.y);
  ctx.stroke();

  updateWorldSettings();

  requestAnimationFrame(update);
}

update();