/*
** The Gameboard represents the state of the board
** Each square holds a Cell (defined later)
** and we expose a dropToken method to be able to add Cells to the squares
*/

function Gameboard() {
  const ROWS = 3;
  const COLUMNS = 3;
  const board = [];

  // Create a 2d array that will represent the state of the game
  // Row 0 will represent the top row and
  // column 0 will represent the left-most column
  for (let i = 0;  i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLUMNS; j++) {
      board[i].push(Cell());
    }
  }

  // This will be the method of getting the entire board that our
  // UI will eventually need to render
  const getBoard = () => board;

  // In order to place a token, we need to check if
  // the selected cell has no token yet,
  // then change the cell's value to the player's token
  const placeToken = (row, column, playerToken) => {
    if (board[row][column].getCellValue() !== 0) {
      console.log("Cell already filled");
      return;
    }
    board[row][column].addToken(playerToken);
  };

  // This method will be used to print our board to the console
  // It is helpful to see what the board looks like after each turn as we play,
  // but we won't need it after we build our UI
  const printBoard = () => {
    console.log(
      board.map((row) => row.map((cell) => cell.getCellValue()))
    );
  };

  return {
    getBoard,
    placeToken,
    printBoard
  };
}

/*
** A Cell represents one square on the board and can have a value of
** 0: No token is in the square,
** 1: Player 1's token is in the square,
** 2: Player 2's token is in the square
*/
function Cell() {
  let cellValue = 0;

  // Accept a player's token to change the value of the cell
  const addToken = (playerToken) => {
    cellValue = playerToken;
  };

  // Retrieve the current value of this cell through closure
  const getCellValue = () => cellValue;

  return {
    addToken, 
    getCellValue
  };
}

/* 
** The GameController will be responsible for controlling
** the flow and state of the game's turns,
** as well as whether anybody has won the game
*/
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {

}