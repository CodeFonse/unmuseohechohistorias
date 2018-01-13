class popUp {
  constructor() {
    this.font_loaded = false;
    this.myFont = loadFont("../../Assets/Fonts/Roboto-Bold.ttf", () => {
      this.font_loaded = true;
    });
  }
  show(visible, app, info) {
    let x = app.mouseX;
    let y = app.mouseY;
    push();
    rectMode(CORNER);
    textAlign(CORNER);
    if (visible && this.font_loaded) {
      stroke(126);
      let x_two = x + 50;
      let y_two = y - 60;
      let flip = false;
      if (x > app.width / 2) {
        flip = true;
      }
      if (flip) {
        x_two = x - 50;
      }
      line(x, y, x_two, y_two);
      let size_line = this.show_text(info, x_two, y_two, flip);         
      stroke(126);
      if(flip)line(x_two, y_two, x_two - size_line, y_two);
      else line(x_two, y_two, x_two + size_line, y_two);
    }
    pop();
  }
  show_text(info, x, y, flip) {
    this.info = info;
    let splitString = split(info, "/");
    let text_lines = split(splitString[5], ".");
    let space_text = 10;
    let size_delimter_line = textWidth(text_lines[0]) + space_text;
    let _x = x;
    noStroke();
    fill(255);
    if (flip) _x = x - size_delimter_line;
    rect(_x, y - 20, size_delimter_line, 80);
    fill(0);
    noStroke();
    textFont(this.myFont, 14);
    text(`${splitString[1]} | ${splitString[2]}`, _x, y - 6);
    fill(150);
    textFont(font_one, 12);
    text_lines.forEach((txt, index, array) => {
      text(`${txt.trim()}`, _x + space_text / 2, y + 16 + 16 * index);
    });
    return size_delimter_line;
  }
  setInfo() {
    this.info = null;
  }
}
//----End class
