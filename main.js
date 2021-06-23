'use strict';

const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');

const music = new Audio('./audio/Valim.mp3');

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
    speed: 6,
    traffic: 3,
};

const MAX_ENEMIES = 7;

/*FUNCTIONS */
function startGame() {
    start.classList.add('hide');

    music.play();


    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100) + 'px';

        line.y = i*100;

        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);

        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `
        transparent 
        url(\'../images/enemy${getRandomEnemy(MAX_ENEMIES)}.png\') 
        center / cover 
        no-repeat`;

        gameArea.appendChild(enemy);
    }

    settings.start = true;

    gameArea.appendChild(car);

    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;

    requestAnimationFrame(playGame);
}

function playGame() {
    
    if(settings.start){
        
        moveRoad();
        moveEnemy();

        //Movement catch
        if(keys.ArrowLeft && settings.x > 0){
            settings.x -= settings.speed;
        }
        if(keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)){
            settings.x += settings.speed;
        }
        if(keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
            settings.y += settings.speed;
        }
        if(keys.ArrowUp && settings.y > 0){
            settings.y -= settings.speed;
        }

        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';

        requestAnimationFrame(playGame);
    }
}

function startRun(event){
    if(keys.hasOwnProperty(event.key)){
        event.preventDefault();
        keys[event.key] = true;
    }
}

function stopRun(event){
    
    if(keys.hasOwnProperty(event.key)){
        event.preventDefault();
        keys[event.key] = false;
    }
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += settings.speed;
        line.style.top = line.y + 'px';

        if(line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy(){
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(enemy){
        enemy.y += settings.speed / 1.5;
        enemy.style.top = enemy.y + 'px';

        if(enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * settings.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

const getRandomEnemy = (max) => Math.floor(Math.random() * max + 1);