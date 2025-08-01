class EightQueens extends GameEngine {
  inputHandler(playerTurn) {
    return new Promise((resolve) => {
      // Add input interface to the existing document
      const inputContainer = document.createElement('div');
      inputContainer.className = 'input-container';
      inputContainer.innerHTML = `
        <div class="player-turn">
          👑 Your Majesty—Place a Queen
        </div>
        <h3>Choose Queen Position</h3>
        <div class="input-row">
          <input type="text" class="move-input" id="moveInput" placeholder="rc" maxlength="2" autocomplete="off">
          <button class="game-button play-btn" id="playBtn">Place Queen</button>
          <button class="game-button exit-btn" id="exitBtn">Exit Game</button>
        </div>
        <div class="input-instructions">
          Enter row and column (0–7) • Example: 03 for row 0, column 3
        </div>
      `;

      document.body.appendChild(inputContainer);

      const moveInput = document.getElementById('moveInput');
      const playBtn = document.getElementById('playBtn');
      const exitBtn = document.getElementById('exitBtn');

      // Focus on input
      moveInput.focus();

      // Handle play button click
      playBtn.addEventListener('click', () => {
        const input = moveInput.value.trim();
        document.body.removeChild(inputContainer);
        resolve(input);
      });

      // Handle exit button click
      exitBtn.addEventListener('click', () => {
        document.body.removeChild(inputContainer);
        resolve('e');
      });

      // Handle Enter key press
      moveInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const input = moveInput.value.trim();
          document.body.removeChild(inputContainer);
          resolve(input);
        }
      });

      // Auto-format input (only allow numbers 0-7)
      moveInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-7]/g, '');
      });
    });
  }

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
          
          .input-container {
            position: fixed;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(145deg, #60A3D9, #0074B7);
            border-radius: 20px;
            padding: 25px 30px;
            box-shadow: 
              0 15px 35px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,255,0.2);
            border: 1px solid rgba(191,215,237,0.3);
            backdrop-filter: blur(15px);
            width: 320px;
            text-align: center;
            animation: slideInRight 0.5s ease-out;
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateY(-50%) translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateY(-50%) translateX(0);
            }
          }
          
          .input-container::before {
            content: '✨';
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 1.5rem;
            animation: royalSparkle 2s ease-in-out infinite;
          }
          
          .input-container::after {
            content: '👑';
            position: absolute;
            top: -15px;
            left: -15px;
            font-size: 1.8rem;
            animation: crownFloat 3s ease-in-out infinite;
          }
          
          @keyframes royalSparkle {
            0%, 100% { 
              opacity: 0.7;
              transform: scale(1) rotate(0deg);
            }
            50% { 
              opacity: 1;
              transform: scale(1.3) rotate(180deg);
            }
          }
          
          @keyframes crownFloat {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
            }
            50% { 
              transform: translateY(-5px) rotate(5deg);
            }
          }
          
          .input-container h3 {
            color: #BFD7ED;
            margin: 0 0 15px 0;
            font-size: 1.4rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            position: relative;
          }
          
          @keyframes queensDance {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
          }
          
          .input-row {
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }
          
          .move-input {
            width: 100px;
            height: 45px;
            border-radius: 10px;
            background: linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,215,0,0.1));
            color: #003B73;
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            font-family: 'Finger Paint', cursive;
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              0 2px 8px rgba(0,0,0,0.1),
              0 0 15px rgba(255,215,0,0.2);
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
          }
          
          .move-input:focus {
            outline: none;
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              0 0 0 3px rgba(255,215,0,0.5),
              0 2px 8px rgba(0,0,0,0.1),
              0 0 25px rgba(255,215,0,0.4);
            transform: scale(1.05);
            border-color: rgba(255,215,0,0.6);
            background: linear-gradient(145deg, rgba(255,255,255,1), rgba(255,215,0,0.15));
          }
          
          .move-input::before {
            content: '♛';
            position: absolute;
            top: -8px;
            right: -8px;
            font-size: 0.8rem;
            color: rgba(255,215,0,0.6);
            animation: inputQueen 2s ease-in-out infinite;
          }
          
          @keyframes inputQueen {
            0%, 100% { 
              opacity: 0.6;
              transform: scale(1) rotate(0deg);
            }
            50% { 
              opacity: 1;
              transform: scale(1.2) rotate(10deg);
            }
          }
          
          .game-button {
            height: 45px;
            padding: 0 20px;
            border: none;
            border-radius: 10px;
            font-family: 'Finger Paint', cursive;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .play-btn {
            background: linear-gradient(145deg, #FFD700, #FFA500);
            color: #003B73;
            box-shadow: 0 4px 15px rgba(255,215,0,0.4);
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
            border: 2px solid rgba(255,165,0,0.3);
          }
          
          .play-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(255,215,0,0.6);
            background: linear-gradient(145deg, #FFA500, #FFD700);
            border-color: rgba(255,165,0,0.6);
          }
          
          .play-btn::before {
            content: '👑';
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.9rem;
            animation: buttonCrown 2s ease-in-out infinite;
          }
          
          @keyframes buttonCrown {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
          }
          
          .exit-btn {
            background: linear-gradient(145deg, #dc3545, #c82333);
            color: white;
            box-shadow: 0 4px 15px rgba(220,53,69,0.3);
          }
          
          .exit-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(220,53,69,0.4);
          }
          
          .player-turn {
            color: #BFD7ED;
            font-size: 1.1rem;
            margin-bottom: 15px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            animation: playerTurnPulse 2s ease-in-out infinite;
            position: relative;
          }
          
          .player-turn::before {
            content: '✨';
            position: absolute;
            left: -25px;
            top: 50%;
            transform: translateY(-50%);
            animation: leftSparkle 2s ease-in-out infinite;
          }
          
          .player-turn::after {
            content: '✨';
            position: absolute;
            right: -25px;
            top: 50%;
            transform: translateY(-50%);
            animation: rightSparkle 2s ease-in-out infinite 1s;
          }
          
          @keyframes leftSparkle {
            0%, 100% { opacity: 0.5; transform: translateY(-50%) rotate(0deg); }
            50% { opacity: 1; transform: translateY(-50%) rotate(180deg); }
          }
          
          @keyframes rightSparkle {
            0%, 100% { opacity: 0.5; transform: translateY(-50%) rotate(0deg); }
            50% { opacity: 1; transform: translateY(-50%) rotate(-180deg); }
          }
          
          @keyframes playerTurnPulse {
            0%, 100% { 
              opacity: 0.8; 
              text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.05);
              text-shadow: 1px 1px 2px rgba(0,0,0,0.3), 0 0 15px rgba(255,215,0,0.6);
            }
          }
          
          .input-instructions {
            color: rgba(191,215,237,0.8);
            font-size: 0.9rem;
            margin-top: 10px;
            line-height: 1.3;
            background: linear-gradient(145deg, rgba(255,215,0,0.1), rgba(255,165,0,0.05));
            padding: 10px 15px;
            border-radius: 10px;
            border-left: 3px solid rgba(255,215,0,0.5);
            border-top: 1px solid rgba(255,215,0,0.2);
            position: relative;
          }
          
          .input-instructions::before {
            content: '♛';
            position: absolute;
            top: -8px;
            left: 10px;
            font-size: 1rem;
            color: rgba(255,215,0,0.7);
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
    document.write('<div class="game-info">Place eight queens so none can attack each other</div>');
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
