class filter {
  constructor(x, y, objs, size) {
    (this.x = x),
      (this.y = y),
      (this.objs = objs),
      (this.TARGET = objs.length),
      (this.SIZE = size),
      (this.count = 0),
      (this.counting = 0),
      (this.target = {}),
      (this.space = size * 2);
  }

  show() {
    let objs = this.objs,
      offset = 0,
      rings = 1,
      total = 1;
    this.count++;
    this.target = Math.min(this.count, this.TARGET);
    this.counting = 1;

    while (total < this.target) {
      total += rings * 6;
      rings++;
    }
    total = 1;
    this.draw_rings(objs, offset, rings, total);
  }
  draw_rings(objs, offset, rings, total) {
    for (let ring = 1; ring < rings; ring++) {
      let l = 6 * ring;
      total += l;
      if (this.target < total) {
        l = Math.max(l - (total - this.target), 3, l / 3);
      }
      if (ring > 1) {
        offset += 0.5 * TWO_PI / (ring - 1) / 6;
      }
	 // objs[0].show(this.x, this.y, this.SIZE);
	 ellipse(x,y,10,10)
      this.draw_objs(l)
    }
  }
  draw_objs(l){
	for (let i = 0; i < l; i++) {
        this.counting++;
        if (this.counting > this.target) break;
        let angle = i * TWO_PI / l;
        angle += offset;
        let x = this.x + sin(angle) * this.space * ring;
        let y = this.y + cos(angle) * this.space * ring;
		//objs[i].show_fil(x, y, this.SIZE);
		ellipse(x,y,10,10)
      }
  }
}
