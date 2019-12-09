let types = {};

types["P"] = [
  [1, 1],
  [1, 1],
  [1, 0]
];

types["F"] = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 1, 0]
];

function pickRandomType() {
  let keys = Object.keys(types);
  return keys[Math.floor(Math.random() * keys.length)];
}

function pickRandomColor() {
  return Math.floor(Math.random() * 4);
}

class Pentomino {
  constructor(type, color) {
    this.shape = types[type];
    this.color = color;
    this.x = 0;
    this.y = 0;
  }

  rotate() {
    var result = [];
    this.shape.forEach(function(a, i, aa) {
      a.forEach(function(b, j, bb) {
        result[bb.length - j - 1] = result[bb.length - j - 1] || [];
        result[bb.length - j - 1][i] = b;
      });
    });
    this.shape = result;
  }
}
