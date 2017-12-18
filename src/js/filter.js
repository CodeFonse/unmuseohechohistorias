class filter {
  constructor(x, y, objs, title) {
    this.title = title;
    this.total_objs = objs.length;
    this.objs = objs;
    this.r = 15;
    this.vel = 0;
    this.target = 0;
    this.count = 0;
    this.rings = 1;
    this.total = 0;
    this.counting = 0;
    this.x = x;
    this.y = y;
    this.positions = [];
  }
  calculate_positions() {
    this.count++;
    this.counting = 0;
    this.target = Math.min(this.count, this.total_objs);
    while (this.total < this.target) {
      this.total += this.rings * 6;
      this.rings++;
    }
    this.total = 0;
    for (let i = 0; i < this.rings; i++) {
      let ring = 6 * i;
      this.total += ring;
      if (this.target < this.total) {
        ring = Math.max(ring - (this.total - this.target), 3, ring / 3);
      }
      for (let j = 0; j < ring; j++) {
        if (this.counting > this.target) break;
        let x = this.x + cos(TWO_PI / ring * j + this.vel) * this.r * i;
        let y = this.y + sin(TWO_PI / ring * j + this.vel) * this.r * i;
        this.move(x, y, this.counting);
        this.counting++;
      }
    }
  }
  move(x, y, i) {
    if (this.objs[i]) this.objs[i].changeTarget(createVector(x, y));
  }

  initialPosition() {
    this.objs.forEach(form => {
      form.changeTarget(false);
    });
  }
  info() {
    push();
    fill(255);
    let x = this.x + 60;
    let y = this.y + 100;
    rectMode(CENTER);
    rect(x, y, 140, 50);
    fill(0);
    textAlign(CENTER);
    textFont(font_one, 20);
    text(this.title, x, y);
    fill(255, 0, 0);
    textSize(15);
    text(this.objs.length + " personas", x, y + 20);
    textAlign(CORNER);
    rectMode(CORNER);
    pop();
  }
}
