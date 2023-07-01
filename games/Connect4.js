class Connect4 extends GameEngine {
  drawer(board) {
    document.open();
    document.write(`
        <style>
          body {
            height: 100%;
            margin: 0;
            font-family: 'Finger Paint', cursive;
          }
  
          .board-container {
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url('assets/backgrounds/checkers.jpg');
            background-repeat: 1;
            background-size: contain;
            height: 120vh;
          }
    
          .board {
            display: grid;
            grid-template-columns: repeat(${7}, 70px);
            grid-template-rows: repeat(${6}, 70px);
            background-color: blue;
            width: calc(70px * ${7});
            height: calc(70px * ${6});
            border: 2px solid #000;
            border-collapse: collapse;
            box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
          }
          
          .board-cell {
            display: flex;
            margin : 3px;
            justify-content: center;
            align-items: center;
            font-size: 0em;
            border: 1px solid #000;
            border-radius: 50%;
            background-color: white;
          }
        </style>
      `);

    document.write("<title>Connect 4</title>");
    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j < 7; j++) {
        let cellValue = board[i][j];
        let backgroundColor = "white";
        if (cellValue === "X") {
          backgroundColor = "yellow";
        } else if (cellValue === "O") {
          backgroundColor = "red";
        }
        let cell = `<div class="board-cell" data-row="${i}" data-col="${j}" style="background-color:${backgroundColor}">${cellValue}</div>`;
        document.write(cell);
      }
    }
    document.write("</div>");
    document.write("</div>");
    document.close();
  }

  //input : c
  controller(board, input, playerTurn) {
    if ([...input].length != 1) {
      return { BD: board, f: false };
    }
    let col = parseInt(input[0]);
    if (isNaN(col) || col < 0 || col > 6) {
      //alert('Wrong Input');
      return { BD: board, f: false };
    }

    // find the first empty cell in the given column
    let row = -1;
    for (let i = 5; i >= 0; i--) {
      if (board[i][col] === " ") {
        row = i;
        break;
      }
    }

    if (row === -1) {
      //alert('This column is full.');
      return { BD: board, f: false };
    }

    // update the cell with the player's mark
    if (playerTurn) {
      board[row][col] = "X";
    } else {
      board[row][col] = "O";
    }

    return { BD: board, f: true };
  }
}
