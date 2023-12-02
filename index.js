document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const message = document.getElementById("message");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    //create the game board
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.index = i;
        square.addEventListener("click", () => handleMove(i));
        board.appendChild(square);
    }

    //player moves
    function handleMove(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            updateBoard();

            if (checkWinner()) {
                message.textContent = `Player ${currentPlayer} is the winner!`;
            } else if (!gameBoard.includes("")) {
                message.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }


    //check winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                message.textContent = `Player ${gameBoard[a]} is the winner!`;
                return true;
            }
        }

        return false;
    }

    //update gameboard
    function updateBoard() {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square, index) => {
            square.textContent = gameBoard[index];
        });
    }
});
