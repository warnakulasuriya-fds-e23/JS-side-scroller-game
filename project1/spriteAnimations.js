/* WHAT THIS JS module is used for 
For this project a sprite sheet will be used to get the sprites for the game
the sprite sheet is in Assets\Images\SpriteSheet\shadow_dog.png
if you look at the image you can notice that the sprites are aranged in a particular manner
12 columns and 10 rows to be exact
each row represents a differnt state like run, jump or idle
for a single row every column would represent a single frame of that animation
for example the sprites along the run column (row index 3, assuming zero indexing) would be each
frame of the run animation

so when quickly going through each sprite it would look like the character is actually running

to do that it is necessary to get to know the locations of each sprite,
consider that each sprite is drawn on a square of width spriteWidth and height spriteHeight,
like a sprite box
to know the "location of a sprite" it would be enough to know the coordinates of the
top left corner of the sprit box.
once we know that and since we know the dimensions of each spritebox (width & height)
we can render each sprite and cycle through them to do the animation*/

const spriteWidth = 575; // should be 6876 / 12, extra width was kept because margin
const spriteHeight = 523; //shuold be 5230 / 10;
const spriteAnimations = [];
const AllPossibleAnimationStates = [
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

//the following for each loop will calculate the necessary x and y positions for each sprite frame
AllPossibleAnimationStates.forEach((state, index) => {
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
