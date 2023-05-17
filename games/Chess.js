class Chess extends GameEngine {
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
            background-image: url('assets/backgrounds/chess.jpg');
            background-repeat: 2;
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
            bottom: 43%;
            right: 37%;
            color: #191919;
            font-size: 0.6rem;
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
          case "K":
            cellImgSrc = "images/Bking.png";
            break;
          case "Q":
            cellImgSrc = "images/Bqueen.png";
            break;
          case "R":
            cellImgSrc = "images/Brook.png";
            break;
          case "B":
            cellImgSrc = "images/Bbishop.png";
            break;
          case "N":
            cellImgSrc = "images/Bknight.png";
            break;
          case "P":
            cellImgSrc = "images/Bpawn.png";
            break;
          case "k":
            cellImgSrc = "images/Wking.png";
            break;
          case "q":
            cellImgSrc = "images/Wqueen.png";
            break;
          case "r":
            cellImgSrc = "images/Wrook.png";
            break;
          case "b":
            cellImgSrc = "images/Wbishop.png";
            break;
          case "n":
            cellImgSrc = "images/Wknight.png";
            break;
          case "p":
            cellImgSrc = "images/Wpawn.png";
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
      !("A" <= board[fromRow][fromCol] && board[fromRow][fromCol] <= "Z") &&
      !("a" <= board[fromRow][fromCol] && board[fromRow][fromCol] <= "z")
    ) {
      return { BD: board, f: false };
    } else if (
      (playerTurn &&
        "A" <= board[fromRow][fromCol] &&
        board[fromRow][fromCol] <= "Z") ||
      (!playerTurn &&
        "a" <= board[fromRow][fromCol] &&
        board[fromRow][fromCol] <= "z")
    ) {
      // Queen    q or Q    الملكة
      if (board[fromRow][fromCol] === "q" || board[fromRow][fromCol] === "Q") {
        // Check if the move is diagonal, horizontal, or vertical
        if (
          Math.abs(toRow - fromRow) == Math.abs(toCol - fromCol) ||
          toRow == fromRow ||
          toCol == fromCol
        ) {
          const rowDistance = toRow - fromRow;
          const colDistance = toCol - fromCol;

          // Check if there are any pieces in the path
          let i = fromRow;
          let j = fromCol;
          const rowStep = rowDistance < 0 ? -1 : 1;
          const colStep = colDistance < 0 ? -1 : 1;

          while (
            0 <= i &&
            i <= 7 &&
            0 <= j &&
            j <= 7 &&
            (i !== toRow || j !== toCol)
          ) {
            i += rowStep;
            j += colStep;
            if (
              (board[fromRow][fromCol] === "q" &&
                "a" <= board[i][j] &&
                board[i][j] <= "z") ||
              (board[fromRow][fromCol] === "Q" &&
                "A" <= board[i][j] &&
                board[i][j] <= "Z")
            ) {
              //alert(`Eating friend `);
              return { BD: board, f: false };
            }
            if (
              (board[fromRow][fromCol] === "q" &&
                "A" <= board[i][j] &&
                board[i][j] <= "Z") ||
              (board[fromRow][fromCol] === "Q" &&
                "a" <= board[i][j] &&
                board[i][j] <= "z")
            ) {
              board[toRow][toCol] = board[fromRow][fromCol];
              board[fromRow][fromCol] = " ";
              return { BD: board, f: true };
            }
          }

          // Check if there is a piece at the destination, and if it is of the opposite color
          if (
            (board[fromRow][fromCol] == "q" &&
              "A" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "Z") ||
            (board[fromRow][fromCol] == "Q" &&
              "a" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "z") ||
            board[toRow][toCol] == " "
          ) {
            board[toRow][toCol] = board[fromRow][fromCol];
            board[fromRow][fromCol] = " ";
            return { BD: board, f: true };
          } else {
            //alert('Invalid movement');
            return { BD: board, f: false };
          }
        } else {
          //alert('Invalid movement');
          return { BD: board, f: false };
        }
      }

      //bishop  b or B    الفيل
      if (board[fromRow][fromCol] === "b" || board[fromRow][fromCol] === "B") {
        // Check if the move is diagonal
        if (Math.abs(toRow - fromRow) == Math.abs(toCol - fromCol)) {
          const rowDistance = toRow - fromRow;
          const colDistance = toCol - fromCol;

          // Check if there are any pieces in the path
          let i = fromRow;
          let j = fromCol;
          const rowStep = rowDistance < 0 ? -1 : 1;
          const colStep = colDistance < 0 ? -1 : 1;

          while (i != toRow && j != toCol) {
            i += rowStep;
            j += colStep;

            if (
              (board[fromRow][fromCol] == "b" &&
                "a" <= board[toRow][toCol] &&
                board[toRow][toCol] <= "z") ||
              (board[fromRow][fromCol] == "B" &&
                "A" <= board[toRow][toCol] &&
                board[toRow][toCol] <= "Z")
            ) {
              //alert(`Eating friend`);
              return { BD: board, f: false };
            }
            if (
              (board[fromRow][fromCol] == "b" &&
                "A" <= board[toRow][toCol] &&
                board[toRow][toCol] <= "Z") ||
              (board[fromRow][fromCol] == "B" &&
                "a" <= board[toRow][toCol] &&
                board[toRow][toCol] <= "z")
            ) {
              board[toRow][toCol] = board[fromRow][fromCol];
              board[fromRow][fromCol] = " ";
              return { BD: board, f: true };
            }
          }

          // Check if there is a piece at the destination, and if it is of the opposite color
          if (
            board[toRow][toCol] == " " ||
            (board[fromRow][fromCol] == "b" &&
              "A" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "Z") ||
            (board[fromRow][fromCol] == "B" &&
              "a" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "z")
          ) {
            board[toRow][toCol] = board[fromRow][fromCol];
            board[fromRow][fromCol] = " ";
            return { BD: board, f: true };
          } else {
            //alert('Invalid movement: The destination contains a piece of the same color');
            return { BD: board, f: false };
          }
        } else {
          //alert('Invalid movement: The bishop moves only diagonally');
          return { BD: board, f: false };
        }
      }

      //King    k or K    الملك
      if (board[fromRow][fromCol] == "K" || board[fromRow][fromCol] == "k") {
        // Determine the row and column distance
        const rowDistance = Math.abs(toRow - fromRow);
        const colDistance = Math.abs(toCol - fromCol);

        console.log(`row : `, rowDistance, ` ,col `, colDistance);

        // Check if the move is valid for a king
        if (rowDistance <= 1 && colDistance <= 1) {
          // Check if there is a piece at the destination, and if it is of the opposite color
          if (
            (board[fromRow][fromCol] == "k" &&
              "A" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "Z") ||
            (board[fromRow][fromCol] == "K" &&
              "a" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "z") ||
            board[toRow][toCol] == " "
          ) {
            board[toRow][toCol] = board[fromRow][fromCol];
            board[fromRow][fromCol] = " ";
            return { BD: board, f: true };
          } else {
            //alert('Invalid movement wergwegwegwe');
            return { BD: board, f: false };
          }
        } else {
          //alert('Invalid movement');
          return { BD: board, f: false };
        }
      }

      //knight  N or n    حصان
      if (board[fromRow][fromCol] === "n" || board[fromRow][fromCol] === "N") {
        // Determine the row and column distance
        const rowDistance = Math.abs(toRow - fromRow);
        const colDistance = Math.abs(toCol - fromCol);

        console.log(`row : `, rowDistance, ` ,col `, colDistance);
        // Check if the move is valid for a knight
        if (
          (rowDistance == 1 && colDistance == 2) ||
          (rowDistance == 2 && colDistance === 1)
        ) {
          // Check if there is a piece at the destination, and if it is of the opposite color
          if (
            (board[fromRow][fromCol] == "n" &&
              "A" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "Z") ||
            (board[fromRow][fromCol] == "N" &&
              "a" <= board[toRow][toCol] &&
              board[toRow][toCol] <= "z") ||
            board[toRow][toCol] == " "
          ) {
            board[toRow][toCol] = board[fromRow][fromCol];
            board[fromRow][fromCol] = " ";
            return { BD: board, f: true };
          } else {
            //alert('Invalid movement nljknlknj');
            return { BD: board, f: false };
          }
        } else {
          //alert('Invalid movement');
          return { BD: board, f: false };
        }
      }

      //rook   R or r
      if (board[fromRow][fromCol] == "r" || board[fromRow][fromCol] == "R") {
        var end,
          cnst,
          tmp,
          i,
          j,
          tmp1 = "R";
        var cap = true;

        if (board[fromRow][fromCol] == "r") {
          cap = false;
          tmp1 = "r";
        }

        i = fromRow;
        j = fromCol;

        if (fromCol == toCol && fromRow != toRow) {
          end = toRow;
          cnst = 0;
          if (fromRow < toRow) {
            tmp = 1;
          } else if (fromRow > toRow) {
            tmp = -1;
          }
        } else if (fromRow == toRow && fromCol != toCol) {
          end = toCol;
          cnst = 1;
          if (fromCol < toCol) {
            tmp = 1;
          } else if (fromCol > toCol) {
            tmp = -1;
          }
        } else {
          //alert(`INVALID MOVEMENT `);
          return { BD: board, f: false };
        }

        while (true) {
          //increament and check condition
          if (cnst == 0) {
            i += tmp;
            if (tmp == 1 && i > end) break;
            else if (tmp == -1 && i < end) break;
          } else if (cnst == 1) {
            j += tmp;
            if (tmp == 1 && j > end) break;
            else if (tmp == -1 && j < end) break;
          }
          //check logic
          if (
            (cap && "a" <= board[i][j] && board[i][j] <= "z") ||
            (!cap && "A" <= board[i][j] && board[i][j] <= "Z")
          ) {
            board[fromRow][fromCol] = " ";
            board[i][j] = tmp1;
            return { BD: board, f: true };
          } else if (
            (!cap && "a" <= board[i][j] && board[i][j] <= "z") ||
            (cap && "A" <= board[i][j] && board[i][j] <= "Z")
          ) {
            //alert(`Eating friend `);
            return { BD: board, f: false };
          }
        }
        this.board[fromRow][fromCol] = " ";
        this.board[toRow][toCol] = tmp1;
        return { BD: board, f: true };
      }

      //for white pawn
      if (board[fromRow][fromCol] == "p") {
        if (
          toCol == fromCol &&
          toRow == fromRow - 1 &&
          board[toRow][toCol] == " "
        ) {
          board[toRow][toCol] = "p";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          fromRow == 6 &&
          toCol == fromCol &&
          toRow == fromRow - 2 &&
          board[toRow][toCol] == " "
        ) {
          board[toRow][toCol] = "p";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          toCol == fromCol + 1 &&
          fromCol + 1 <= 7 &&
          toRow == fromRow - 1 &&
          "A" <= board[toRow][toCol] &&
          board[toRow][toCol] <= "Z"
        ) {
          board[toRow][toCol] = "p";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          toCol == fromCol - 1 &&
          0 <= fromCol - 1 &&
          toRow == fromRow - 1 &&
          "A" <= board[toRow][toCol] &&
          board[toRow][toCol] <= "Z"
        ) {
          board[toRow][toCol] = "p";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else {
          // alert(`INVALID MOVEMENT `);return;
          return { BD: board, f: false };
        }
      }

      //for black pawn
      if (board[fromRow][fromCol] == "P") {
        // console.log(fromRow+666,` `,fromCol,` `,toRow,` `,toCol,` `);
        if (
          toCol == fromCol &&
          toRow == fromRow + 1 &&
          board[toRow][toCol] == " "
        ) {
          board[toRow][toCol] = "P";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          fromRow == 1 &&
          toCol == fromCol &&
          toRow == 3 &&
          board[toRow][toCol] == " "
        ) {
          board[toRow][toCol] = "P";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          toCol == fromCol + 1 &&
          fromCol + 1 <= 7 &&
          toRow == fromRow + 1 &&
          "a" <= board[toRow][toCol] &&
          board[toRow][toCol] <= "z"
        ) {
          board[toRow][toCol] = "P";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else if (
          toCol == fromCol - 1 &&
          0 <= fromCol - 1 &&
          toRow == fromRow + 1 &&
          "a" <= board[toRow][toCol] &&
          board[toRow][toCol] <= "z"
        ) {
          board[toRow][toCol] = "P";
          board[fromRow][fromCol] = " ";
          return { BD: board, f: true };
        } else {
          //alert(`INVALID INPUT black pawn`);
          return { BD: board, f: false };
        }
      }
    } else {
      //alert(`you cannot choose this item`);
      return { BD: board, f: false };
    }
  }
}
