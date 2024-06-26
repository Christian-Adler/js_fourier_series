import {dft, Fourier} from "./fourier.mjs";
import {Series} from "./series.mjs";

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

const fourier = new Fourier(250, worldHeight2, 10, 100);
const series = new Series(250 + 250, worldHeight2);

let y = [];

y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100,];

y = [];
for (let i = 1; i < 100; i++) {
  // y.push((Math.random() - 0.5) * 200);
  y.push(i * 3 - 150);

}

const fourierY = dft(y);

const update = () => {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);

  fourier.update();
  // const actVec = fourier.drawFourier(ctx);
  const actVec = fourier.drawFourierSeries(ctx, fourierY);
  series.add(actVec);
  series.draw(ctx);


  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(250 + actVec.x, worldHeight2 + actVec.y);
  ctx.lineTo(250 + 250, worldHeight2 + actVec.y);
  ctx.stroke();

  updateWorldSettings();

  requestAnimationFrame(update);
}

update();