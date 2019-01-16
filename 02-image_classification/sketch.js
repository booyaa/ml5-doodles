// https://www.youtube.com/watch?v=yNkAuWz5lnY

let mobilenet;
let sample_image;

function modelReady() {
  console.log("Model is ready.");
  mobilenet.predict(sample_image, gotResults); // https://ml5js.org/docs/ImageClassifier
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].className;
    let probability = results[0].probability;

    console.log(
      `I think this is ${label} with a confidence of ${probability * 100}%`
    );
    fill(0);
    textSize(64);
    text(label, 10, height - 100);
    createP(label);
    createP(probability);
  }
}

function imageReady() {
  image(sample_image, 0, 0, width, height);
}
function setup() {
  createCanvas(640, 480);
  sample_image = createImg("images/penguin copy.jpg", imageReady);
  sample_image.hide();
  background(0);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}
