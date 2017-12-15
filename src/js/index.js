let database;
let forms = [];
let background_img,
  background_img_color,
  img_filter,
  img_yellow,
  img_filter_details;
let pop_up = {},
  form_temp = null;
let myFontTwo;
let global_x = 50,
  global_y = 100;
let transition = 0;
let transition_time = 0; //milliseconds
let ready = false,
  showFilter = false;
let filterOne = [],
  filterTwo = [],
  filterThree = [],
  filterFour = [],
  filterFive = [];
let x_button = 280,
  y_button = 650,
  w = 80,
  h = 35;
let text_filter_x = 580,
  text_filter_y = 250;

function preload() {
  database = loadStrings("../../Assets/database.txt"); //original
  background_img = loadImage("../../Assets/Images/pixeles.jpg");
  background_img_color = loadImage("../../Assets/Images/color.jpg"); //
  img_yellow = loadImage("../../Assets/Images/backgroud_img.png"); //background
  img_filter_details = loadImage("../../Assets/Images/details.jpg"); //details
  myFontTwo = loadFont("../../Assets/Fonts/Roboto-Regular.ttf");
}

function setup() {
  let c = createCanvas(1200, 700);
  c.parent("sketch-holder");
  pixelDensity(1);
  loadPositions();
  pop_up = new popUp();
  //---end setup
}
function loadPositions() {

    initialPosition();
}

function initialPosition() {
  //-----Initial positions
  aviable_positions(background_img, 0)
    .then(positions => {
      database.forEach(data => {
        let positon = ceil(random(positions.length));
        let vector_pos = positions[positon];
        if (vector_pos) {
          let splitString = split(data, "/");
          let positon_temp = null;
          let second_pos = null;
          let group = splitString[0];
          switch (group) {
            case "Recitales":
              positon_temp = ceil(random(filterOne.length));
              second_pos = filterOne[positon_temp];
              filterOne.splice(positon_temp, 1);
              break;
            case "Exposiciones":
              positon_temp = ceil(random(filterTwo.length));
              second_pos = filterTwo[positon_temp];
              filterTwo.splice(positon_temp, 1);
              break;
            case "Conciertos":
              positon_temp = ceil(random(filterThree.length));
              second_pos = filterThree[positon_temp];
              filterThree.splice(positon_temp, 1);
              break;
            case "Talleres":
              positon_temp = ceil(random(filterFour.length));
              second_pos = filterFour[positon_temp];
              filterFour.splice(positon_temp, 1);
              break;
            case "Sala":
              positon_temp = ceil(random(filterFive.length));
              second_pos = filterFive[positon_temp];
              filterFive.splice(positon_temp, 1);
              break;
          }
          forms.push(
            new Form(vector_pos, data, background_img_color, second_pos, group)
          );
          positions.splice(positon, 1);
        }
      });
      return forms;
    })
    .catch(err => console.log(err));
}

function aviable_positions(img, type) {
  img.loadPixels();
  loadPixels();
  return new Promise((resolve, reject) => {
    let positions = [];
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let index = 8;
        let loc = (x + y * img.width) * 4;
        let pixloc = (y * width + x) * 4;
        let r = img.pixels[loc + 0];
        let g = img.pixels[loc + 1];
        let b = img.pixels[loc + 2];
        let black_color = 180;      
      
            if (r < black_color && g < black_color && b < black_color) {
              positions.push(createVector(x, y));
            }                  
        
        pixels[pixloc + 3] = 255;
        //---end for
      }
    }
    updatePixels();
    resolve(positions);
  });
  //---end method
}


function draw() {
  background(255);
  noStroke();
  draw_form();
  if (ready) {
    show_info();
    filter_button();
    if (showFilter) image(img_filter_details, text_filter_x, text_filter_y);
  }
}

function mousePressed() {
  if (
    mouseX >= x_button &&
    mouseX <= x_button + w &&
    mouseY >= y_button &&
    mouseY <= y_button + h
  ) {
    showFilter = !showFilter;
  }
}

function filter_button() {
  push();
  noStroke();
  fill(255, 0, 0);
  rect(x_button, y_button, w, h);
  fill(255);
  textFont(myFontTwo, 18);
  text("filtrar", x_button + 22, y_button + 22);
  pop();
}

function draw_form() {
  push();
  tint(255, 100); //opacity image background
  if (!showFilter) image(img_yellow, 0, 0);
  tint(255, transition); //opacity fade in effect
  //image(img_filter,global_x,global_y) //image for reference
  forms.forEach(form => {
    form.show(transition, showFilter);
  });
  pop();
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



