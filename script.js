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
    if (board[row][column].getCellValue() !== "") {
      console.log("Cell already filled. Place your token again.");
      return false;
    }
    board[row][column].addToken(playerToken);
    return true;
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
  let cellValue = "";

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
  const gameBoard = Gameboard();
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Row patterns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Column patterns
    [0, 4, 8], [2, 4, 6]              // Diagonal patterns
  ];

  const players = [
    {
      name: playerOneName,
      token: "./images/player-one-token.svg"
    },
    {
      name: playerTwoName,
      token: "./images/player-two-token.svg"
    }
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    gameBoard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    // Log who is playing
    console.log(`${getActivePlayer().name} is placing a token`);

    const vacantCell = gameBoard.placeToken(row, column, getActivePlayer().token);
    if (!vacantCell) return;

    // After a player's turn, switch the players
    switchPlayerTurn();
    // Print the board and the player
    printNewRound();
  };

  // Initial play game message
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: gameBoard.getBoard
  };
}

/*
** The ScreenController will be responsible for
** updating the visual representation of the game,
** i.e. updating the screen each time a player takes their turn
*/
(function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    // Clear the board
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        // Create a button for each cell in the board
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        
        // Create a data attribute to identify the cell
        // This makes it easier to pass into 'playRound' function
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = cellIndex;

        // Get the current value of the cell (empty or player-one-token or player-two-token)
        const cellValue = cell.getCellValue();
        // Check if the cell has a value (player-one-token or player-two-token)
        if (cellValue) {
          const playerTokenImg = document.createElement("img");
          playerTokenImg.src = cellValue;
          playerTokenImg.alt = `${activePlayer.name}'s token`;
          cellButton.appendChild(playerTokenImg);
          cellButton.classList.add("filled");
        }
        
        boardDiv.appendChild(cellButton);
      });
    });
  };

  // add event listener for the board (cells)
  boardDiv.addEventListener("click", (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    // Make sure buttons are clicked not gaps or spaces
    if (!selectedRow || !selectedColumn) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  });

  // Initial render of the screen
  updateScreen();
}())