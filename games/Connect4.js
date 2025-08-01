class Connect4 extends GameEngine {
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
            top: 20px;
            color: #BFD7ED;
            font-size: 2.8rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: titleGlow 2.5s ease-in-out infinite alternate;
          }
          
          @keyframes titleGlow {
            from { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
            to { text-shadow: 2px 2px 30px rgba(96,163,217,0.9), 0 0 40px rgba(255,215,0,0.4); }
          }
          
          .board-container {
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1200px;
          }
          
          .board {
            display: grid;
            grid-template-columns: repeat(7, 80px);
            grid-template-rows: repeat(6, 80px);
            gap: 8px;
            padding: 25px;
            background: linear-gradient(145deg, #0074B7, #003B73);
            border-radius: 20px;
            box-shadow: 
              0 30px 60px rgba(0,0,0,0.4),
              inset 0 2px 4px rgba(96,163,217,0.3);
            transform: rotateX(8deg) rotateY(-3deg);
            animation: boardFloat 7s ease-in-out infinite;
            position: relative;
          }
          
          @keyframes boardFloat {
            0%, 100% { transform: rotateX(8deg) rotateY(-3deg) translateY(0px); }
            33% { transform: rotateX(6deg) rotateY(-1deg) translateY(-8px); }
            66% { transform: rotateX(10deg) rotateY(-5deg) translateY(-12px); }
          }
          
          .board::before {
            content: '';
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            height: 20px;
            background: linear-gradient(145deg, #60A3D9, #0074B7);
            border-radius: 10px 10px 0 0;
            box-shadow: 0 -5px 15px rgba(0,0,0,0.2);
          }
          
          .board-cell {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #001f3d, #000814);
            box-shadow: 
              inset 0 4px 8px rgba(0,0,0,0.6),
              inset 0 -2px 4px rgba(96,163,217,0.2),
              0 2px 4px rgba(0,0,0,0.3);
            overflow: hidden;
          }
          
          .board-cell::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(96,163,217,0.3), transparent 60%);
            pointer-events: none;
          }
          
          .board-cell:hover {
            transform: scale(1.05);
            box-shadow: 
              inset 0 4px 8px rgba(0,0,0,0.6),
              inset 0 -2px 4px rgba(96,163,217,0.2),
              0 5px 20px rgba(0,116,183,0.4);
          }
          
          .game-piece {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            position: relative;
            animation: pieceEntry 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          @keyframes pieceEntry {
            from { 
              transform: translateY(-400px) scale(0.8);
              opacity: 0;
            }
            60% {
              transform: translateY(10px) scale(1.1);
              opacity: 1;
            }
            80% {
              transform: translateY(-5px) scale(0.95);
            }
            to { 
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }
          
          .game-piece:hover {
            animation: pieceBounce 0.6s ease-in-out;
          }
          
          @keyframes pieceBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15) translateY(-3px); }
          }
          
          .piece-x {
            background: linear-gradient(145deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
            border: 3px solid #FF6B35;
            box-shadow: 
              0 6px 12px rgba(255,140,0,0.4),
              inset 0 3px 6px rgba(255,255,255,0.6),
              inset 0 -3px 6px rgba(255,107,53,0.4);
          }
          
          .piece-o {
            background: linear-gradient(145deg, #60A3D9 0%, #0074B7 50%, #003B73 100%);
            border: 3px solid #BFD7ED;
            box-shadow: 
              0 6px 12px rgba(0,116,183,0.4),
              inset 0 3px 6px rgba(191,215,237,0.6),
              inset 0 -3px 6px rgba(0,59,115,0.4);
          }
          
          .game-piece::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            border-radius: 50%;
            background: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8), transparent 60%);
            pointer-events: none;
          }
          
          .game-piece::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.5), transparent);
            opacity: 0.8;
            pointer-events: none;
          }
          
          .column-indicator {
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 30px;
            background: linear-gradient(145deg, #BFD7ED, #60A3D9);
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            font-weight: bold;
            color: #003B73;
            opacity: 0;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .board-cell:hover .column-indicator {
            opacity: 1;
            transform: translateX(-50%) translateY(-5px);
          }
          
          .drop-zone {
            position: relative;
          }
          
          .drop-zone::after {
            content: '↓';
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.5rem;
            color: rgba(255,215,0,0.6);
            opacity: 0;
            transition: all 0.3s ease;
            animation: dropArrow 2s ease-in-out infinite;
          }
          
          @keyframes dropArrow {
            0%, 100% { transform: translateX(-50%) translateY(0px); opacity: 0.6; }
            50% { transform: translateX(-50%) translateY(5px); opacity: 1; }
          }
          
          .board-cell:hover.drop-zone::after {
            opacity: 1;
          }
          
          .winning-piece {
            animation: winningGlow 1s ease-in-out infinite alternate;
          }
          
          @keyframes winningGlow {
            from { 
              box-shadow: 
                0 6px 12px rgba(255,140,0,0.4),
                inset 0 3px 6px rgba(255,255,255,0.6),
                inset 0 -3px 6px rgba(255,107,53,0.4);
            }
            to { 
              box-shadow: 
                0 6px 25px rgba(255,140,0,0.8),
                inset 0 3px 6px rgba(255,255,255,0.6),
                inset 0 -3px 6px rgba(255,107,53,0.4),
                0 0 30px rgba(255,215,0,0.6);
            }
          }
          
          .coord-label {
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 8px;
            color: rgba(96,163,217,0.5);
            font-weight: bold;
            pointer-events: none;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          }
          
          .game-info {
            position: absolute;
            bottom: 20px;
            color: #BFD7ED;
            font-size: 1rem;
            text-align: center;
            opacity: 0.9;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          }
          
          .victory-effect {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: #FFD700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: victoryBounce 2s ease-in-out infinite;
            z-index: 1000;
          }
          
          @keyframes victoryBounce {
            0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.2) rotate(10deg); }
          }
          
          .connect-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(255,215,0,0.8), transparent);
            height: 4px;
            animation: connectLineGlow 1s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 100;
          }
          
          @keyframes connectLineGlow {
            from { opacity: 0.6; }
            to { opacity: 1; box-shadow: 0 0 20px rgba(255,215,0,0.8); }
          }
        </style>
      `);

    document.write("<title>Connect 4 - Game Engine</title>");
    document.write('<div class="game-title">🔴 Connect 4 🟡</div>');
    document.write('<div class="board-container">');
    document.write('<div class="board">');

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let cellValue = board[i][j];
        let cellClasses = "board-cell";
        let cellContent = "";

        // Add drop zone indicator for top row
        if (i === 0) {
          cellClasses += " drop-zone";
        }

        if (cellValue === "X") {
          cellContent = '<div class="game-piece piece-x"></div>';
        } else if (cellValue === "O") {
          cellContent = '<div class="game-piece piece-o"></div>';
        }

        let cell = `
          <div class="${cellClasses}" data-row="${i}" data-col="${j}">
            ${cellContent}
            <span class="coord-label">${i}${j}</span>
          </div>
        `;
        document.write(cell);
      }
    }

    document.write('</div></div>');
    document.write('<div class="game-info">Drop pieces by choosing a column • Get 4 in a row, column or diagonal to win • Input Format: c • E to exit</div>');
    document.close();
  }

  //input: c
  controller(board, input, playerTurn) {
    if ([...input].length !== 1) {
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
