class Form {
  constructor(position, info, img_color) {
    this.group = split(info, "/")[0];
    this.position_group = {};
    this.target = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.old_position = createVector(position.x, position.y);
    this.position = position //createVector(random(-200, 700), random(-200, 700));
    this.info = info;
    this.color = img_color.get(position.x, position.y);
    this.angle = random(10000);
    this.size = 1.5;
    this.visible = false;
    this.postion_temp = position
  }
  show() {
      this.animate();
      this._form(
        this.position.x + global_x,
        this.position.y + global_y,
        10,
        10,
        0.05
      );    
  }  
  _form(x, y, w, h, vel) {
    this.changeSize(x, y);
    fill(this.color[0], this.color[1], this.color[2]);
    push();
    translate(x, y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, w * this.size, h * this.size);
    this.angle += vel;
    pop();
  }
  changeSize(x, y) {
    if (dist(mouseX, mouseY, x, y) < 30) this.size = 1;
    else this.size = 1.5;
  }
  animate() {
    let maxspeed = 4,
      desired = p5.Vector.sub(this.target, this.position),
      d = desired.mag();
    if (d < 100) {
      let m = map(d, 0, 100, 0, maxspeed);
      desired.setMag(m);
    }
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(0.1);
    this.acceleration.add(steer);
    this.velocity.add(this.acceleration);
    this.velocity.limit(maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  changeTarget(steer) {
    if (steer) {
      this.target = steer;
    } else {
      this.target = this.old_position;
    }
  }    
  getGroup() {
    return this.group;
  }

  getPosition() {
    return this.position;
  }
  getInfo() {
    return this.info;
  }
}
//----End class
