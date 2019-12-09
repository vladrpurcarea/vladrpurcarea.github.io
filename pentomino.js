let types = {};

types["P"] = [
  [1, 1],
  [1, 1],
  [1, 0]
];

types["Pf"] = [
  [1, 1],
  [1, 1],
  [0, 1]
];

types["F"] = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 1, 0]
];

types["Ff"] = [
  [1, 0, 0],
  [0, 0, 1],
  [0, 1, 0]
];

types["I"] = [[1], [1], [1], [1], [1]];

types["N"] = [
  [1, 1, 0, 0],
  [0, 1, 1, 1]
];

types["Nf"] = [
  [0, 0, 1, 1],
  [1, 1, 1, 0]
];

types["L"] = [
  [1, 1, 1, 1],
  [1, 0, 0, 0]
];

types["Lf"] = [
  [1, 1, 1, 1],
  [0, 0, 0, 1]
];

types["Y"] = [
  [0, 1],
  [1, 1],
  [0, 1],
  [0, 1]
];

types["Yf"] = [
  [1, 0],
  [1, 1],
  [1, 0],
  [1, 0]
];

types["T"] = [
  [1, 1, 1],
  [0, 1, 0],
  [0, 1, 0]
];

types["U"] = [
  [1, 0, 1],
  [1, 1, 1]
];

types["V"] = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 1]
];

types["W"] = [
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 1]
];

types["X"] = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0]
];

types["Z"] = [
  [1, 1, 0],
  [0, 1, 0],
  [0, 1, 1]
];

types["Zf"] = [
  [0, 1, 1],
  [0, 1, 0],
  [1, 1, 0]
];

function pickRandomType() {
  let keys = Object.keys(types);
  return keys[Math.floor(Math.random() * keys.length)];
}

function pickRandomColor() {
  return Math.floor(Math.floor(Math.random() * 3) + 1);
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
