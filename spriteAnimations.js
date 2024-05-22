const spriteWidth = 575; // should be 6876 / 12, extra width was kept because margin
const spriteHeight = 523; //shuold be 5230 / 10;
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

export { spriteAnimations, spriteWidth, spriteHeight };
