let database,
  forms = [],
  img_pixels,
  img_color,
  img_background,
  pop_up,
  font_one,
  global_x = 50,
  global_y = 100,
  animated = false,
  control;

function preload() {
  database = loadStrings("../../Assets/database.txt"); //original
  img_pixels = loadImage("../../Assets/Images/pixeles.jpg");
  img_color = loadImage("../../Assets/Images/color.jpg"); //
  img_background = loadImage("../../Assets/Images/backgroud_img.png"); //background
  font_one = loadFont("../../Assets/Fonts/Roboto-Regular.ttf");
}

function setup() {
  let c = createCanvas(1200, 700);
  c.parent("root");
  pixelDensity(1);
  initialPosition().then(forms => {
    let positions = [
      createVector(200, 150),
      createVector(600, 150),
      createVector(900, 150),
      createVector(450, 450),
      createVector(750, 450)
    ];
    control = new animationControl(forms, positions);
  });
  pop_up = new popUp();
  let button = createButton("click me");
  button.parent("button");
  button.class("btn");
  button.mousePressed(press);
}

function initialPosition() {
  return aviable_positions(img_pixels)
    .then(positions => {
      database.forEach(data => {
        let positon = ceil(random(positions.length));
        let vector_pos = positions[positon];
        if (vector_pos) {
          forms.push(new Form(vector_pos, data, img_color));
          positions.splice(positon, 1);
        }
      });
      return forms;
    })
    .catch(err => console.log(err));
}

function aviable_positions(img) {
  img.loadPixels();
  loadPixels();
  return new Promise((resolve, reject) => {
    let positions = [];
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let loc = (x + y * img.width) * 4;
        let r = img.pixels[loc + 0];
        let g = img.pixels[loc + 1];
        let b = img.pixels[loc + 2];
        let black_color = 180;
        if (r < black_color && g < black_color && b < black_color) {
          positions.push(createVector(x, y));
        }
      }
    }
    updatePixels();
    resolve(positions);
  });
}
function draw() {
  background(255);
  noStroke();
  image(img_background, 0, 0);
  if (control) {
    control.show_form();
    show_info();
  }
}

function press() {
  animated = !animated;
  control.move(animated);
}

function show_info() {
  let _form = captureUniqueForm();
  if (_form) {
    pop_up.show(true, mouseX, mouseY, _form.getInfo());
  }
}

function captureUniqueForm() {
  let _form = null;
  control.getForms().forEach(form => {
    if (form.getPosition()) {
      let d = dist(
        form.getPosition().x + global_x,
        form.getPosition().y + global_y,
        mouseX,
        mouseY
      );
      if (d < 5) {
        _form = form;
        _form.setSelected();
      }
    }
  });
  return _form;
}
