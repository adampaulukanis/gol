'use strict';

let size = 100;
let counterElement = document.querySelector('#counter');
let count = 0;
let cells = [];
const EMPTY = 0;
const ALIVE = 1;
const sxy = 5;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = size * sxy; // window.innerWidth;
const height = canvas.height = size * sxy; // window.innerHeight;

function createArray() {
    for (var y = 0; y < size; y++) {
        cells.push(new Array(size).fill(EMPTY));
    }
}

function draw() {
    function black() {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * sxy, y * sxy, size, size);
    }
    function white() {
        ctx.fillStyle = 'white';
        ctx.fillRect(x * sxy, y * sxy, size, size);
    }
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            ctx.fillStyle = 'black';
            cells[y][x] == ALIVE ? black() : white();
        }
    }
}

function countNeibhours(x, y) {
    var count = 0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            var nx = (x + dx + size) % size;
            var ny = (y + dy + size) % size;
            count = count + cells[ny][nx];
        }
    }
    return count - cells[y][x];
}

function newGeneration() {
    var newCells = [];
    for (var i = 0; i < size; i++) {
        newCells.push(new Array(size).fill(EMPTY));
    }
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            var neibhours = countNeibhours(x, y);
            if (cells[y][x] == EMPTY && neibhours == 3) {
                newCells[y][x] = ALIVE;
            }
            if (cells[y][x] == ALIVE && (neibhours == 2 || neibhours == 3)) {
                newCells[y][x] = ALIVE;
            }
        }
    }
    cells = newCells;
    draw();
    counterElement.innerText = count++;
    requestAnimationFrame(newGeneration);
}

function populateField() {
    for (var i = 0; i < Math.floor(size * size * 0.5); i++) {
        var x, y;
        do {
            x = Math.floor(Math.random() * size),
            y = Math.floor(Math.random() * size);
            if (cells[y][x] == EMPTY) {
                cells[y][x] = ALIVE;
                break;
            }
        } while(true);
    }
}

function init() {
    createArray();
    populateField();
    draw();
}

init();
requestAnimationFrame(newGeneration);
