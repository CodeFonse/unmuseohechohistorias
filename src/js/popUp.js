class popUp {
    constructor() {
      this.font_loaded = false;
      this.myFont = loadFont("../../Assets/Fonts/Roboto-Bold.ttf", () => {
        this.font_loaded = true;
      });
    }
    show(visible, x, y, info) {
      if (visible && this.font_loaded) {
        stroke(126);
        let x_two = 50 + mouseX;
        let y_two = y - 60;
        line(x, y, x_two, y_two);
        let size_line = this.show_text(info, x_two, y_two);
        stroke(126);
        line(x_two, y_two, x_two + size_line, y_two);
      }
    }
    show_text(info, x, y) {
      this.info = info;
      let splitString = split(info, "/");
      let text_lines = splitTokens(splitString[3], ".");
      let space_text = 10;
      let size_delimter_line = textWidth(text_lines[0]) + space_text;
      noStroke();
      fill(255);
      rect(x, y - 20, size_delimter_line, 80);
      fill(0);
      noStroke();
      textFont(this.myFont, 14);
      text(`${splitString[1]} | ${splitString[2]}`, x, y - 6);
      fill(150);
      textFont(font_one, 12);
      text_lines.forEach((txt, index, array) => {
        text(`${txt.trim()}`, x + space_text / 2, y + 16 + 16 * index);
      });
      return size_delimter_line;
    }
    setInfo() {
      this.info = null;
    }
  }
  //----End class