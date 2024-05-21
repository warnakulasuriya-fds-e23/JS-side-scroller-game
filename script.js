let playerState = "idle";
const selection = document.getElementById("animations");
selection.addEventListener("change", (event) => {
  console.log("changeDetected");
  playerState = event.target.value;
});
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "Assets/Images/SpriteSheet/shadow_dog.png";
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
const spriteWidth = 575; // should be 6876 / 12, extra width was kept because margin
const spriteHeight = 523; //shuold be 5230 / 10;

let gameframes = 0;
const staggerFrame = 5;
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },

  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },

  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationStates.forEach((state, index) => {
  let frameCollection = {
    location: [],
  };

  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frameCollection.location.push({ X: positionX, Y: positionY });
  }
  spriteAnimations[state.name] = frameCollection;
});
console.log(spriteAnimations);
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameframes / staggerFrame) %
    spriteAnimations[playerState].location.length;
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
  requestAnimationFrame(animate);
}

animate();
