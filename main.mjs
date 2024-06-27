import {dft, Fourier} from "./fourier.mjs";
import {Series} from "./series.mjs";
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

const fourier = new Fourier(250, worldHeight2, 100, HALF_PI);
const fourier2 = new Fourier(350, 150, 100);
const series = new Series(250 + 250, 0);

let y = [];
let x = [];

// y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100,];
for (let i = 1; i < 100; i++) {
  // y.push((Math.random() - 0.5) * 200);

  // saegezahn
  // y.push(i * 3 - 150);
  // x.push(i * 3 - 150);

  // sin / circle
  const angle = deg2rad(i / 100 * 360);
  x.push(100 * Math.cos(angle));
  y.push(100 * Math.sin(angle));
}

const fourierY = dft(y);
const fourierX = dft(x);

const update = () => {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);
  //
  fourier.update();
  fourier2.update();
  // const actVec = fourier.drawFourier(ctx);
  const actVec = fourier.drawFourierSeries(ctx, fourierY);
  fourier2.drawFourierSeries(ctx, fourierY);
  series.add(actVec);
  series.draw(ctx);

  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(actVec.x, actVec.y);
  ctx.lineTo(250 + 250, actVec.y);
  ctx.stroke();

  updateWorldSettings();

  requestAnimationFrame(update);
}

update();