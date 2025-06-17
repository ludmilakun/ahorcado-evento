// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const wordDisplay = document.getElementById('word-display');
const attemptsCount = document.getElementById('attempts-count');
const lettersContainer = document.getElementById('letters-container');
const resultMessage = document.getElementById('result-message');

// Variables del juego
let currentWord = '';
let guessedLetters = new Set();
let remainingAttempts = 6;
const words = ['AHORCADO', 'JAVASCRIPT', 'HTML', 'CSS', 'PROGRAMACION', 'COMPUTADORA'];

// Inicialización del juego
function initGame() {
    currentWord = getRandomWord();
    guessedLetters.clear();
    remainingAttempts = 6;
    updateWordDisplay();
    createLetterButtons();
    updateAttemptsDisplay();
}

// Obtener palabra aleatoria
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Actualizar visualización de la palabra
function updateWordDisplay() {
    const display = currentWord
        .split('')
        .map(letter => guessedLetters.has(letter) ? letter : '_')
        .join(' ');
    wordDisplay.textContent = display;
}

// Crear botones de letras
function createLetterButtons() {
    lettersContainer.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.className = 'letter-button';
        button.textContent = letter;
        button.addEventListener('click', () => handleLetterClick(letter, button));
        lettersContainer.appendChild(button);
    });
}

// Manejar clic en letra
function handleLetterClick(letter, button) {
    if (guessedLetters.has(letter) || remainingAttempts <= 0) return;
    
    button.classList.add('used');
    guessedLetters.add(letter);
    
    if (!currentWord.includes(letter)) {
        remainingAttempts--;
        updateAttemptsDisplay();
    }
    
    updateWordDisplay();
    checkGameEnd();
}

// Actualizar contador de intentos
function updateAttemptsDisplay() {
    attemptsCount.textContent = remainingAttempts;
}

// Verificar fin del juego
function checkGameEnd() {
    const isWordComplete = currentWord
        .split('')
        .every(letter => guessedLetters.has(letter));
    
    if (isWordComplete) {
        endGame(true);
    } else if (remainingAttempts <= 0) {
        endGame(false);
    }
}

// Finalizar juego
function endGame(isWin) {
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    resultMessage.textContent = isWin ? '¡Felicidades! ¡Has ganado!' : `¡Has perdido! La palabra era: ${currentWord}`;
}

// Event Listeners
startButton.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initGame();
});

restartButton.addEventListener('click', () => {
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initGame();
}); 