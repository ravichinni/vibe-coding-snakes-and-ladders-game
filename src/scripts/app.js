const gameBoard = document.getElementById('game-board');
const rollButton = document.getElementById('roll-button');
const playerPositionDisplay = document.getElementById('player-position');
let playerPosition = 0;

function initializeGame() {
    playerPosition = 0;
    updatePlayerPosition();
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(steps) {
    playerPosition += steps;
    checkForSnakesAndLadders();
    updatePlayerPosition();
}

function checkForSnakesAndLadders() {
    const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
    const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

    if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
    } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
    }
}

function updatePlayerPosition() {
    playerPositionDisplay.textContent = `Player Position: ${playerPosition}`;
    if (playerPosition >= 100) {
        alert('Congratulations! You reached the end!');
        initializeGame();
    }
}

rollButton.addEventListener('click', () => {
    const diceRoll = rollDice();
    movePlayer(diceRoll);
});

initializeGame();