class Sudoku extends GameEngine {
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
            height: 120vh;
            background-image: url('assets/backgrounds/checkers.jpg');
            background-repeat: 2;
            background-size: contain;
          }
          
          .board {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            grid-template-rows: repeat(9, 1fr);
            grid-gap: 1px;
            background-color: #e0e0e0;
            padding: 20px;
            box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
          }
          
          #pos{
            position: relative;
            bottom: 40%;
            right: 35%;
            color: #191919;
            font-size: 0.55rem;
          }
  
          .board-cell {
            display: flex;
            font-size: 20px;
            background-color: #ffffff;
            border: 1px solid #000000;
            justify-content: center;
            align-items: center;
            height: 50px;
            width: 50px;
          }
          
          .board-cell[data-row="2"], 
          .board-cell[data-row="5"], 
          .board-cell[data-row="8"] {
            border-bottom-width: 3px;
          }
          
          .board-cell[data-col="2"], 
          .board-cell[data-col="5"], 
          .board-cell[data-col="8"] {
            border-right-width: 3px;
          }
        </style>
      `);

    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
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
  }

  checkRow(board, row, num) {
    for (let i = 0; i < 9; i++) {
      let tmp = parseInt(board[row][i]);
      if (isNaN(tmp)) continue;
      if (num === tmp) return false;
    }
    return true;
  }
  checkCol(board, col, num) {
    for (let i = 0; i < 9; i++) {
      let tmp = parseInt(board[i][col]);
      if (isNaN(tmp)) continue;
      if (num === tmp) return false;
    }
    return true;
  }
  checkBox(board, row, col, num) {
    let startRow = Math.floor(row / 3.0) * 3;
    let endRow = startRow + 2;
    let startCol = Math.floor(col / 3.0) * 3;
    let endCol = startCol + 2;
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        let tmp = parseInt(board[i][j]);
        if (isNaN(tmp)) continue;
        if (num === tmp) return false;
      }
    }
    return true;
  }

  //input: rc,n
  controller(board, input, playerTurn) {
    if ([...input].length != 4) {
      return { BD: board, f: false };
    }
    let row = parseInt(input[0]);
    let col = parseInt(input[1]);
    let num = parseInt(input[3]);
    if (
      isNaN(row) ||
      isNaN(col) ||
      isNaN(num) ||
      row < 0 ||
      row > 8 ||
      col < 0 ||
      col > 8 ||
      num < 1 ||
      num > 9
    ) {
      //alert('Wrong Input');
      return { BD: board, f: false };
    } else if (board[row][col] === " ") {
      if (
        this.checkRow(board, row, num) &&
        this.checkCol(board, col, num) &&
        this.checkBox(board, row, col, num)
      ) {
        board[row][col] = num;
      } else {
        //alert('Wrong Play...');
        return { BD: board, f: false };
      }
    } else {
      //alert('This place is already occupied.');
      return { BD: board, f: false };
    }
    //Done
    return { BD: board, f: true };
  }
}
