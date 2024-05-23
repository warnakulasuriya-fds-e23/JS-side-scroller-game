const canvasProj2 = document.getElementById("project2Canvas");
const ctxProj2 = canvasProj2.getContext("2d");
const CANVAS2_WIDTH = (canvasProj2.width = 800);
const CANVAS2_HEIGHT = (canvasProj2.height = 700);
let gameSpeed = 5;

const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();

backgroundLayer1.src = "./../Assets/Images/backgroundLayers/layer-1.png";
backgroundLayer2.src = "./../Assets/Images/backgroundLayers/layer-2.png";
backgroundLayer3.src = "./../Assets/Images/backgroundLayers/layer-3.png";
backgroundLayer4.src = "./../Assets/Images/backgroundLayers/layer-4.png";
backgroundLayer5.src = "./../Assets/Images/backgroundLayers/layer-5.png";

function animateProj2() {
  ctxProj2.drawImage(backgroundLayer1, 0, 0);
  requestAnimationFrame(animateProj2);
}

animateProj2();
