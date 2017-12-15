let database,
  forms = [],
  img_pixels,
  img_color,
  img_background,
  pop_up = {},
  form_temp,
  font_one,
  global_x = 50,
  global_y = 100,
  transition = 0,
  transition_time = 0, //milliseconds
  ready = true,
  x_button = 280,
  y_button = 650,
  w = 80,
  h = 35;

function preload() {
  database = loadStrings("../../Assets/database.txt"); //original
  img_pixels = loadImage("../../Assets/Images/pixeles.jpg");
  img_color = loadImage("../../Assets/Images/color.jpg"); //
  img_background = loadImage("../../Assets/Images/backgroud_img.png"); //background
  font_one = loadFont("../../Assets/Fonts/Roboto-Regular.ttf");
}

function setup() {
  let c = createCanvas(1200, 700);
  c.parent("sketch-holder");
  pixelDensity(1);
  initialPosition();
  pop_up = new popUp();
}

function initialPosition() {
  aviable_positions(img_pixels)
    .then(positions => {
      database.forEach(data => {
        let positon = ceil(random(positions.length));
        let vector_pos = positions[positon];
        if (vector_pos) {
          forms.push(new Form(vector_pos, data, img_color, null, null));
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
  draw_form();
  if (ready) {
    show_info();
    filter_button();
  }
}

function mousePressed() {
  if (
    mouseX >= x_button &&
    mouseX <= x_button + w &&
    mouseY >= y_button &&
    mouseY <= y_button + h
  ) {
    console.log("filtering");
  }
}

function filter_button() {
  noStroke();
  fill(255, 0, 0);
  rect(x_button, y_button, w, h);
  fill(255);
  textFont(font_one, 18);
  text("filtrar", x_button + 22, y_button + 22);
}

function draw_form() {
  tint(255, 100); //opacity image background
  image(img_background, 0, 0);
  tint(255, transition); //opacity fade in effect
  forms.forEach(form => {
    form.show(transition);
  });
}
//Transition
let interval = setInterval(() => {
  if (transition < 255) {
    transition++;
  } else {
    ready = true;
    clearInterval(interval);
  }
}, transition_time);

function show_info() {
  forms.forEach(form => {
    if (form.getPosition()) {
      let d = dist(
        form.getPosition().x + global_x,
        form.getPosition().y + global_y,
        mouseX,
        mouseY
      );
      if (d < 5) {
        form_temp = form;
      }
    }
  });

  if (form_temp) {
    let form_temp_dist = dist(
      form_temp.getPosition().x + global_x,
      form_temp.getPosition().y + global_y,
      mouseX,
      mouseY
    );
    if (form_temp_dist > 5) {
      pop_up.setInfo();
      form_temp = null;
      return;
    }
    pop_up.show(true, mouseX, mouseY, form_temp.getInfo());
  }
}
