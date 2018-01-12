class Form {
  constructor(position, info, img_color) {
    let infoTemp = split(info, "/");
    this.group = infoTemp[0];
    this.position_group = {};
    this.target = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.old_position = createVector(position.x, position.y);
    this.position = createVector(random(-200, 700), random(-200, 700));
    this.info = info;
    this.color = img_color.get(position.x, position.y);
    this.angle = random(10000);
    this.size = 1.5;
    this.visible = false;
    this.postion_temp = position;
    this.selected = false;
    this.gender = infoTemp[3];
    this.age = infoTemp[4];
  }
  show() {
    this.animate();
    this.figure(
      this.position.x + global_x,
      this.position.y + global_y,
      10,
      10,
      0.05
    );
  }
  figure(x, y, w, h, vel) {
    this.changeSize(x, y);
    fill(this.color[0], this.color[1], this.color[2]);
    push();
    if (this.selected) {
      stroke("red");
      strokeWeight(4);
    }
    translate(x, y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, w * this.size, h * this.size);
    this.angle += vel;
    rectMode(CORNER);
    pop();
  }
  changeSize(x, y) {
    if (dist(mouseX, mouseY, x, y) < 30 && !this.selected) this.size = 1;
    else if (!this.selected) this.size = 1.5;
    if (dist(mouseX, mouseY, x, y) > 5) this.selected = false;
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
  getAge(){
    return this.age;
  }
  getGender(){
    return this.gender;
  }
  getPosition() {
    return this.position;
  }
  getInfo() {
    return this.info;
  }
  setSelected() {
    if (!this.selected) {
      this.selected = !this.selected;
      this.size = 2;
    }
  }
}
//----End class
