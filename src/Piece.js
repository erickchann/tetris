class Piece {
    constructor() {
        this.y = 0;
        this.x = ~~(cols / 2) - 1;

        this.shape = shapes[~~(Math.random() * shapes.length)];
    }

    draw() {
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x] > 0) {
                    let x2 = this.x + x;
                    let y2 = this.y + y;

                    ctx.fillStyle = colors[this.shape[y][x]];
                    ctx.fillRect(x2 * size, y2 * size, size - 1, size - 1);
                }
            }
        }
    }
}