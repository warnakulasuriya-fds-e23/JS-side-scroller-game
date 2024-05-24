class Layer {
  constructor(game, layerWidth, layerHeight, speedModifier, layerImage) {
    this.game = game;
    this.layerWidth = layerWidth;
    this.layerHeight = layerHeight;
    this.speedModifier = speedModifier;
    this.layerImage = layerImage;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.layerWidth) this.x = 0;
    else
      this.x -=
        this.game.maxSpeed * this.game.speedFraction * this.speedModifier;
  }
  draw(context) {
    //here we will be drawing the layer image twice to make things seamless
    //note that second drawing of the layer will never be fully viewed, this.x resets to zero before it can
    context.drawImage(
      this.layerImage,
      this.x,
      this.y,
      this.layerWidth,
      this.layerHeight
    );

    context.drawImage(
      this.layerImage,
      this.x + this.layerWidth,
      this.y,
      this.layerWidth,
      this.layerHeight
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1image = document.getElementById("layer1");
    this.layer2image = document.getElementById("layer2");
    this.layer3image = document.getElementById("layer3");
    this.layer4image = document.getElementById("layer4");
    this.layer5image = document.getElementById("layer5");

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer5image
    );

    this.BackgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.BackgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.BackgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
