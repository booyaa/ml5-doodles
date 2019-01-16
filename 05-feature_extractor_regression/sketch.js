// https://youtu.be/aKgq0m1YjvQ (code)

let mobilenet;
let predictor;
let video;
let value = 0;
let slider;
let addButton;
let trainButton;

function modelReady() {
  console.log("Model is ready.");
}

function videoReady() {
  console.log("Video is ready.");
}

function whileTraining(loss) {
  if (loss == null) {
    console.log("Training complete");
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    value = results;
    predictor.predict(gotResults);
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480); // https://p5js.org/examples/dom-video-capture.html
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor("MobileNet", modelReady); // https://ml5js.org/docs/FeatureExtractor
  predictor = mobilenet.regression(video, videoReady);

  slider = createSlider(0, 1, 0.5, 0.01);

  addButton = createButton("add example image");
  addButton.mousePressed(function() {
    predictor.addImage(slider.value());
    console.log(`training image for value ${slider.value()}`);
  });

  trainButton = createButton("train");
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  rectMode(CENTER);
  fill(255, 0, 200);
  rect(value * width, height / 2, 50, 50);

  // for text bar
  fill(255);
  textSize(32);
  text(value, 10, height - 20);
}
