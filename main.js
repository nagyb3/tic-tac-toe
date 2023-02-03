//cell id starts from 1
//game starts with x making move

// TODO: score counter

//new start
function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0;
}

firstPlayer = new Player('Player 1', 'x');
secondPlayer = new Player('Player 2', 'o');


//end

let cellData = new Array(9).fill(null);
const cells = document.querySelectorAll('.cell');
const nextGameButton = document.querySelector('.next-game');
let nextPlayer = 1;
const infoDiv = document.querySelector('.info');
const firstPLayerButton = document.querySelector('button.first-player');
const secondPlayerButton = document.querySelector('button.second-player');
const firstPlayerScoreP = document.querySelector('.first-player-score');
const secondPlayerScoreP = document.querySelector('.second-player-score');
let gameover = false;

for (let i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', () => {
            if (gameover === false) {
                if (nextPlayer === 1) {
                    gameBoard.add(i + 1, "x");
                } else {
                    gameBoard.add(i + 1, "o")
                }
            }
        })
}

const gameBoard = (() => {
    const add = (cellId, markerType) => {
        const targetDiv = document.querySelector(`.board > :nth-child(${cellId})`)
        console.log(targetDiv)
        if (cellData[cellId - 1] === null) {
            cellData[cellId - 1] = markerType;
            displayController.refresh()
            gameBoard.toggleNext();
            if (gameBoard.checkWinner() !== undefined) {
                const infopara = document.createElement('p');
                if (gameBoard.checkWinner() === 'x') {
                    infopara.textContent = `${firstPlayer.name} has won!`;
                    firstPlayer.score = firstPlayer.score + 1;
                    firstPlayerScoreP.textContent = firstPlayer.score;
                } else if (gameBoard.checkWinner() === 'o') {
                    infopara.textContent = `${secondPlayer.name} has won!`;
                    secondPlayer.score = secondPlayer.score + 1;
                    secondPlayerScoreP.textContent = secondPlayer.score;
                } else if (gameBoard.checkWinner() === 'tie') {
                    infopara.textContent = 'It\'s a tie!';
                }
                infopara.classList.add('infopara');
                infoDiv.appendChild(infopara);
                nextGameButton.removeAttribute('hidden');
                gameover = true;
            }
        }
    }
    const checkWinner = () => { // returns the winner if there is one
        if (cellData[0] === cellData[1] && cellData[1] === cellData[2] && cellData[0] != null) {
            return cellData[0];
        } else if (cellData[3] === cellData[4] && cellData[4] === cellData[5] && cellData[3] != null){
            return cellData[3];
        } else if (cellData[6] === cellData[7] && cellData[7] === cellData[8] && cellData[6] != null){
            return cellData[6];
        } else if (cellData[0] === cellData[3] && cellData[3] === cellData[6] && cellData[0] != null) {//elso oszlop
            return cellData[0];
        } else if (cellData[1] === cellData[4] && cellData[4] === cellData[7] && cellData[1] != null) {
            return cellData[1];
        } else if (cellData[2] === cellData[5] && cellData[5] === cellData[8] && cellData[2] != null) {
            return cellData[2];
        } else if (cellData[0] === cellData[4] && cellData[4] === cellData[8] && cellData[0] != null) {
            return cellData[0]
        } else if (cellData[2] === cellData[4] && cellData[4] === cellData[6] && cellData[2] != null) {
            return cellData[2]
        } else if (cellData.includes(null) === false) {
            return 'tie'
        }
    }
    const reset = () => {
        cellData = new Array(9).fill(null);
        displayController.refresh();
        infoDiv.innerHTML = '';
        nextPlayer = 1;
        gameover = false;
    }
    const toggleNext = () => {
        if (nextPlayer === 1) {
            nextPlayer = 2;
        } else if (nextPlayer === 2) {
            nextPlayer = 1;
        }
    }
    return {add, checkWinner, reset, toggleNext};
})();

const displayController = (() => {
    const refresh = () => {
        for (let i = 0; i < cellData.length; i++) {
            let currentCell = document.querySelector(`.board > :nth-child(${i + 1})`);
            currentCell.textContent = cellData[i];
        }
    }
    return {refresh}
})();

nextGameButton.addEventListener('click', () => {
    nextGameButton.setAttribute('hidden', '');
    gameBoard.reset();
})


firstPLayerButton.textContent = firstPlayer.name;
secondPlayerButton.textContent = secondPlayer.name;

firstPLayerButton.addEventListener('click', () => {
    firstPlayer.name = prompt('first player name?');
    firstPLayerButton.textContent = firstPlayer.name;
})

secondPlayerButton.addEventListener('click', () => {
    secondPlayer.name = prompt('first player name?');
    secondPlayerButton.textContent = secondPlayer.name;
})