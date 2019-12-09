let appWidth = 420;
let appHeight = 600;
let boardWidth = 5;
let boardHeight = 15;
let squareSize = 40;
let Application = PIXI.Application,
  loader = PIXI.Loader.shared,
  resources = PIXI.Loader.shared.resources,
  Sprite = PIXI.Sprite;

let app = new Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);
loader
  .add("assets/real_black.png")
  .add("assets/black.png")
  .add("assets/dark_blue.png")
  .add("assets/white.png")
  .load(setup);

let colors;
let board;
let ticks;
let left, up, right, down;
let pentomino, queuedPentomino;
let blocks;

function setup() {
  // set up blocks
  colors = [
    resources["assets/real_black.png"].texture,
    resources["assets/black.png"].texture,
    resources["assets/dark_blue.png"].texture,
    resources["assets/white.png"].texture
  ];

  blocks = [];

  //keyboard listeners
  left = keyboard("ArrowLeft");
  up = keyboard("ArrowUp");
  right = keyboard("ArrowRight");
  down = keyboard("ArrowDown");

  //pentominos
  pentomino = new Pentomino(pickRandomType(), pickRandomColor());
  queuedPentomino = new Pentomino(pickRandomType(), pickRandomColor());

  ticks = 0;
  board = new Board(boardHeight, boardWidth);
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  ++ticks;
  let update = false;
  if (ticks == 45) {
    pentomino.y += 1;
    update = true;
    if (board.collides(pentomino)) {
      //board.placePentomino(pentomino);
      pentomino = queuedPentomino;
      queuedPentomino = new Pentomino(pickRandomType(), pickRandomColor());
    }
  } else if (ticks == 60) {
    ticks = 0;
  }

  if (left.isDown) {
    pentomino.x -= 1;
    if (board.collides(pentomino)) {
      pentomino.x += 1;
    } else {
      update = true;
    }
  } else if (right.isDown) {
    pentomino.X += 1;
    if (board.collides(pentomino)) {
      pentomino.x -= 1;
    } else {
      update = true;
    }
  } else if (up.isDown) {
    pentomino.rotate();
    if (board.collides(pentomino)) {
      //hahahahahahahaha
      pentomino.rotate();
      pentomino.rotate();
      pentomino.rotate();
    } else {
      update = true;
    }
  }

  if (update) {
    render();
  }
}

function renderBoard() {
  let b = board.board;
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < b[i].length; j++) {
      let block = new Sprite(colors[b[i][j]]);
      block.width = squareSize;
      block.height = squareSize;
      block.x = j * block.width;
      block.y = i * block.height;
      app.stage.addChild(block);
      blocks.push(block);
    }
  }
}

function renderPentomino(p) {
  for (let i = 0; i < p.shape.length; i++) {
    for (let j = 0; j < p.shape[i].length; j++) {
      if (p.shape[i][j] != 0) {
        let block = new Sprite(colors[p.color]);
        block.width = squareSize;
        block.height = squareSize;
        block.x = (j + p.x) * block.width;
        block.y = (i + p.y) * block.height;
        app.stage.addChild(block);
        blocks.push(block);
      }
    }
  }
}

function render() {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].visible = false;
    app.stage.removeChild(blocks[i]);
  }
  blocks = [];
  renderBoard();
  renderPentomino(pentomino);
}
