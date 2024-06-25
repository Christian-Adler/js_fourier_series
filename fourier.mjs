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
    const endVector = this.drawFourier(ctx);

    ctx.restore();
    return endVector;
  }

  drawFourier(ctx,) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < this.n; i++) {
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
}

export {Fourier}