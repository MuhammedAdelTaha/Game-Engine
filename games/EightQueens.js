class EightQueens extends GameEngine {
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
            animation: titleGlow 3s ease-in-out infinite alternate;
          }
          
          @keyframes titleGlow {
            from { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
            to { text-shadow: 2px 2px 30px rgba(96,163,217,0.9), 0 0 40px rgba(255,215,0,0.5); }
          }
          
          .board-container {
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1200px;
          }
          
          .board {
            display: grid;
            grid-template-columns: repeat(8, 70px);
            grid-template-rows: repeat(8, 70px);
            gap: 2px;
            padding: 15px;
            background: linear-gradient(145deg, #60A3D9, #0074B7);
            border-radius: 15px;
            box-shadow: 
              0 25px 50px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,255,0.2);
            transform: rotateX(8deg) rotateY(-3deg);
            animation: boardFloat 7s ease-in-out infinite;
          }
          
          @keyframes boardFloat {
            0%, 100% { transform: rotateX(8deg) rotateY(-3deg) translateY(0px); }
            33% { transform: rotateX(6deg) rotateY(-1deg) translateY(-8px); }
            66% { transform: rotateX(10deg) rotateY(-5deg) translateY(-12px); }
          }
          
          .board-cell {
            width: 70px;
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            position: relative;
            transition: all 0.3s ease;
            cursor: pointer;
            overflow: hidden;
          }
          
          .board-cell:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            z-index: 10;
          }
          
          .board-cell.white {
            background: linear-gradient(145deg, #BFD7ED, #ffffff);
            box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1);
          }
          
          .board-cell.black {
            background: linear-gradient(145deg, #003B73, #001f3d);
            box-shadow: inset 2px 2px 4px rgba(0,0,0,0.3);
          }
          
          .board-cell::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%);
            border-radius: 8px;
            pointer-events: none;
          }
          
          .queen {
            font-size: 3.5rem;
            color: transparent;
            background: linear-gradient(145deg, #FFD700 0%, #FFA500 50%, #FF6B6B 100%);
            background-clip: text;
            -webkit-background-clip: text;
            position: relative;
            animation: queenEntry 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          @keyframes queenEntry {
            from { 
              transform: scale(0) rotate(180deg);
              opacity: 0;
            }
            to { 
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          .queen:hover {
            animation: queenDance 0.8s ease-in-out;
            filter: drop-shadow(0 0 15px rgba(255,215,0,0.8));
          }
          
          @keyframes queenDance {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-5deg); }
            50% { transform: scale(1.2) rotate(0deg); }
            75% { transform: scale(1.1) rotate(5deg); }
          }
          
          .queen::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,215,0,0.3), transparent 70%);
            animation: crownGlow 2s ease-in-out infinite alternate;
            z-index: -1;
          }
          
          @keyframes crownGlow {
            from { 
              opacity: 0.3; 
              transform: translate(-50%, -50%) scale(0.8);
            }
            to { 
              opacity: 0.8; 
              transform: translate(-50%, -50%) scale(1.3);
            }
          }
          
          .queen::after {
            content: '✨';
            position: absolute;
            top: -15px;
            right: -10px;
            font-size: 1rem;
            animation: sparkle 2s ease-in-out infinite;
            opacity: 0.7;
          }
          
          @keyframes sparkle {
            0%, 100% { 
              opacity: 0.7;
              transform: scale(1) rotate(0deg);
            }
            50% { 
              opacity: 1;
              transform: scale(1.2) rotate(180deg);
            }
          }
          
          .coord-label {
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 8px;
            color: rgba(0,0,0,0.4);
            font-weight: bold;
            pointer-events: none;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
          }
          
          .board-cell.black .coord-label {
            color: rgba(191,215,237,0.5);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          }
          
          .empty-cell-indicator {
            opacity: 0;
            transition: all 0.3s ease;
            width: 30px;
            height: 30px;
            border: 2px dashed rgba(255,215,0,0.4);
            border-radius: 50%;
            position: relative;
          }
          
          .board-cell:hover .empty-cell-indicator {
            opacity: 1;
            animation: targetPulse 1s ease-in-out infinite;
          }
          
          @keyframes targetPulse {
            0%, 100% { 
              transform: scale(1);
              border-color: rgba(255,215,0,0.4);
            }
            50% { 
              transform: scale(1.2);
              border-color: rgba(255,215,0,0.8);
            }
          }
          
          .attack-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(255,107,107,0.3), transparent);
            height: 2px;
            animation: attackLineFlash 2s ease-in-out infinite;
            pointer-events: none;
          }
          
          @keyframes attackLineFlash {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
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
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
          }
          
          .solution-highlight {
            animation: solutionGlow 1s ease-in-out infinite alternate;
          }
          
          @keyframes solutionGlow {
            from { 
              box-shadow: 0 0 10px rgba(255,215,0,0.5);
              transform: scale(1);
            }
            to { 
              box-shadow: 0 0 25px rgba(255,215,0,0.9);
              transform: scale(1.05);
            }
          }
        </style>
      `);

    document.write("<title>Eight Queens - Game Engine</title>");
    document.write('<div class="game-title">👑 Eight Queens 👑</div>');
    document.write('<div class="board-container">');
    document.write('<div class="board">');

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let cellClasses = "board-cell";
        let cellContent = "";

        if ((i + j) % 2 === 0) {
          cellClasses += " white";
        } else {
          cellClasses += " black";
        }

        if (board[i][j] === "Q") {
          cellContent = '<div class="queen">♛</div>';
        } else {
          cellContent = '<div class="empty-cell-indicator"></div>';
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
    document.write('<div class="game-info">Place eight queens so none can attack each other • Enter coordinates to place • Input Format: rc • E to exit</div>');
    document.close();
  }

  //input: rc
  controller(board, input, playerTurn) {
    if ([...input].length !== 2) {
      return { BD: board, f: false };
    }
    let Row = parseInt(input[0]);
    let Col = parseInt(input[1]);
    if (isNaN(Row) || isNaN(Col) || Row > 7 || Row < 0 || Col > 7 || Col < 0) {
      //alert('Wrong Input');
      return { BD: board, f: false };
    } else if (board[Row][Col] === "Q") {
      return { BD: board, f: false };
    } else if (board[Row][Col] === "n") {
      return { BD: board, f: false };
    } else {
      board[Row][Col] = "Q";
      //get all valid cells that can queen move to and write it in an array as n
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (board[i][j] !== "Q") {
            if (
              i === Row ||
              j === Col ||
              i - j === Row - Col ||
              i + j === Row + Col
            ) {
              board[i][j] = "n";
            }
          }
        }
      }
      return { BD: board, f: true };
    }
  }
}
