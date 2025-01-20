const startBtn = document.querySelector(".start-btn");
const playerTurnText = document.querySelector(".player-turn");
const winnerDeclaration = document.querySelector(".winner-declaration");


// Gameboard Module
const Gameboard = (() => {
    const board = Array(3).fill(null).map(() => Array(3).fill(null));
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = { checked: false, value: null };
        }
    }

    const markCell = (row, col, symbol, span) => {
      if (!board[row][col].checked) {
        board[row][col] = { checked: true, value: symbol };
        span.textContent = symbol;
        return true; // Move successful
      }
      return false; // Cell already occupied
    };
  
    const getBoard = () => board; // to ensure encapsulation
  
    const resetBoard = (squares) => {
        console.log(squares);
        squares.forEach(square => {
            const span = square.querySelector("span"); // Select the span inside each square
            console.log(span);
            if (span) {
                span.textContent = ""; // Clear the content of the span
            }
        });
        playerTurnText.classList.remove("hidden");
        winnerDeclaration.classList.add("hidden"); 
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          board[row][col] = { checked: false, value: null };
        }
      }
    };
  
    const printBoard = () => {
      board.forEach(row => {
        console.log(row.map(cell => (cell.value ? cell.value : " ")).join(" | "));
      });
      console.log("\n");
    };
  
    return { markCell, getBoard, resetBoard, printBoard };
  })();

// Player Factory
const Player = (name, symbol) => {
    return { name, symbol };
};

// Game Controller Module
const GameController = (() => {
    let currentPlayer;
    let players = [];
    let isGameOver = false;

    const setPlayers = (player1, player2) => {
        players = [player1, player2];
        currentPlayer = player1; // Start with Player 1
    };

    // DOM Elements
    const humanPlayer1 = document.getElementById("human-player-1");
    const computerPlayer1 = document.getElementById("computer-player-1");
    const humanPlayer2 = document.getElementById("human-player-2");
    const computerPlayer2 = document.getElementById("computer-player-2");
    const startBtn = document.querySelector(".start-btn");
    const playerTurnText = document.querySelector(".player-turn");
    const gameBoard = document.querySelector(".game-board");
    const squares = document.querySelectorAll(".square");
    const winnerDeclaration = document.querySelector(".winner-declaration");
    const winnerText = document.querySelector(".winner-text");
    const restartBtn = document.getElementsByClassName("restart-btn");

    // Variables to track selected player types
    let player1Type // Default to Human
    let player2Type; // Default to Human

    humanPlayer1.addEventListener("click", () => {
        humanPlayer1.classList.add("selected");
        computerPlayer1.classList.remove("selected");
        player1Type = "Human"; // Update Player 1 type
        console.log(player1Type);
    });

    computerPlayer1.addEventListener("click", () => {
        humanPlayer1.classList.remove("selected");
        computerPlayer1.classList.add("selected");
        player1Type = "Computer"; // Update Player 1 type
    });

    humanPlayer2.addEventListener("click", () => {
        humanPlayer2.classList.add("selected");
        computerPlayer2.classList.remove("selected");
        player2Type = "Human"; // Update Player 2 type
    });

    computerPlayer2.addEventListener("click", () => {
        humanPlayer2.classList.remove("selected");
        computerPlayer2.classList.add("selected");
        player2Type = "Computer"; // Update Player 2 type
    });

    // Start game handler
    const startGame = () => {
        startBtn.addEventListener("click", () => {
            // Create players based on selected types
            if (!player1Type || !player2Type) {
                alert("Please select both player types before starting the game!");
                return;
            }

            const player1 = Player(player1Type, "X");
            const player2 = Player(player2Type, "O");

            // Set players and initialize game
            setPlayers(player1, player2);
            
            // Update UI to hide setup and show the game board
            playerTurnText.classList.remove("hidden");
            gameBoard.classList.remove("hidden");
            startBtn.classList.add("hidden")
            playerTurnText.textContent = `${player1.name}'s Turn (${player1.symbol})`;

            // Add event listeners to squares
            squares.forEach((square, index) => {
                square.addEventListener("click", () => playTurn(square, index));
            });
        });
    };

    // Play turn handler
    const playTurn = (square, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        const span = square.querySelector("span");
        if (span.textContent !== "") {
            alert("This square is already taken. Please choose another.");
            return;
        }

        if (isGameOver) {
          console.log("The game is over. Please reset the board to play again.");
          return;
        }
        
        const moveSuccessful = Gameboard.markCell(row, col, currentPlayer.symbol, span);
        
        if (moveSuccessful) {
          Gameboard.printBoard();
          if (checkWinner()) {
            playerTurnText.classList.add("hidden");
            winnerDeclaration.classList.remove("hidden");
            console.log(winnerText)
            winnerText.textContent = `${currentPlayer.name} wins!`;
            console.log(`${currentPlayer.name} wins!`);
            isGameOver = true;
            restartBtn[0].addEventListener("click", () => resetGame(squares));
            return;
          }
          if (checkTie()) {
            playerTurnText.classList.add("hidden");
            winnerDeclaration.classList.remove("hidden");
            winnerText.textContent = "It's a tie!";
            console.log("It's a tie!");
            isGameOver = true;
            restartBtn[0].addEventListener("click", () => resetGame(squares));
            return;
          }
          switchPlayer();
        } else {
          alert("Cell is already occupied. Try a different move.");
        }
    };

    const computerPlay = () => {
        const board = Gameboard.getBoard();
        const availableMoves = [];
        board.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if (!cell.checked) {
              availableMoves.push({ rowIndex, colIndex });
            }
          });
        });
        
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const square = squares[randomMove.rowIndex * 3 + randomMove.colIndex];
        
        // Add a delay before executing the move
        setTimeout(() => {
            playTurn(square, randomMove.rowIndex * 3 + randomMove.colIndex);
        }, 800);
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        playerTurnText.textContent = `${currentPlayer.name}'s Turn (${currentPlayer.symbol})`;
        if (currentPlayer.name === "Computer") {
            computerPlay();
        }
        console.log(`${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
    };
    

    const checkWinner = () => {
        const board = Gameboard.getBoard();
    
        const winConditions = [
          // Rows
          [board[0][0], board[0][1], board[0][2]],
          [board[1][0], board[1][1], board[1][2]],
          [board[2][0], board[2][1], board[2][2]],
          // Columns
          [board[0][0], board[1][0], board[2][0]],
          [board[0][1], board[1][1], board[2][1]],
          [board[0][2], board[1][2], board[2][2]],
          // Diagonals
          [board[0][0], board[1][1], board[2][2]],
          [board[0][2], board[1][1], board[2][0]],
        ];
    
        return winConditions.some(condition =>
          condition.every(cell => cell.checked && cell.value === currentPlayer.symbol)
        );
    };

    const checkTie = () => {
        const board = Gameboard.getBoard();
        return board.flat().every(cell => cell.checked);
      };
    
    const resetGame = (squares) => {
    console.log("Game reset. Starting a new game.");
    Gameboard.resetBoard(squares);
    isGameOver = false;
    currentPlayer = players[0];
    Gameboard.printBoard();
    };
    
    return { setPlayers, playTurn, resetGame, startGame };
})();


startBtn.addEventListener('click', GameController.startGame());
