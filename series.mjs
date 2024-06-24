class Series {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dots = [];
  }

  add(vec) {
    this.dots.push(vec);
    while (this.dots.length > 1000) this.dots.splice(0, 1);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.beginPath();
    for (let i = this.dots.length - 1; i >= 0; i--) {
      const vec = this.dots[i];
      if (i === 0)
        ctx.moveTo(this.dots.length - i, vec.y);
      else
        ctx.lineTo(this.dots.length - i, vec.y);
    }
    ctx.stroke();

    ctx.restore();
  }
}

export {Series};