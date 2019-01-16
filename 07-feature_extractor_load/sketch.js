// https://youtu.be/eU7gIy3xV30 (code)

let mobilenet;
let classifier;
let video;
let label = "loading model...";

function modelReady() {
  console.log("Model is ready.");
  classifier.load("./model.json", customModelReady);
}

function customModelReady() {
  console.log("Custom Model is ready");
  label = 'model ready';
  classifier.classify(gotResults);
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

}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
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
