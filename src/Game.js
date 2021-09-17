class Game {
    constructor() {
        this.gameover = false;
        
        this.grid = [];
        this.piece = null;

        this.score = 0;

        this.init();
    }

    init() {
        this.generateGrid();
        this.generatePiece();

        this.update();
        this.listener();
    }

    generateGrid() {
        for (let i = 0; i < rows; i++) {
            this.grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }

    generatePiece() {
        if (this.gameover) return;

        this.piece = new Piece();
    }

    update() {
        this.check();
        this.draw();
    }

    check() {
        this.grid.forEach((row, i) => {
            if (this.allFilled(row)) {
                this.grid.splice(i, 1);
                this.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

                this.score += 10;

                score.innerHTML = this.score;
            }
        });
    }

    draw() {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                ctx.fillStyle = colors[this.grid[y][x]];

                ctx.fillRect(x * size, y * size, size - 1, size - 1);
            }   
        }

        if (this.piece != null) this.piece.draw();
    }

    listener() {
        window.addEventListener('keydown', e => {
            switch(e.key) {
                case 'a':
                    this.move(-1)
                    break;
                case 'd':
                    this.move(1)
                    break;
                case 's':
                    this.moveDown();
                    break;
                case 'w':
                    this.rotate();
                    break;
            }
        });
    }

    moveDown() {
        if (this.piece == null) return;

        if (!this.colliding(this.piece.x, this.piece.y + 1)) {
            this.piece.y++;
        } else {
            let shape = this.piece.shape;

            for (let y = 0; y < shape.length; y++) {
                for (let x = 0; x < shape.length; x++) {
                    if (shape[y][x] > 0) {
                        let x2 = this.piece.x + x;
                        let y2 = this.piece.y + y;

                        this.grid[y2][x2] = shape[y][x]; 
                    }
                }   
            }

            // check gameover
            if (this.piece.y == 0) {
                this.gameover = true;
            }
            
            this.generatePiece();
        }

        this.update();
    }

    move(dir) {
        if (this.piece == null) return;

        if (!this.colliding(this.piece.x + dir, this.piece.y)) {
            this.piece.x += dir;
        }

        this.update();
    }

    rotate() {
        if (this.piece == null) return;

        let rotated = [];

        for (let i = 0; i < this.piece.shape.length; i++) {
            rotated.push(this.piece.shape.map(a => a[i]).reverse());
        }

        if (!this.colliding(this.piece.x, this.piece.y, rotated)) {
            this.piece.shape = rotated;
            this.update();
        }
    }

    allFilled(row) {
        for (let x of row) {
            if (x == 0) {
                return false;
            }
        }

        return true;
    }

    colliding(x, y, candidate = null) {
        let shape = candidate || this.piece.shape;

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] > 0) {
                    let x2 = x + j;
                    let y2 = y + i;

                    if (this.inBoard(x2, y2)) {
                        if (this.grid[y2][x2] > 0) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            }   
        }

        return false;
    }

    inBoard(x, y) {
        return x >= 0 && y >= 0 && x < cols && y < rows;
    }
}