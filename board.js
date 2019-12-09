class Board {
  constructor(h, w) {
    this.board = [];
    this.h = h;
    this.w = w;
    this.clearBoard();
  }

  clearBoard() {
    this.board = [];
    for (var i = 0; i < this.h; i++) {
      this.board[i] = [];
      for (var j = 0; j < this.w; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  placePentomino(p) {
    for (let i = 0; i < p.shape.length; i++) {
      for (let j = 0; j < p.shape[i].length; j++) {
        if (p.shape[i][j] == 0) {
          continue;
        }
        this.board[i + p.y][j + p.x] = p.color;
      }
    }
  }

  collides(p) {
    for (let i = 0; i < p.shape.length; i++) {
      for (let j = 0; j < p.shape[i].length; j++) {
        if (p.shape[i][j] == 0) {
          continue;
        }
        let xPos = j + p.x;
        let yPos = i + p.y;

        if (xPos >= this.w || yPos >= this.h || this.board[yPos][xPos] != 0) {
          return true;
        }
      }
    }
    return false;
  }

  clearLines() {
    let linesToClear = [];
    for (let i = 0; i < this.board; i++) {
      let full = true;
      for (let j = 0; j < this.board[i]; j++) {
        if (this.board[i][j] == 0) {
          full = false;
          break;
        }
      }
      if (full) {
        linesToClear.push(i);
      }
    }

    linesToClear.forEach(function(l) {
        for (let i = l; i > 0; i--) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = this.board[i-1][j];
            }
        }
    });

    return linesToClear.length;
  }
}
