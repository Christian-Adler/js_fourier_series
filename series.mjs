class Series {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dots = [];
  }

  add(vec, optMaxLen, clearOnMaxLen) {
    this.dots.push(vec);

    let maxLen = 1000;
    if (typeof optMaxLen === 'number' && optMaxLen > 1) {
      maxLen = optMaxLen;
    }

    if (clearOnMaxLen && this.dots.length >= maxLen) {
      this.dots = [];
    }

    while (this.dots.length > maxLen) this.dots.splice(0, 1);
  }

  drawWithOffset(ctx) {

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

  draw(ctx) {

    ctx.beginPath();
    for (let i = this.dots.length - 1; i >= 0; i--) {
      const vec = this.dots[i];
      if (i === 0)
        ctx.moveTo(this.x + vec.x, this.y + vec.y);
      else
        ctx.lineTo(this.x + vec.x, this.y + vec.y);
    }
    ctx.stroke();
  }
}

export {Series};