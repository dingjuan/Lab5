// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
const canvas = document.getElementById('user-image');
const ctx = canvas.getContext('2d');
const imgInput = document.getElementById('image-input');
const generateForm = document.getElementById('generate-meme');
const submit = document.querySelector('button[type="submit"]');
const reset = document.querySelector('button[type="reset"]');
const button = document.querySelector('button[type="button"]');

const topText = document.getElementById('text-top');
const bottmText = document.getElementById('text-bottom');

// once user choose imgae from file update image src
imgInput.onchange = e =>  {
    img.src = URL.createObjectURL(e.target.files[0]);
    img.alt = imgInput.value.replace(/^.*[\\\/]/, ''); // path match cited from https://stackoverflow.com/questions/53908062/
};

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
      
      let cHeight = canvas.height; let cWidth = canvas.width;
      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.fillRect(0, 0, cWidth, cHeight);

      let frame = getDimmensions(canvas.width, canvas.height, img.width, img.height);
      let x = frame['startX']; let y = frame['startY'];
      let width = frame['width']; let height = frame['height'];
      ctx.drawImage(img, x, y, width, height);

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

// submit event

generateForm.addEventListener('submit', e => {
    e.preventDefault();

    submit.disabled = true;
    reset.disabled = false;
    button.disabled = false;
    
    ctx.font = '40px serif';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(topText.value, canvas.width/2, 40);
    ctx.fillText(bottmText.value, canvas.width/2, canvas.height-20);
});

reset.addEventListener('click', e => {
  // toggle buttons
   submit.disabled = false;
   reset.disabled = true;
   button.disabled = true;

  // cleat texts
  topText.value = "";
  bottmText.value = "";

   // clear canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   imgInput.value = "";
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
