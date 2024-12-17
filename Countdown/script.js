// Get references to HTML elements
const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const pauseResumeButton = document.getElementById('pauseResumeButton');
const messageElement = document.getElementById('message');
const customTimeInput = document.getElementById('customTime');

let countdownTime = 10; // Default countdown time (in seconds)
let countdownInterval;
let isPaused = false;
let remainingTime;

// Function to start the countdown
function startCountdown() {
    // Get the custom time if provided, otherwise use default
    const customTime = parseInt(customTimeInput.value);
    if (!isNaN(customTime) && customTime > 0) {
        countdownTime = customTime;
    }
    
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
        }
    }, 1000);
    
    // Disable the start button and enable pause/resume button
    startButton.disabled = true;
    pauseResumeButton.disabled = false;
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

// Event listeners
startButton.addEventListener('click', startCountdown);
pauseResumeButton.addEventListener('click', pauseResumeCountdown);
