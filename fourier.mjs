import {Vector} from "./vector.mjs";

class Fourier {
  constructor(x, y, n) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.r = 50;
    this.actValue = 0;
    this.step = Math.PI / 100;
  }

  update() {
    this.actValue += this.step;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    const endVector = this.drawFourier(ctx, 0, 0, 1);

    ctx.restore();
  }

  drawFourier(ctx, x, y, counter) {

    let radius = this.r / counter;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    let yC = y + -radius * Math.sin(this.actValue * counter);
    let xC = x + radius * Math.cos(this.actValue * counter);
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