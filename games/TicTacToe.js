class TicTacToe extends GameEngine {
  drawer(board) {
    document.open(board);
    document.write(`
        <style>
          body {
            height: 100%;
            margin: 0;
            font-family: 'Finger Paint', cursive;
          }
          
          /* Style the board container with the background image */
          .board-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-image: url('assets/backgrounds/xo.jpg');
            background-repeat: 1;
            background-size: contain;
          }
  
          /* Style the board */
          .board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            width: 100%;
            max-width: 300px;
            height: 100%;
            max-height: 300px;
            box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
            background-color: #fff; /* Add a white background color */
          }
          
          #pos{
            position: relative;
            bottom: 40%;
            right: 40%;
            color: #191919;
            font-size: 0.75rem;
          }
  
          /* Style the board cells */
          .board-cell {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 5em;
            font-weight: bold;
            border: 1px solid #000;
            color: #000; /* Set the text color to black */
            transition: background-color 0.2s ease-in-out; /* Add a smooth transition */
          }
        </style>
      `);

    document.write("<title>Tic Tac Toe</title>");
    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") {
          document.write(
            `<div class="board-cell" data-row="${i}" data-col="${j}"><span id="pos">${i}${j}</span></div>`
          );
          continue;
        }
        document.write(
          `<div class="board-cell" data-row="${i}" data-col="${j}">${board[i][j]}</div>`
        );
      }
    }
    document.write("</div>");
    document.write("</div>");
    document.close();
  }

  //input: rc
  controller(board, input, playerTurn) {
    if ([...input].length != 2) {
      return { BD: board, f: false };
    }
    let row = parseInt(input[0]);
    let col = parseInt(input[1]);
    let flag = true;
    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
      //alert('Wrong Input');
      flag = false;
    } else if (board[row][col] === " ") {
      if (playerTurn) {
        board[row][col] = "X";
      } else {
        board[row][col] = "O";
      }
    } else {
      //alert('This place is already occupied.');
      flag = false;
    }
    return { BD: board, f: flag };
  }
}
