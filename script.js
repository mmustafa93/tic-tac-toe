// Gameboard Module
const Gameboard = (() => {
    const board = Array(3).fill(null).map(() => Array(3).fill(null));
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = { checked: false, value: null };
        }
    }

    const markCell = (row, col, symbol) => {
      if (!board[row][col].checked) {
        board[row][col] = { checked: true, value: symbol };
        return true; // Move successful
      }
      return false; // Cell already occupied
    };
  
    const getBoard = () => board; // to ensure encapsulation
  
    const resetBoard = () => {
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

    const playTurn = (row, col) => {
        if (isGameOver) {
          console.log("The game is over. Please reset the board to play again.");
          return;
        }
    
        const moveSuccessful = Gameboard.markCell(row, col, currentPlayer.symbol);
        if (moveSuccessful) {
          Gameboard.printBoard();
          if (checkWinner()) {
            console.log(`${currentPlayer.name} wins!`);
            isGameOver = true;
            return;
          }
          if (checkTie()) {
            console.log("It's a tie!");
            isGameOver = true;
            return;
          }
          switchPlayer();
        } else {
          console.log("Cell is already occupied. Try a different move.");
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
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
    
    const resetGame = () => {
    Gameboard.resetBoard();
    isGameOver = false;
    currentPlayer = players[0];
    console.log("Game reset. Starting a new game.");
    Gameboard.printBoard();
    };
    
    return { setPlayers, playTurn, resetGame };
})();

// Game Initialization
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

GameController.setPlayers(player1, player2);
console.log("Game started. Player 1 goes first (X).\n");
Gameboard.printBoard();