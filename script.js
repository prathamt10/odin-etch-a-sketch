const DIMENSION = 960;

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
            row.appendChild(square);
        }
        sketchpad.appendChild(row);
    }
}

const sketchpad = document.querySelector(".sketchpad");
createSquares(16);