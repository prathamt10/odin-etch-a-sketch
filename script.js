const DIMENSION = 960;
let isMouseHolding = false;

function startDraw(square) {
    isMouseHolding = true;
    draw(square)
}

function endDraw(square) {
    draw(square);
    isMouseHolding = false;
}

function draw(square) {
    if (!isMouseHolding) {
        return;
    }
    square.classList.add('selected');
}

function createSquares(count) {
    const size = DIMENSION / count;
    for (let i = 0; i < count; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < count; j++) {
            const square = document.createElement('div');
            square.style.boxSizing = 'border-box';
            square.style.width = `${size}px`;
            square.style.height = `${size}px`;
            square.style.border = '1px solid black';
            square.addEventListener('mousedown', (e) => { startDraw(e.target) });
            square.addEventListener('mousemove', (e) => { draw(e.target) });
            square.addEventListener('mouseup', (e) => { endDraw(e.target) });
            row.appendChild(square);
        }
        sketchpad.appendChild(row);
    }
}

const sketchpad = document.querySelector(".sketchpad");
createSquares(32);