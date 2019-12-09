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
    let colors = [new Sprite(resources["assets/black.png"].texture),
                  new Sprite(resources["assets/dark_blue.png"].texture),
                  new Sprite(resources["assets/real_black.png"].texture),
                  new Sprite(resources["assets/white.png"].texture)];
    
    app.ticker.add(delta => gameLoop(delta));
    app.stage.addChild(colors[0])
}

function gameLoop(delta) {
    // do nothing
    colors[0].x += 1;
}
