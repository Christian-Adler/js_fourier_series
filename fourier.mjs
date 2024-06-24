import {Vector} from "./vector.mjs";

class Fourier {
  constructor(x, y, n, r = 50) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.r = r;
    this.actValue = 0;
    this.step = Math.PI / 100;
  }

  update() {
    this.actValue += this.step;
    if (this.actValue >= Math.PI * 2) this.actValue = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    const endVector = this.drawFourier(ctx, 0, 0, 1);

    ctx.restore();
    return endVector;
  }

  drawFourier(ctx, x, y, counter) {
    const seriesNo = counter * 2 - 1
    let radius = this.r / seriesNo;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    let xC = x + radius * Math.cos(this.actValue * seriesNo);
    let yC = y + radius * Math.sin(this.actValue * seriesNo);
    ctx.lineTo(xC, yC);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(xC, yC, 3, 0, Math.PI * 2);
    ctx.fill();

    if (counter >= this.n)
      return new Vector(xC, yC);
    return this.drawFourier(ctx, xC, yC, counter + 1);
  }
}

export {Fourier}