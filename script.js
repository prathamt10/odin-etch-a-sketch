const DIMENSION = 768;
let isMouseButtonPressed = false;
let draw_color = 'black';
let isRandomizerOn = false;
let isShaderOn = false;
let isEraserOn = false;
let square_opacities = new Map();

function startDraw(square) {
    isMouseButtonPressed = true;
    draw(square)
}

function endDraw(square) {
    draw(square);
    isMouseButtonPressed = false;
}

function getRandomRGB() {
    return Math.floor(Math.random() * 256);
}

function draw(square) {
    if (!isMouseButtonPressed) {
        return;
    }
    if (isRandomizerOn) {
        draw_color = `rgb(${getRandomRGB()},${getRandomRGB()},${getRandomRGB()})`;
    }
    
    square.style.backgroundColor = draw_color;

    if (isShaderOn) {
        let opacity = square_opacities.get(square);
        if (opacity < 1) {
            opacity += 0.1
            square.style.opacity = `${opacity}`;
            square_opacities.set(square, opacity);
        }
    }
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
            
            square_opacities.set(square, 0.1);

            square.addEventListener('mousedown', (e) => { startDraw(e.target) });
            square.addEventListener('mouseenter', (e) => { draw(e.target) });
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
        square.style.border = '1px solid black';
        square.style.opacity = 1;
    })

    square_opacities.clear();

    if (isRandomizerOn) {
        randomize_button.click();
    }
    if (isShaderOn) {
        shading_button.click();
    }
});

const grid_size = document.querySelector('#sizes');
grid_size.addEventListener('change', (e) => {
    sketchpad.innerHTML = "";
    createSquares(parseInt(e.target.value));
});

const randomize_button = document.querySelector('.randomize');
randomize_button.addEventListener('click', () => {
    if (!isRandomizerOn) {
        isRandomizerOn = true;
        randomize_button.textContent = 'Off';

        if (isEraserOn) {
            eraser_button.click();
        }
    } else {
        isRandomizerOn = false;
        draw_color = 'black';
        randomize_button.textContent = 'On';
    }
});

const shading_button = document.querySelector(".shading");
shading_button.addEventListener('click', () => {
    if (!isShaderOn) {
        isShaderOn = true;
        shading_button.textContent = 'Off';

        if (isEraserOn) {
            eraser_button.click();
        }
    } else {
        isShaderOn = false;
        shading_button.textContent = 'On';
    }
});

const eraser_button = document.querySelector(".eraser");
eraser_button.addEventListener('click', () => {
    if (!isEraserOn) {
        isEraserOn = true;
        draw_color = 'white';
        eraser_button.textContent = 'Off';

        if (isRandomizerOn) {
            randomize_button.click();
        }
        if (isShaderOn) {
            shading_button.click();
        }
    } else {
        isEraserOn = false;
        draw_color = 'black';
        eraser_button.textContent = 'On';
    }
})