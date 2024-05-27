// script.js

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

// Function to update the stopwatch display
function updateDisplay() {
    const time = elapsedTime + (isRunning ? Date.now() - startTime : 0);
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Function to update the list of lap times
function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        const hours = Math.floor(lap / 3600000);
        const minutes = Math.floor((lap % 3600000) / 60000);
        const seconds = Math.floor((lap % 60000) / 1000);
        li.textContent = `Lap ${index + 1}: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        lapsList.appendChild(li);
    });
}

// Helper function to pad numbers with leading zeros
function pad(number) {
    return number.toString().padStart(2, '0');
}

// Event listener for the start/stop button
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 100);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
    updateDisplay();
});

// Event listener for the reset button
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    updateLaps();
    startStopBtn.textContent = 'Start';
});

// Event listener for the lap button
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = elapsedTime + (Date.now() - startTime);
        laps.push(lapTime);
        updateLaps();
    }
});

// Initialize the display
updateDisplay();
