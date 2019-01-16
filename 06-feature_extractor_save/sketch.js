// https://youtu.be/eU7gIy3xV30 (code)

let mobilenet;
let classifier;
let video;
let label = "needs to be trained";
let happyButton;
let sadButton;
let saveButton;
let trainButton;

function modelReady() {
  console.log("Model is ready.");
}

function videoReady() {
  console.log("Video is ready.");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480); // https://p5js.org/examples/dom-video-capture.html
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor("MobileNet", modelReady);
  classifier = mobilenet.classification(video, videoReady);

  happyButton = createButton("happy");
  happyButton.mousePressed(function() {
    classifier.addImage("happy");
    console.log("trained on image as happy");
  });

  sadButton = createButton("sad");
  sadButton.mousePressed(function() {
    classifier.addImage("sad");
    console.log("trained on image as sad");
  });

  trainButton = createButton("train");
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

  saveButton = createButton("save");
  saveButton.mousePressed(function() {
    classifier.save();
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
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
    label = results;
    classifier.classify(gotResults);

    console.log(results);
  }
}
