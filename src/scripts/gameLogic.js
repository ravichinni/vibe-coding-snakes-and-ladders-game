// Game configuration
const boardSize = 10;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

// Game state
let players = [{ position: 0, name: "Player 1" }, { position: 0, name: "Player 2" }];
let currentPlayerIndex = 0;

// Roll dice function
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Move player function
// Move player function
function movePlayer(player, diceRoll) {
    const newPosition = player.position + diceRoll;

    // First check if the new position is valid
    if (newPosition > 100) {
        player.position = 100;
        return;
    }

    player.position = newPosition;

    // Check for snakes or ladders
    if (snakes[player.position]) {
        player.position = snakes[player.position];
    } else if (ladders[player.position]) {
        player.position = ladders[player.position];
    }
}

// Check for winner
function checkWinner(player) {
  return player.position === 100;
}