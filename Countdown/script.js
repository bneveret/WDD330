// Get references to HTML elements
const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const resetButton = document.getElementById('resetButton');
const messageElement = document.getElementById('message');
const customTimeInput = document.getElementById('customTime');

let countdownTime = 10; // Default countdown time (in seconds)
let countdownInterval;
let isPaused = false;
let remainingTime;
let initialTime;

// Function to start the countdown
function startCountdown() {
    // Get the custom time if provided, otherwise use default
    const customTime = parseInt(customTimeInput.value);
    if (!isNaN(customTime) && customTime > 0) {
        countdownTime = customTime;
    }
    
    initialTime = countdownTime; // Store the initial time for reset
    remainingTime = countdownTime;
    countdownElement.textContent = remainingTime;
    messageElement.textContent = '';
    
    // Start the countdown
    countdownInterval = setInterval(function () {
        remainingTime--;
        countdownElement.textContent = remainingTime;
        
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            messageElement.textContent = "Time's up!";
            pauseResumeButton.disabled = true;
            resetButton.disabled = false;
        }
    }, 1000);
    
    // Disable the start button and enable pause/resume and reset buttons
    startButton.disabled = true;
    pauseResumeButton.disabled = false;
    resetButton.disabled = false;
}

// Function to pause/resume the countdown
function pauseResumeCountdown() {
    if (isPaused) {
        // Resume the countdown
        countdownInterval = setInterval(function () {
            remainingTime--;
            countdownElement.textContent = remainingTime;
            
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                messageElement.textContent = "Time's up!";
                pauseResumeButton.disabled = true;
                resetButton.disabled = false;
            }
        }, 1000);
        pauseResumeButton.textContent = "Pause";
    } else {
        // Pause the countdown
        clearInterval(countdownInterval);
        pauseResumeButton.textContent = "Resume";
    }
    
    isPaused = !isPaused;
}

// Function to reset the countdown
function resetCountdown() {
    clearInterval(countdownInterval); // Stop the current countdown
    remainingTime = initialTime; // Reset to the initial time
    countdownElement.textContent = remainingTime;
    messageElement.textContent = ''; // Clear any messages
    startButton.disabled = false; // Enable the start button
    pauseResumeButton.disabled = true; // Disable the pause/resume button
    resetButton.disabled = true; // Disable the reset button
    pauseResumeButton.textContent = "Pause";
    isPaused = false;
}

// Event listeners
startButton.addEventListener('click', startCountdown);
pauseResumeButton.addEventListener('click', pauseResumeCountdown);
resetButton.addEventListener('click', resetCountdown);
