// makes key value pairs for the render color of each player
const boardLookup = {
    1: "black",
    2: "gray"
}

// array of winningCombos to be checked
const winningCombos = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ]


// board used to track the state of the board to be rendered
let board;

// array of player one and player two's pieces to be checked if their is a winner
let playerOneGrid;
let playerTwoGrid;

// variable that keeps track of who's turn it is
let playerTurn;

// variable that keeps track if there is a winner or tie
let winner;

// keeps track of what spaces are remaining on the grid
let columns = [
    [0,7,14,21,28,35],
    [1,8,15,22,29,36],
    [2,9,16,23,30,37],
    [3,10,17,24,31,38],
    [4,11,18,25,32,39],
    [5,12,19,26,33,40],
    [6,13,20,27,34,41]
]

// click event listeners for turn function and render
document.querySelector("#board").addEventListener("click", handleTurn);
document.querySelector("#board").addEventListener("click", render);
document.querySelector("#reset").addEventListener("click", init);


function init() {
    board = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    playerOneGrid = [];
    playerTwoGrid = [];
  
    winner = null;
  
    playerTurn = 1;
  
    render();
}

init();

// function that handles each turn
function handleTurn(e) {
        // checks to see if there is a inner or tie
        if(winner === 1) {
            return;
        } else if (winner === 2) {
            return;
        } else if (winner === 3) {
            return;
        } else if (playerTurn === 1) {
            // pushes the lowest avaible cell of the column the player clicked on into the player's grid state
            let column = e.target.className;
            if (columns[column].length === 0) {
                return;
            } else {
            playerOneGrid.push(columns[column].shift());
            board[column].push(1);
            console.log(board);
            }
            // checks if the player has won and changes the winner variable to that player's number
            winningCombos.forEach(function(array) {
                if(array.every(i => playerOneGrid.includes(i))) {
                    return winner = 1;
                }
            });
            // checks to see if there is a tie and then changes the turn to the other player
            let checkGrid = 0;
            columns.forEach(function(array) {
               if (array.length === 0) {
                   checkGrid++;
               }
            });
            if (checkGrid === 7) {
                return winner = 3;
            } else {
                return playerTurn = 2;
            }
        } else if (playerTurn === 2) {
            let column = e.target.className;
            if (columns[column].length === 0) {
                return;
            } else {
            playerTwoGrid.push(columns[column].shift());
            board[column].push(2);
            console.log(board);
        }
            winningCombos.forEach(function(array) {
                if(array.every(i => playerTwoGrid.includes(i))) {
                    return winner = 2;
                }
            });
            let checkGrid = 0;
            columns.forEach(function(array) {
               if (array.length === 0) {
                   checkGrid++;
               }
            });
            if (checkGrid === 7) {
                return winner = 3;
            } else {
                return playerTurn = 1;
            }
        }
        render()
        
}

// searches through each element of the board array of arrays and
// changes the background color of each cell accordingly
function render() {
    board.forEach(function(array, arrayIndex) {
        //clears the board
        if (board[arrayIndex].length === 0) {
            for (let i = 0; i < 6; i++) {
                let cell = document.getElementById('board').rows[i].cells[arrayIndex];
                cell.style.backgroundColor = "white";
            }
        } else {
        //renders play choices
        array.forEach(function(element, rowIndex) {
            let inverter = 5 - (rowIndex * 2);
            let cell = document.getElementById('board').rows[rowIndex + inverter].cells[arrayIndex];
            cell.style.background = boardLookup[element];
        });
        }
    });
    if (playerTurn === 1) {
        let winnerText = document.getElementById('result');
        result.innerHTML = "Player One's Turn";
    } else if (playerTurn === 2) {
        let winnerText = document.getElementById('result');
        result.innerHTML = "Player Two's Turn";
    }
    if (winner === 1) {
        let winnerText = document.getElementById('result');
            result.innerHTML = "Player One Wins!";
    } else if (winner === 2) {
        let winnerText = document.getElementById('result');
            result.innerHTML = "Player Two Wins!";
    } else if (winner === 3) {
        let winnerText = document.getElementById('result');
            result.innerHTML = "It's a Tie!";
    }
}