//cell id starts from 1
//game starts with x making move

let cellData = new Array(9).fill(null);
const cells = document.querySelectorAll('.cell');
const nextGameButton = document.querySelector('.next-game');
let nextPlayer = 1;
const infoDiv = document.querySelector('.info');

for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener('click', () => {
        if (nextPlayer === 1) {
            gameBoard.add(i + 1, "x");
        } else {
            gameBoard.add(i + 1, "o")
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
            players.toggleNext();
            if (gameBoard.checkWinner() !== undefined) {
                const infopara = document.createElement('p');
                if (gameBoard.checkWinner() === 'x') {
                    infopara.textContent = 'Player 1 has won!'
                } else if (gameBoard.checkWinner() === 'o') {
                    infopara.textContent = 'Player 2 has Won!'
                }
                infoDiv.appendChild(infopara);
                nextGameButton.removeAttribute('hidden');
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
        }
    }
    const reset = () => {
        cellData = new Array(9).fill(null);
        displayController.refresh();
        infoDiv.innerHTML = '';
        nextPlayer = 1;
    }
    return {add, checkWinner, reset};
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

const players = (() => {
    const toggleNext = () => {
        if (nextPlayer === 1) {
            nextPlayer = 2;
        } else if (nextPlayer === 2) {
            nextPlayer = 1;
        }
    }
    return {toggleNext};
})();

nextGameButton.addEventListener('click', () => {
    nextGameButton.setAttribute('hidden', '');
    gameBoard.reset();
})