//modules:
//gameBoard
// displayController

//factory functions:
// players

//cell id starts from 1
//game starts with x making move

let cellData = new Array(9).fill(null);

const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener('click', () => {
        if (nextPlayer === 1) {
            gameBoard.add(i + 1, "x");
        } else {
            gameBoard.add(i + 1, "o")
        }
    })
}

//how can you win??
//-same column
//-same row
//diagonal 1 5 9 / 3 5 9

const infoDiv = document.querySelector('.info');

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
            }
        }
    }
    const checkWinner = () => { // returns the winner of there is one
        //check for same row
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
    return {add, checkWinner};
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

let nextPlayer = 1;

const players = (() => {
    const toggleNext = () => {
        if (nextPlayer === 1) {
            nextPlayer = 2;
        } else if (nextPlayer === 2) {
            nextPlayer = 1;
        }
    }
    const console1 = () => {
        alert(12);
    }
    return {toggleNext, console1};
})();

// const drawBoard = function (cellId, markerType) {
//
// }

//factory function example:

// const Player = (name, level) => {
//     let health = level * 2;
//     const getLevel = () => level;
//     const getName  = () => name;
//     const die = () => {
//         // uh oh
//     };
//     const damage = x => {
//         health -= x;
//         if (health <= 0) {
//             die();
//         }
//     };
//     const attack = enemy => {
//         if (level < enemy.getLevel()) {
//             damage(1);
//             console.log(`${enemy.getName()} has damaged ${name}`);
//         }
//         if (level >= enemy.getLevel()) {
//             enemy.damage(1);
//             console.log(`${name} has damaged ${enemy.getName()}`);
//         }
//     };
//     return {attack, damage, getLevel, getName};
// };