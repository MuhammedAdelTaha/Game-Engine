class Sudoku extends GameEngine {
  drawer(board) {
    document.open();
    document.write(`
        <style>
          body {
            height: 100vh;
            margin: 0;
            font-family: 'Finger Paint', cursive;
            background: linear-gradient(135deg, #003B73 0%, #0074B7 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          
          .game-title {
            position: absolute;
            top: 15px;
            color: #BFD7ED;
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: titleGlow 2.5s ease-in-out infinite alternate;
          }
          
          @keyframes titleGlow {
            from { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
            to { text-shadow: 2px 2px 25px rgba(96,163,217,0.9), 0 0 35px rgba(0,116,183,0.6); }
          }
          
          .board-container {
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1200px;
          }
          
          .board {
            display: grid;
            grid-template-columns: repeat(9, 45px);
            grid-template-rows: repeat(9, 45px);
            gap: 1px;
            padding: 20px;
            background: linear-gradient(145deg, #60A3D9, #0074B7);
            border-radius: 15px;
            box-shadow: 
              0 25px 50px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,255,0.2);
            transform: rotateX(5deg) rotateY(-2deg);
            animation: boardFloat 8s ease-in-out infinite;
            position: relative;
          }
          
          @keyframes boardFloat {
            0%, 100% { transform: rotateX(5deg) rotateY(-2deg) translateY(0px); }
            33% { transform: rotateX(3deg) rotateY(0deg) translateY(-5px); }
            66% { transform: rotateX(7deg) rotateY(-4deg) translateY(-8px); }
          }
          
          .board::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            background: linear-gradient(145deg, #BFD7ED, #ffffff);
            border-radius: 10px;
            z-index: 0;
          }
          
          .board-cell {
            width: 45px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1;
            border-radius: 6px;
            background: linear-gradient(145deg, #ffffff, #BFD7ED);
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              inset -2px -2px 4px rgba(255,255,255,0.8);
          }
          
          .board-cell:hover {
            transform: scale(1.08);
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              inset -2px -2px 4px rgba(255,255,255,0.8),
              0 5px 15px rgba(0,116,183,0.3);
            z-index: 10;
          }
          
          /* 3x3 Box boundaries */
          .board-cell[data-row="2"], 
          .board-cell[data-row="5"] {
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              inset -2px -2px 4px rgba(255,255,255,0.8),
              0 3px 0 #0074B7;
          }
          
          .board-cell[data-col="2"], 
          .board-cell[data-col="5"] {
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              inset -2px -2px 4px rgba(255,255,255,0.8),
              3px 0 0 #0074B7;
          }
          
          .board-cell[data-row="2"][data-col="2"],
          .board-cell[data-row="2"][data-col="5"],
          .board-cell[data-row="5"][data-col="2"],
          .board-cell[data-row="5"][data-col="5"] {
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              inset -2px -2px 4px rgba(255,255,255,0.8),
              3px 3px 0 #0074B7;
          }
          
          .number {
            font-size: 1.8rem;
            font-weight: bold;
            position: relative;
            animation: numberEntry 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          @keyframes numberEntry {
            from { 
              transform: scale(0) rotate(180deg);
              opacity: 0;
            }
            to { 
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          .number.given {
            color: transparent;
            background: linear-gradient(135deg, #003B73, #0074B7);
            background-clip: text;
            -webkit-background-clip: text;
            text-shadow: 2px 2px 4px rgba(0,59,115,0.3);
          }
          
          .number.user {
            color: transparent;
            background: linear-gradient(135deg, #60A3D9, #BFD7ED);
            background-clip: text;
            -webkit-background-clip: text;
            text-shadow: 2px 2px 4px rgba(96,163,217,0.3);
            animation: userNumberPulse 2s ease-in-out infinite alternate;
          }
          
          @keyframes userNumberPulse {
            from { 
              transform: scale(1);
              filter: brightness(1);
            }
            to { 
              transform: scale(1.1);
              filter: brightness(1.2);
            }
          }
          
          .number:hover {
            animation: numberBounce 0.6s ease-in-out;
          }
          
          @keyframes numberBounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.3) rotate(5deg); }
          }
          
          .number::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%);
            z-index: -1;
            animation: numberGlow 3s ease-in-out infinite alternate;
          }
          
          @keyframes numberGlow {
            from { 
              opacity: 0.3; 
              transform: translate(-50%, -50%) scale(0.8);
            }
            to { 
              opacity: 0.7; 
              transform: translate(-50%, -50%) scale(1.2);
            }
          }
          
          .empty-cell {
            position: relative;
          }
          
          .empty-cell::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 25px;
            height: 25px;
            border: 2px dashed rgba(0,116,183,0.3);
            border-radius: 50%;
            opacity: 0;
            transition: all 0.3s ease;
          }
          
          .empty-cell:hover::after {
            opacity: 1;
            animation: targetPulse 1s ease-in-out infinite;
          }
          
          @keyframes targetPulse {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1);
              border-color: rgba(0,116,183,0.3);
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.3);
              border-color: rgba(0,116,183,0.8);
            }
          }
          
          .coord-label {
            position: absolute;
            bottom: 1px;
            right: 1px;
            font-size: 6px;
            color: rgba(0,116,183,0.5);
            font-weight: bold;
            pointer-events: none;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
          }
          
          .conflict {
            background: linear-gradient(145deg, #ffebee, #ffcdd2) !important;
            animation: conflictShake 0.5s ease-in-out;
          }
          
          @keyframes conflictShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
          }
          
          .valid-number {
            animation: validGlow 1s ease-in-out;
          }
          
          @keyframes validGlow {
            0% { box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.8); }
            50% { box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.8), 0 0 20px rgba(96,163,217,0.8); }
            100% { box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.8); }
          }
          
          .game-info {
            position: absolute;
            bottom: 15px;
            color: #BFD7ED;
            font-size: 0.95rem;
            text-align: center;
            opacity: 0.9;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          }
          
          .completion-effect {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            color: #60A3D9;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: completionBounce 2s ease-in-out infinite;
            z-index: 1000;
          }
          
          @keyframes completionBounce {
            0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.2) rotate(5deg); }
          }
          
          .highlight-row,
          .highlight-col,
          .highlight-box {
            background: linear-gradient(145deg, #e3f2fd, #bbdefb) !important;
            animation: highlightPulse 2s ease-in-out infinite alternate;
          }
          
          @keyframes highlightPulse {
            from { opacity: 0.7; }
            to { opacity: 1; }
          }
        </style>
      `);

    document.write("<title>Sudoku - Game Engine</title>");
    document.write('<div class="game-title">🔢 Sudoku 🧩</div>');
    document.write('<div class="board-container">');
    document.write('<div class="board">');

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let cellClasses = "board-cell";
        let cellContent = "";

        if (board[i][j] === " ") {
          cellClasses += " empty-cell";
          cellContent = `<span class="coord-label">${i}${j}</span>`;
        } else {
          // Assuming numbers 1-9 are given numbers (you can modify this logic)
          cellContent = `<div class="number given">${board[i][j]}</div>`;
        }

        let cell = `
          <div class="${cellClasses}" data-row="${i}" data-col="${j}">
            ${cellContent}
          </div>
        `;
        document.write(cell);
      }
    }

    document.write('</div></div>');
    document.write('<div class="game-info">Fill empty cells with numbers 1–9 • No repeats in rows, columns, or boxes • Input Format: rc,n • E to exit</div>');
    document.close();
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
    if ([...input].length !== 4) {
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
