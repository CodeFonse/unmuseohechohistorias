class Form {
    constructor(position, info, img_color) {
      this.position = position;
      this.info = info;
      this.color = img_color.get(position.x, position.y);
      this.angle = random(10000);
      this.size = 1.5;
    }
    show(transition) {
        fill(this.color[0], this.color[1], this.color[2], transition);   
        this._form(this.position.x + global_x, this.position.y + global_y, 10, 10);
    }
    _form(x, y, w, h) {  
      if (dist(mouseX, mouseY, x, y) < 30)
       this.size = 1;
      else 
       this.size = 1.5;
      push();
      translate(x, y);
      rotate(this.angle);
      rectMode(CENTER);
      rect(0, 0, w * this.size, h * this.size);
      pop();
      this.angle += 0.1;
    }
    getPosition() {
       return this.position;
    }
    getInfo() {
      return this.info;
    }
  }
  //----End class