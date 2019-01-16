// https://www.youtube.com/watch?v=D9BoBSkLvFo

let mobilenet;
let video;
let label = "";

function modelReady() {
  console.log("Model is ready.");
  mobilenet.predict(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    label = results[0].className;
    mobilenet.predict(gotResults);
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480); // https://p5js.org/examples/dom-video-capture.html
  video.hide();
  background(0);
  mobilenet = ml5.imageClassifier("MobileNet", video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
