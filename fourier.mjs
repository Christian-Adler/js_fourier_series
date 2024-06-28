import {Vector} from "./vector.mjs";

class Fourier {
  constructor(x, y, r = 50, rotationOffset = 0) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rotationOffset = rotationOffset;
    this.actValue = Math.PI * 2;
    this.step = Math.PI / 100;
  }

  update() {
    this.actValue += this.step;
    if (this.actValue >= Math.PI * 2) this.actValue %= (Math.PI * 2);
  }

  drawFourier(ctx, n = 10) {
    this.step = Math.PI * 2 / 100;

    let x = this.x;
    let y = this.y;
    for (let i = 0; i < n; i++) {
      let seriesNo = i * 2 + 1;

      let radius = this.r * (4 / Math.PI) / seriesNo;

      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.beginPath();
      ctx.moveTo(x, y);

      x += radius * Math.cos(this.actValue * seriesNo);
      y += radius * Math.sin(this.actValue * seriesNo);
      ctx.lineTo(x, y);
      ctx.stroke();

      // ctx.beginPath();
      // ctx.arc(x, y, 3, 0, Math.PI * 2);
      // ctx.fill();

    }
    return new Vector(x, y);
  }

  drawFourierSeries(ctx, fourierSeries) {
    this.step = Math.PI * 2 / fourierSeries.length;
    let x = this.x;
    let y = this.y;
    for (let i = 0; i < fourierSeries.length; i++) {
      const fourierYItem = fourierSeries[i];

      const freq = fourierYItem.freq;
      const radius = fourierYItem.amp;
      const phase = fourierYItem.phase;

      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.beginPath();
      ctx.moveTo(x, y);

      x += radius * Math.cos(this.actValue * freq + phase + this.rotationOffset);
      y += radius * Math.sin(this.actValue * freq + phase + this.rotationOffset);
      ctx.lineTo(x, y);
      ctx.stroke();

      // ctx.beginPath();
      // ctx.arc(x, y, 3, 0, Math.PI * 2);
      // ctx.fill();

    }
    return new Vector(x, y);
  }
}

/**
 * Discrete Fourier Transformation
 * @param x
 */
const dft = (x) => {
  const N = x.length;
  const X = [];
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (Math.PI * 2 * k * n) / N;
      re += x[n] * Math.cos(phi);
      im -= x[n] * Math.sin(phi);
    }

    re = re / N;
    im = im / N;

    const freq = k;
    const amp = Math.sqrt(re * re + im * im);
    const phase = Math.atan2(im, re);

    X[k] = {re, im, freq, amp, phase};
  }
  return X;
}

export {Fourier, dft}