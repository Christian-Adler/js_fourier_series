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

    ctx.beginPath();
    for (let i = this.dots.length - 1; i >= 0; i--) {
      const vec = this.dots[i];
      if (i === 0)
        ctx.moveTo(this.x + this.dots.length - i, this.y + vec.y);
      else
        ctx.lineTo(this.x + this.dots.length - i, this.y + vec.y);
    }
    ctx.stroke();
  }
}

export {Series};