let appWidth = 420;
let appHeight = 600;
let boardWidth = 5;
let boardHeight = 15;
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

let app = new Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);
loader
  .add("assets/black.png")
  .add("assets/dark_blue.png")
  .add("assets/real_black.png")
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
    resources["assets/black.png"].texture,
    resources["assets/dark_blue.png"].texture,
    resources["assets/real_black.png"].texture,
    resources["assets/white.png"].texture
  ];

  blocks = [];

  //keyboard listeners
  (left = keyboard("ArrowLeft")),
    (up = keyboard("ArrowUp")),
    (right = keyboard("ArrowRight")),
    (down = keyboard("ArrowDown"));

  //pentominos
  pentomino = new Pentomino(pickRandomType(), pickRandomColor());
  queuedPentomino = new Pentomino(pickRandomType(), pickRandomColor());

  ticks = 0;
  board = new Board(boardHeight, boardWidth);
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  ++ticks;
  if (ticks == 45) {
    pentomino.y += 1;
    if (board.collides(pentomino)) {
      board.placePentomino(pentomino);
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
    }
  } else if (right.isDown) {
    pentomino.X += 1;
    if (board.collides(pentomino)) {
      pentomino.x -= 1;
    }
  } else if (up.isDown) {
    pentomino.rotate();
    if (board.collides(pentomino)) {
      //hahahahahahahaha
      pentomino.rotate();
      pentomino.rotate();
      pentomino.rotate();
    }
  }

  render();
}

function render() {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].visible = false;
        app.stage.removeChild(blocks[i]);
    }
    blocks = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != 0) {
                let block = new Sprite(colors[board[i][j]]);
                block.width = 33;
                block.height = 33;
                block.x = j * (block.width);
                block.y = i * (block.height);
                app.stage.addChild(block);
                blocks.push(block);
            }
        }
    }
}
