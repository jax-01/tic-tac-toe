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
      board[i].push("cell");
    }
  }

  // This will be the method of getting the entire board that our
  // UI will eventually need to render
  const getBoard = () => board;

  return { getBoard };
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

  return { addToken, getCellValue };
}