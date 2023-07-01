class Checkers extends GameEngine {
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
            height: 100%;
            background-image: url('assets/backgrounds/checkers.jpg');
            background-repeat: 1;
            background-size: contain;
          }
          .board {
            display: grid;
            margin-left: 10px;
            grid-template-columns: repeat(8, 70px);
            grid-template-rows: repeat(8, 70px);
            background-color: #d1a05f;
            width: calc(70px * 8);
            height: calc(70px * 8);
            border: 2px solid #000;
            border-collapse: collapse;
            box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
            background-color: #fff; /* Add a white background color */
          }
          #pos{
            position: relative;
            bottom: 40%;
            right: 35%;
            color: #191919;
            font-size: 0.65rem;
          }
          .board-cell {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0em;
            font-weight: bold;
            border: 1px solid #000;
            background-color: white;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }
          .board-cell.black {
            background-color: #aea2a2;
          }
          .selected {
            background-color: #ffffcc !important;
          }
        </style>
      `);

    document.write("<title>Checkers</title>");
    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let cellValue = board[i][j];
        let cellClasses = "board-cell";
        if ((i + j) % 2 === 0) {
          cellClasses += " white";
        } else {
          cellClasses += " black";
        }
        let cellImgSrc = "";
        switch (cellValue) {
          case "w":
            cellImgSrc = "images/white.png";
            break;
          case "b":
            cellImgSrc = "images/black.png";
            break;
        }
        let cell = `<div class="${cellClasses}" style="background-image: url('${cellImgSrc}')" data-row="${i}" data-col="${j}"><span id="pos">${i}${j}</span></div>`;
        document.write(cell);
      }
    }
    document.write("</div></div>");
    document.close();
  }

  //input: rc,rc
  controller(board, input, playerTurn) {
    if ([...input].length != 5) {
      return { BD: board, f: false };
    }
    let fromRow = parseInt(input[0]);
    let fromCol = parseInt(input[1]);
    let toRow = parseInt(input[3]);
    let toCol = parseInt(input[4]);
    if (
      isNaN(fromRow) ||
      isNaN(fromCol) ||
      isNaN(toRow) ||
      isNaN(toCol) ||
      fromRow > 7 ||
      fromRow < 0 ||
      fromCol > 7 ||
      fromCol < 0 ||
      toRow > 7 ||
      toRow < 0 ||
      toCol > 7 ||
      toCol < 0
    ) {
      //alert('Wrong Input');
      return { BD: board, f: false };
    } else if (
      board[fromRow][fromCol] != "b" &&
      board[fromRow][fromCol] != "w"
    ) {
      return { BD: board, f: false };
    } else if (
      (playerTurn && board[fromRow][fromCol] == "b") ||
      (!playerTurn && board[fromRow][fromCol] == "w")
    ) {
      if (board[fromRow][fromCol] == "b") {
        if (
          fromRow + 1 == toRow &&
          (fromCol + 1 == toCol || fromCol - 1 == toCol) &&
          board[toRow][toCol] == " "
        ) {
          board[toRow][toCol] = board[fromRow][fromCol];
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          fromRow + 2 == toRow &&
          ((fromCol + 2 == toCol && board[fromRow + 1][fromCol + 1] == "w") ||
            (fromCol - 2 == toCol && board[fromRow + 1][fromCol - 1] == "w")) &&
          board[toRow][toCol] == " "
        ) {
          if (toCol < fromCol) {
            board[fromRow + 1][fromCol - 1] = " ";
          } else {
            board[fromRow + 1][fromCol + 1] = " ";
          }
          board[toRow][toCol] = board[fromRow][fromCol];
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else {
          return { BD: board, f: false };
        }
      } else if (board[fromRow][fromCol] == "w") {
        if (
          fromRow - 1 == toRow &&
          (fromCol + 1 == toCol || fromCol - 1 == toCol) &&
          board[toRow][toCol] == " "
        ) {
          board[toRow][toCol] = board[fromRow][fromCol];
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          fromRow - 2 == toRow &&
          ((fromCol + 2 == toCol && board[fromRow - 1][fromCol + 1] == "b") ||
            (fromCol - 2 == toCol && board[fromRow - 1][fromCol - 1] == "b")) &&
          board[toRow][toCol] == " "
        ) {
          if (toCol < fromCol) {
            board[fromRow - 1][fromCol - 1] = " ";
          } else {
            board[fromRow - 1][fromCol + 1] = " ";
          }
          board[toRow][toCol] = board[fromRow][fromCol];
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else {
          return { BD: board, f: false };
        }
      }
    } else {
      return { BD: board, f: false };
    }
  }
}
