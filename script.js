// Typing speed test script
const textArray = [
    "The quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "A journey of a thousand miles begins with a single step.",
    "To be, or not to be, that is the question."
];

let currentText = '';
let startTime = 0;
let typingStarted = false;
let correctTypedChars = 0;
let totalTypedChars = 0;

// Elements
const textToType = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

// Initialize the typing test
function initializeTest() {
    currentText = textArray[Math.floor(Math.random() * textArray.length)];
    textToType.innerText = currentText;
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    correctTypedChars = 0;
    totalTypedChars = 0;
    timerDisplay.innerText = '0';
    wpmDisplay.innerText = '0';
    accuracyDisplay.innerText = '0%';
}

// Start typing timer when user begins typing
userInput.addEventListener('input', function() {
    if (!typingStarted) {
        typingStarted = true;
        startTime = Date.now();
        startTimer();
    }
    trackInput();
});

// Timer function
function startTimer() {
    const interval = setInterval(function() {
        if (typingStarted) {
            const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
            timerDisplay.innerText = timeElapsed;
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

// Track user input and calculate WPM, Accuracy
function trackInput() {
    const typedText = userInput.value;
    totalTypedChars = typedText.length;
    correctTypedChars = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentText[i]) {
            correctTypedChars++;
        }
    }

    const accuracy = Math.round((correctTypedChars / totalTypedChars) * 100);
    const wpm = Math.floor((totalTypedChars / 5) / (parseInt(timerDisplay.innerText) / 60));

    accuracyDisplay.innerText = `${accuracy}%`;
    wpmDisplay.innerText = wpm;

    if (typedText === currentText) {
        finishTest();
    }
}

// Finish the test
function finishTest() {
    userInput.disabled = true;
    alert("Test completed! Your typing speed and accuracy have been recorded.");
}

// Initialize the test when the page loads
initializeTest();
