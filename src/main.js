const score = document.querySelector('.score');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width;
const h = canvas.height;

const size = 30;

const cols = w / size;
const rows = h / size;

const shapes = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [2, 2],
        [2, 2]
    ],
    [
        [0, 3, 3],
        [3, 3, 0],
        [0, 0, 0]
    ],
    [
        [4, 4, 0],
        [0, 4, 4],
        [0, 0, 0]
    ],
    [
        [0, 5, 0],
        [5, 5, 5],
        [0, 0, 0],
    ],
    [
        [6, 0, 0],
        [6, 6, 6],
        [0, 0, 0],
    ],
    [
        [0, 0, 7],
        [7, 7, 7],
        [0, 0, 0],
    ]
];

const colors = [
    '#000000',
    '#00ddf8',
    '#faff00',
    '#f60000',
    '#69b625',
    '#9f0096',
    '#ff51bc',
    '#ff8d00'
];

let game;
let gameSpeed = 1000;

init();
function init() {
    game = new Game();

    main();
}

function main() {
    let gameInterval = setInterval(() => {
        if (!game.gameover) {
            game.moveDown();
        } else {
            clearInterval(gameInterval);

            alert('Game Over!');

            init();
        }
    }, gameSpeed);
}