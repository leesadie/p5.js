let r = 200;

let density;
let densitySlider;

let thetaMax, phiMax;
let thetaMaxSlider, phiMaxSlider;

let frequency, frequency2;
let freqSlider, freqSlider2;

function setup() {
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);

  stroke(199, 80, 88)
  strokeWeight(3);
  noFill();

  thetaMax = createDiv();
  thetaMaxSlider = createSlider(0, 360, 360, 10)//min, max, default, step size
  thetaMax.class("valueDisplay");
  thetaMaxSlider.class("Slider");

  phiMax = createDiv();
  phiMaxSlider = createSlider(0, 180, 180, 10)//min, max, default, step size
  phiMax.class("valueDisplay");
  phiMaxSlider.class("Slider");

  density = createDiv();
  densitySlider = createSlider(3, 62, 24, 1) //min, max, default, step size
  density.class("valueDisplay");
  densitySlider.class("Slider");

  frequency = createDiv();
  freqSlider = createSlider(1, 10, 1, 0.01) //min, max, default, step size
  frequency.class("valueDisplay");
  freqSlider.class("Slider");

  frequency2 = createDiv();
  freqSlider2 = createSlider(1, 10, 1, 0.01) //min, max, default, step size
  frequency2.class("valueDisplay");
  freqSlider2.class("Slider");
}

function draw() {
  background(230, 50, 15);
  orbitControl(4, 4);

  rotateY(90);
  rotateZ(65);

  //normalSphere();
  //sphericalSpiral();
  //SphericalLissajous();
  bumpySphere();

  thetaMax.html("Theta max value: " + thetaMaxSlider.value());
  phiMax.html("Phi max value: " + phiMaxSlider.value());

  let displayDensity = int(map(densitySlider.value(), 3, 62, 1, 60));
  density.html("Density value: " + displayDensity);

  frequency.html("Frequency: " + freqSlider.value());
  frequency2.html("Frequency2: " + freqSlider2.value());
}

function normalSphere() {
  for(let phi = 0; phi < phiMaxSlider.value(); phi += 180/densitySlider.value()) {
    beginShape();
    for(let theta = 0; theta < thetaMaxSlider.value(); theta += 360/densitySlider.value()) {
      let x = r * cos(phi);
      let y = r * sin(phi) * sin(theta);
      let z = r * sin(phi) * cos(theta);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

function sphericalSpiral() {
  beginShape();
  for(let theta = 0; theta < thetaMaxSlider.value()/2; theta += 0.2) {
    let x = r * cos(theta);
    let y = r * sin(theta) * sin(theta*densitySlider.value());
    let z = r * sin(theta) * cos(theta*densitySlider.value());
    vertex(x, y, z);
  }
  endShape(LINES);
}

function SphericalLissajous() {
  beginShape();
  for(let theta = 0; theta < 360; theta += 0.2) {
    let x = r * cos(theta*freqSlider.value());
    let y = r * sin(theta*freqSlider.value()) * sin(theta*freqSlider2.value());
    let z = r * sin(theta*freqSlider.value()) * cos(theta*freqSlider2.value());
    vertex(x, y, z);
  }
  endShape(LINES);
}

function bumpySphere() {
  for(let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
    beginShape(POINTS);
    for(let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
      let x = r * (1+0.2*sin(theta*6)*tan(phi*5)) * cos(phi);
      let y = r * (1+0.2*sin(theta*6)*tan(phi*5)) * sin(phi) * sin(theta);
      let z = r * (1+0.2*sin(theta*6)*tan(phi*5)) * sin(phi) * cos(theta);
      vertex(x, y, z);
    }
    endShape();
  }
}