let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new Application({width: 420, height: 600});
document.body.appendChild(app.view);

loader
    .add("assets/black.png")
    .add("assets/dark_blue.png")
    .add("assets/real_black.png")
    .add("assets/white.png")
    .load(setup);

let colors;

function setup() {
    colors = [resources["assets/black.png"].texture,
              resources["assets/dark_blue.png"].texture,
              resources["assets/real_black.png"].texture,
              resources["assets/white.png"].texture];
    
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    
}
