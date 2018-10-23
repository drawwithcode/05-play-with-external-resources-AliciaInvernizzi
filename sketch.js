var moonlight;
var sunlight;
var analyzer;

var imgMoon;


var xspacing = 5;     // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude;        // Height of wave
var period = 200.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;

function preload(){
  moonlight = loadSound("./assets/Moonlight.mp3");
  sunlight = loadSound("./assets/sunlight.mov");

  imgMoon = loadImage("./assets/moon.png");
  imgSun = loadImage("./assets/sunlight.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  analyzer = new p5.Amplitude();

  w = windowWidth;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));

  moonlight.loop();

}

function draw() {
  background(0,0,0);

  var volume = analyzer.getLevel();
  console.log(volume);
  volume = map(volume,0,1,50,width/4);

  if (moonlight.isPlaying()) {
    //shadow moon
    ellipseMode(CENTER);
    noStroke();
    fill(255,255,255,volume);
    ellipse(windowWidth/2,windowHeight-550,3*volume/2);

    //moon
    push();
    imageMode(CENTER);
    translate(windowWidth/2,windowHeight-550);
    rotate(volume/80);
    image(imgMoon,0,0,imgMoon.width/3,imgMoon.height/3);
    pop();

    if (keyIsPressed) {
      // mySong.pause();
      calcWaveNo();
      renderWave();
      moonlight.amp(0.05);
    } else {
      calcWave();
      renderWave();
      rectMode();
      moonlight.amp(1);
    }

    textAlign(CENTER);
    textFont('Poiret One');
    textSize(50);
    text('moonlight',windowWidth/2,520);

    textSize(17);
    text('click to change song',windowWidth/2,560);
    text('press anykey to reduce the amplitude',windowWidth/2,580);

  }

if (sunlight.isPlaying()) {
  //sun
  push();
  imageMode(CENTER);
  translate(windowWidth/2,windowHeight-550);
  rotate(volume/80);
  image(imgSun,0,0,imgSun.width/5,imgSun.height/5);
  pop();

  if (keyIsPressed) {
    // mySong.pause();
    calcWaveNo();
    renderWave();
    sunlight.amp(0.05);
  } else {
    calcWave();
    renderWave();
    rectMode();
    sunlight.amp(1);
  }

  textAlign(CENTER);
  textFont('Poiret One');
  textSize(50);
  text('sunlight',windowWidth/2,520);

  textSize(17);
  text('click to change song',windowWidth/2,560);
  text('press anykey to reduce the amplitude',windowWidth/2,580);

}


  //margin
  fill(0,0,0);
  rect(0,0,300,windowHeight);
  rect(windowWidth-300,0,windowWidth,windowHeight);

}

function mouseClicked(){
  if(moonlight.isPlaying()){
    moonlight.stop();
    sunlight.loop();
  } else if(sunlight.isPlaying()){
    moonlight.loop();
    sunlight.stop();
  }
}



function calcWave() {

  var volume = analyzer.getLevel();
  console.log(volume);
  volume = map(volume,0,1,50,width/2);

  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += volume/3;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*volume/3;
    x+=dx;
  }
}

function calcWaveNo() {

  var volume = analyzer.getLevel();
  console.log(volume);
  volume = map(volume,0,1,50,width/2);

  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.05;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*volume/100;
    x+=dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*xspacing, height/2+yvalues[x], 2);
  }
}
