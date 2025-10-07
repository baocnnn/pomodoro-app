const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('#pauseBtn');
const restartBtn = document.querySelector('#restartBtn');
const session = document.querySelector('.minutes');
let myInterval;
let state = false;
let isPaused = false;
let totalSeconds;
let initialMinutes = 25;

const appTimer = () => {
        if(state) {
            alert("session has already started!");
            return;
        }    

        if(!isPaused) {
            const sessionAmount = Number.parseInt(session.textContent);
            totalSeconds = sessionAmount * 60; 
            initialMinutes = sessionAmount;
        }

        state = true;
        isPaused = false;

        const updateSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds/60);
        let secondsLeft = totalSeconds % 60;

        if(secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else{
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`;

        if(minutesLeft === 0 && secondsLeft === 0) {
            bells.play();
            clearInterval(myInterval);
            state = false;
        }
        }
        myInterval = setInterval(updateSeconds, 1000);
    
    }

const pauseTimer = () => {
    clearInterval(myInterval);
    state = false;
    isPaused = true;
}

const restartTimer = () => {
    clearInterval(myInterval);
    state = false;

    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');
    minuteDiv.textContent = initialMinutes;
    secondDiv.textContent = '00';

    totalSeconds = initialMinutes * 60;
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
restartBtn.addEventListener('click', restartTimer);