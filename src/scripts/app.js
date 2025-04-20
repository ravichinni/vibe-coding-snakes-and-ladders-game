// DOM elements
const gameBoard = document.getElementById("game-board");
const rollDiceButton = document.getElementById("roll-dice");
const diceResult = document.getElementById("dice-result");
const playerTurn = document.getElementById("player-turn");
const playerPositionDisplay = document.getElementById('player-position');

// Game state
let lastDiceRoll = '-';

// Initialize game board
function createBoard() {
    for (let i = 100; i > 0; i--) {
        const cell = document.createElement("div");
        cell.textContent = i;
        cell.style.backgroundColor = i % 2 === 0 ? "#f0f0f0" : "#d0d0d0";
        cell.setAttribute('data-position', i);
        gameBoard.appendChild(cell);
    }
}

function drawSnakesAndLadders() {
    const svg = document.getElementById('snakes-and-ladders');
    const cellSize = 50;

    // Helper function to get cell center coordinates
    function getCellCenter(position) {
        // Calculate row (0-9 from bottom to top)
        const row = Math.floor((position - 1) / 10);
        const rowFromBottom = 9 - row;  // Invert row number since we display from bottom to top
        
        // Calculate column based on row direction
        // For even rows from bottom, numbers go left to right
        // For odd rows from bottom, numbers go right to left
        const isEvenRowFromBottom = rowFromBottom % 2 === 0;
        const col = position % 10 || 10;  // Convert 10, 20, 30, etc to position 10
        const adjustedCol = isEvenRowFromBottom ? (col - 1) : (10 - col);
        
        return {
            x: adjustedCol * cellSize + cellSize / 2,
            y: rowFromBottom * cellSize + cellSize / 2
        };
    }

    // Draw Snakes
    Object.entries(snakes).forEach(([start, end]) => {
        const startPos = getCellCenter(parseInt(start));
        const endPos = getCellCenter(end);
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const controlPoint1 = {
            x: startPos.x + (endPos.x - startPos.x) / 3,
            y: startPos.y + (endPos.y - startPos.y) / 2
        };
        const controlPoint2 = {
            x: startPos.x + 2 * (endPos.x - startPos.x) / 3,
            y: startPos.y + (endPos.y - startPos.y) / 2
        };
        
        path.setAttribute("d", `M ${startPos.x} ${startPos.y} 
                              C ${controlPoint1.x} ${controlPoint1.y},
                                ${controlPoint2.x} ${controlPoint2.y},
                                ${endPos.x} ${endPos.y}`);
        path.classList.add('snake');
        svg.appendChild(path);
    });

    // Draw Ladders
    Object.entries(ladders).forEach(([start, end]) => {
        const startPos = getCellCenter(parseInt(start));
        const endPos = getCellCenter(end);
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startPos.x);
        line.setAttribute("y1", startPos.y);
        line.setAttribute("x2", endPos.x);
        line.setAttribute("y2", endPos.y);
        line.classList.add('ladder');
        svg.appendChild(line);
    });
}

// Update UI
function updateUI() {
    if (diceResult) diceResult.textContent = `Dice: ${lastDiceRoll}`;
    if (playerTurn) {
        playerTurn.innerHTML = `
            <div class="player-info">
                <span class="player-indicator ${players[currentPlayerIndex].name.toLowerCase()}-color"></span>
                ${players[currentPlayerIndex].name}'s Turn
            </div>`;
    }

    if (playerPositionDisplay) {
        playerPositionDisplay.innerHTML = `Player Positions: ${players.map(player => 
            `<div class="player-info">
                <span class="player-indicator ${player.name.toLowerCase()}-color"></span>
                ${player.name}: ${player.position}
            </div>`
        ).join("")}`;
    }
    // if (playerPositionDisplay) {
    //     playerPositionDisplay.textContent = `Player Positions: ${players.map(player => 
    //         `${player.name}: ${player.position}`).join(", ")}`;
    // }
    
    // Update player positions on board
    const cells = gameBoard.querySelectorAll('div');
    cells.forEach(cell => {
        cell.classList.remove('player1', 'player2');
    });
    
    players.forEach((player, index) => {
        if (player.position > 0) {
            const cell = gameBoard.querySelector(`[data-position="${player.position}"]`);
            if (cell) {
                cell.classList.add(`player${index + 1}`);
            }
        }
    });
}

function displayHistory() {
    const historyDiv = document.getElementById('game-history');
    if (!historyDiv) return;

    historyDiv.innerHTML = players.map(player => {
        const moves = player.history.map(move => 
            `Turn ${move.turnNumber}: Roll ${move.diceRoll} - ` +
            `From ${move.startPosition} to ${move.endPosition}`
        ).join('<br>');
        
        return `<div class="player-history">
            <h3>${player.name} History:</h3>
            ${moves || 'No moves yet'}
        </div>`;
    }).join('');
}


// Handle dice roll
rollDiceButton.addEventListener("click", () => {
    const diceRoll = rollDice();
    lastDiceRoll = diceRoll;
    diceResult.textContent = `Dice: ${diceRoll}`;

    const currentPlayer = players[currentPlayerIndex];
    movePlayer(currentPlayer, diceRoll);

    if (checkWinner(currentPlayer)) {
        alert(`${currentPlayer.name} wins!`);
        rollDiceButton.disabled = true;
        return;
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateUI();
    displayHistory();
});

// Start the game
createBoard();
drawSnakesAndLadders();
updateUI();
displayHistory();