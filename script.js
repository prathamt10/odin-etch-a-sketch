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
    square.style.backgroundColor = 'black';
}

function createSquares(count) {
    const size = DIMENSION / count;
    for (let i = 0; i < count; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < count; j++) {
            const square = document.createElement('div');
            square.className = 'squares';
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
createSquares(16);

const clear_button = document.querySelector(".clear");
clear_button.addEventListener('click', () => {
    const squares = document.querySelectorAll('.squares');
    squares.forEach((square) => {
        square.style.backgroundColor = 'white';
    })
});

const change_grid_size = document.querySelector('#sizes');
change_grid_size.addEventListener('change', (e) => {
    sketchpad.replaceChildren();
    createSquares(parseInt(e.target.value));
})