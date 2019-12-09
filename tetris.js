let appWidth = 420;
let appHeight = 600;
let boardWidth = 5;
let boardHeight = 15;
let squareSize = 40;
let tickTime = 45;

var db = firebase.firestore();

let Application = PIXI.Application,
  loader = PIXI.Loader.shared,
  resources = PIXI.Loader.shared.resources,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

let style = new TextStyle({
  fontSize: 20,
  fill: "white",
  fontFamily: "monospace"
});

let app = new Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);
loader
  .add("assets/real_black.png")
  .add("assets/black.png")
  .add("assets/dark_blue.png")
  .add("assets/white.png")
  .load(setup);

function resize() {
  renderer.view.style.position = "absolute";
  renderer.view.style.left = ((window.innerWidth - renderer.width) >> 1) + "px";
  renderer.view.style.top =
    ((window.innerHeight - renderer.height) >> 1) + "px";
}
resize();
window.addEventListener("resize", resize);

let colors;
let board;
let ticks;
let left, up, right, down;
let pentomino, queuedPentomino;
let blocks;
let update;
let score;
let scoreText;
let actions;

function setup() {
  // set up blocks
  colors = [
    resources["assets/real_black.png"].texture,
    resources["assets/black.png"].texture,
    resources["assets/dark_blue.png"].texture,
    resources["assets/white.png"].texture
  ];

  blocks = [];

  score = 0;

  //pentominos and board
  pentomino = new Pentomino(pickRandomType(), pickRandomColor());
  queuedPentomino = new Pentomino(pickRandomType(), pickRandomColor());
  queuedPentomino.x = 7;
  queuedPentomino.y = 1;
  board = new Board(boardHeight, boardWidth);

  scoreText = new Text(score, style);
  app.stage.addChild(scoreText);
  scoreText.position.set(300, 420);

  actions = 0;

  ticks = 0;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  ++ticks;
  if (ticks >= tickTime) {
    ticks = 0;
    pentomino.y += 1;
    update = true;
    if (board.collides(pentomino)) {
      pentomino.y -= 1;
      board.placePentomino(pentomino);
      score += board.clearLines();
      scoreText.text = score;
      pentomino = queuedPentomino;
      pentomino.x = 0;
      pentomino.y = 0;

      if (board.collides(pentomino)) {
        //game over

        postScore(score, actions);

        score = 0;
        actions = 0;
        scoreText.text = score;
        board.clearBoard();
      }

      queuedPentomino = new Pentomino(pickRandomType(), pickRandomColor());
      queuedPentomino.x = 7;
      queuedPentomino.y = 1;
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
  update = false;
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].visible = false;
    app.stage.removeChild(blocks[i]);
  }
  blocks = [];
  renderBoard();
  renderPentomino(pentomino);
  renderPentomino(queuedPentomino);
}

document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37) {
    ++actions;
    pentomino.x -= 1;
    if (board.collides(pentomino)) {
      pentomino.x += 1;
    } else {
      update = true;
    }
  } else if (event.keyCode == 38) {
    ++actions;
    pentomino.rotate();
    let origX = pentomino.x;
    while (pentomino.x >= 0) {
      if (!board.collides(pentomino)) {
        update = true;
        return;
      }
      pentomino.x -= 1;
    }
    pentomino.x = origX;
    //jahaahaha
    pentomino.rotate();
    pentomino.rotate();
    pentomino.rotate();
  } else if (event.keyCode == 39) {
    ++actions;
    pentomino.x += 1;
    if (board.collides(pentomino)) {
      pentomino.x -= 1;
    } else {
      update = true;
    }
  } else if (event.keyCode == 40) {
    tickTime = 10;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 40) {
    tickTime = 45;
  }
});

function postScore(s, a) {
  db.collection("scores")
    .add({
      actions: a,
      score: s,
      date: Date.now()
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
