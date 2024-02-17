const density = "Ñ@#W$9876543210?!abc;:+=-,._          ";
let video;
let asciiDiv;

function setup() {
  noCanvas();
  const container = createDiv("").id("container"); // Container for ASCII and messages
  video = createCapture(VIDEO);
  video.size(64, 48);
  video.hide(); // Hide the actual video element

  const titleDiv = createDiv("Portrait of a Slay Queen").parent(container);
  titleDiv.id("title");

  asciiDiv = createDiv("").parent(container);
  asciiDiv.id("ascii");

  const messageDiv = createDiv("Happy Birthday, Dral! 🎉").parent(container);
  messageDiv.id("message");
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      asciiImage += c == " " ? "&nbsp;" : c;
    }
    asciiImage += "<br/>";
  }
  asciiDiv.html(asciiImage);
}
