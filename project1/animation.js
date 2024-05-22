import {
  spriteAnimations,
  spriteWidth,
  spriteHeight,
} from "./spriteAnimations.js";

let playerState = "idle";
const selection = document.getElementById("animations");
selection.addEventListener("change", (event) => {
  playerState = event.target.value;
});

let RunAnimation = false;
const StopRunBtn = document.getElementById("stopRunButton");
StopRunBtn.addEventListener("click", () => {
  RunAnimation = !RunAnimation;
  if (RunAnimation) {
    animate();
  }
});

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "./../Assets/Images/SpriteSheet/shadow_dog.png";
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

let gameframes = 0;
const staggerFrame = 5;

//following is the animation function
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let totFramesForPlayerState = spriteAnimations[playerState].location.length;
  let position =
    Math.floor(gameframes / staggerFrame) % totFramesForPlayerState;
  let framex = spriteAnimations[playerState].location[position].X;
  let framey = spriteAnimations[playerState].location[position].Y;
  ctx.drawImage(
    image,
    framex,
    framey,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
  gameframes++;
  var animation = requestAnimationFrame(animate);
  if (!RunAnimation) window.cancelAnimationFrame(animation);
}
