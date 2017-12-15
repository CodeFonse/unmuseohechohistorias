class Form {
    constructor(position, info, img_color, second_position, group) {
      this.position = position;
      this.group = group;
      this.second_position = second_position;
      this.info = info;
      this.color = img_color.get(position.x, position.y);
      this.filter_active = false;
      this.angle_vel = random(10000);
      this.size = 1.5; //initial size
    }
    show(transition, filter_active) {
      this.filter_active = filter_active;
      fill(this.color[0], this.color[1], this.color[2], transition);
      //Filter ellipse
      if (filter_active && this.second_position) {
        //edit colors
        switch (this.group) {
          case "Recitales":
            fill(0, 0, 255); //blue
            break;
          case "Exposiciones":
            fill(0, 255, 0); //green
            break;
          case "Conciertos":
            fill(255, 0, 0); //red
            break;
          case "Talleres":
            fill(228, 225, 55); //yellow
            break;
          case "Sala":
            fill(50); //black
            break;
        }
        ellipse(
          this.second_position.x + global_x,
          this.second_position.y + global_y,
          10,
          10
        );
      }
      //----Default ellipse
      if (!filter_active)
        this._form(
          this.position.x + global_x,
          this.position.y + global_y,
          10,
          10
        );
    }
  
    //For edit the forms
    _form(x, y, w, h) {
      // ellipse(x, y,w,h)
  
      if (dist(mouseX, mouseY, x, y) < 30) this.size = 1;
      else this.size = 1.5;
      push();
      translate(x, y);
      rotate(this.angle_vel);
      rectMode(CENTER);
      rect(0, 0, w * this.size, h * this.size);
      pop();
      this.angle_vel += 0.0;
    }
    getPosition() {
      if (this.filter_active) return this.second_position;
      return this.position;
    }
    getInfo() {
      return this.info;
    }
  }
  //----End class