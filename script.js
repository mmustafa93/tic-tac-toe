// Gameboard Module
const Gameboard = (() => {
    const board = Array(3).fill(null).map(() => Array(3).fill({ checked: false, value: null }));
  
    const markCell = (row, col, symbol) => {
      if (!board[row][col].checked) {
        board[row][col] = { checked: true, value: symbol };
        return true; // Move successful
      }
      return false; // Cell already occupied
    };
  
    const getBoard = () => board;
  
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