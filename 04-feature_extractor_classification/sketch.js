// https://youtu.be/kRpZ5OqUY6Y (theory)
// https://youtu.be/eeO-rWYFuG0 (code)
// hhttp://ml4a.github.io/demos/tfjs/ (nice examples)
// https://ml5js.org/docs/FeatureExtractor (API)

let mobilenet;
let video;
let label = "";
let classifier;
let baselineButton;
let cupButton;
let bookButton;
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
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results)
    label = results;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480); // https://p5js.org/examples/dom-video-capture.html
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor("MobileNet", modelReady); // https://ml5js.org/docs/FeatureExtractor
  classifier = mobilenet.classification(video, videoReady);

  baselineButton = createButton("baseline");
  baselineButton.mousePressed(function() {
    classifier.addImage("");
    console.log("trained on image as baseline");
  });

  cupButton = createButton("cup");
  cupButton.mousePressed(function() {
    classifier.addImage("cup");
    console.log("trained on image as cup");
  });

  bookButton = createButton("book");
  bookButton.mousePressed(function() {
    classifier.addImage("book");
    console.log("trained on image as book");
  });

  trainButton = createButton("train");
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
