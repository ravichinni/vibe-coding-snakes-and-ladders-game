function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

class Player {
    constructor(name) {
        this.name = name;
        this.position = 0;
    }

    move(steps) {
        this.position += steps;
        if (this.position > 100) {
            this.position = 100; // Cannot go beyond 100
        }
    }
}

const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

function checkPosition(player) {
    if (snakes[player.position]) {
        player.position = snakes[player.position];
    } else if (ladders[player.position]) {
        player.position = ladders[player.position];
    }
}

function isWinner(player) {
    return player.position === 100;
}

export { rollDice, Player, checkPosition, isWinner };