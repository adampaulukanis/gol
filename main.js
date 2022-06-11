'use strict';

var size = 80;
var htmlElements;
var counterElement = document.querySelector('#counter');
var count = 0;
var cells;
var EMPTY = 0;
var ALIVE = 1;

function createField() {
    htmlElements = [];
    cells = [];
    var table = document.querySelector('#field');
    for (var y = 0; y < size; y++) {
        var tr = document.createElement('tr');
        var tdElements = [];
        cells.push(new Array(size).fill(EMPTY));
        htmlElements.push(tdElements);
        table.appendChild(tr);
        for (var x = 0; x < size; x++) {
            var td = document.createElement('td');
            tdElements.push(td);
            tr.appendChild(td);
        }
    }
}

function draw() {
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == ALIVE ? 'filled' : 'empty'));
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
    createField();
    populateField();
    draw();
    // setInterval(newGeneration, 10);
}

init();
requestAnimationFrame(newGeneration);
