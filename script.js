// --- 1. Variables & Elements ---
let focusTime = 25*60; // 25 minutes in seconds
let breakTime = 5*60;  // 5 minutes in seconds
let timeLeft = focusTime;
let isFocusMode = true;
let timerInterval = null;

const display = document.getElementById('time-left');
const modeLabel = document.getElementById('mode-label');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const historyList = document.getElementById('history-list');

// --- 2. Format and Update the Timer Display ---
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // padStart ensures it shows "05" instead of just "5"
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// --- 3. Audio Cue Generator ---
// Creates a clean, 0.5-second beep without needing an external audio file
function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Pitch
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
}

// --- 4. History & Local Storage Logic ---
function loadHistory() {
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem('pomodoroHistory'));

    if (savedData && savedData.date === today) {
        savedData.sessions.forEach(session => addHistoryToDOM(session));
    } else {
        // It's a new day or first time, reset storage
        localStorage.setItem('pomodoroHistory', JSON.stringify({ date: today, sessions: [] }));
    }
}

function addHistoryToDOM(text) {
    const li = document.createElement('li');
    li.textContent = text;
    historyList.appendChild(li);
}

function saveSession() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const text = `✓ ${Math.floor(focusTime / 60)}:00 focus — ${timeString}`;
    
    addHistoryToDOM(text);

    // Save to local storage
    const today = now.toDateString();
    const savedData = JSON.parse(localStorage.getItem('pomodoroHistory'));
    savedData.sessions.push(text);
    localStorage.setItem('pomodoroHistory', JSON.stringify(savedData));
}

// --- 5. Core Timer Logic ---
function switchMode() {
    playBeep();
    isFocusMode = !isFocusMode;
    
    if (isFocusMode) {
        timeLeft = focusTime;
        modeLabel.textContent = "Focus Time";
        document.body.classList.remove('break-mode');
    } else {
        saveSession(); // Save the completed focus session
        timeLeft = breakTime;
        modeLabel.textContent = "Break Time";
        document.body.classList.add('break-mode');
    }
    updateDisplay();
}

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals if clicked twice
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            switchMode();
            startTimer(); // Auto-start the next cycle
        }
    }, 1000); // Ticks every 1000 milliseconds (1 second)
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    isFocusMode = true;
    timeLeft = focusTime;
    modeLabel.textContent = "Focus Time";
    document.body.classList.remove('break-mode');
    updateDisplay();
}

// --- 6. Event Listeners & Initialization ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Run these when the app first loads
loadHistory();
updateDisplay();