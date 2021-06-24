'use strict';

const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');

const highScore = document.createElement('div');
highScore.classList.add('highScore');
gameArea.classList.add('hide');


const car = document.createElement('div');

const difficultyMenu = document.querySelector('.difMenu');

const difficulty = document.querySelectorAll('.difficulty');
difficulty[0].addEventListener("click", () => {settings.speed = 2;});
difficulty[1].addEventListener("click", () => {settings.speed = 5;});
difficulty[2].addEventListener("click", () => {settings.speed = 8;});

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
    highScore: 0,
};

const MAX_ENEMIES = 7;

/*FUNCTIONS */
function startGame() {
    start.classList.add('hide');
    difficultyMenu.classList.add('hide');

    gameArea.innerHTML = '';
    
    //music.play();

    gameArea.classList.remove('hide');

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

    settings.score = 0;

    gameArea.appendChild(car);

    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + 'px';
    car.style.top = 'auto';
    car.style.bottom = '10px';

    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;

    requestAnimationFrame(playGame);
}

function playGame() {
    
    if(settings.start){
        
        settings.score += settings.speed;
        score.innerHTML = 'SCORE ' + settings.score;

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

        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom &&
           carRect.right >= enemyRect.left &&
           carRect.left <= enemyRect.right &&
           carRect.bottom >= enemyRect.top) {
            
            settings.start = false;
            
            start.classList.remove('hide');
            difficultyMenu.classList.remove('hide');
            start.style.top = score.offsetHeight + 'px';
            difficultyMenu.style.paddingTop = start.offsetHeight + score.offsetHeight + 'px';

            if(settings.highScore <= settings.score) { 
                settings.highScore = settings.score;
                 
            }
            gameArea.insertAdjacentElement("afterend", highScore);
            
            highScore.innerHTML = "HIGHSCORE: " + settings.highScore;
            
        }

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