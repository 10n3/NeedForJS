'use strict';

const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');

car.classList.add('car');

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

start.addEventListener('click', startGame);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    
};

const settings = {
    start: false,
    score: 0,
    speed: 3,
};

/*FUNCTIONS */
function startGame() {
    start.classList.add('hide');
    settings.start = true;

    gameArea.appendChild(car);

    requestAnimationFrame(playGame);
}

function playGame() {
    console.log('Play Game!');
    
    if(settings.start){
        requestAnimationFrame(playGame);
    }
}

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}