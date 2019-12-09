var types = {}

types["P"] = [[1, 1],
              [1, 1],
              [1, 0]]

class Pentomino {
    constructor(type, color) {
        this.type = types[type]
        this.color = color
    }
}
