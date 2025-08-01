class TicTacToe extends GameEngine {
  inputHandler(playerTurn) {
    return new Promise((resolve) => {
      // Add input interface to the existing document
      const inputContainer = document.createElement('div');
      inputContainer.className = 'input-container';
      inputContainer.innerHTML = `
        <div class="player-turn">
          ${playerTurn ? '✖️ Player X' : '⭕ Player O'} - Your Turn
        </div>
        <h3>Enter Your Move</h3>
        <div class="input-row">
          <input type="text" class="move-input" id="moveInput" placeholder="rc" maxlength="2" autocomplete="off">
          <button class="game-button play-btn" id="playBtn">Play Move</button>
          <button class="game-button exit-btn" id="exitBtn">Exit Game</button>
        </div>
        <div class="input-instructions">
          Enter row and column (0–2) • Example: 01 for row 0, column 1
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

      // Auto-format input (only allow numbers)
      moveInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-2]/g, '');
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
            font-size: 3rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: titleGlow 2s ease-in-out infinite alternate;
          }
          
          @keyframes titleGlow {
            from { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
            to { text-shadow: 2px 2px 25px rgba(96,163,217,0.9); }
          }
          
          .board-container {
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1200px;
          }
          
          .board {
            display: grid;
            grid-template-columns: repeat(3, 120px);
            grid-template-rows: repeat(3, 120px);
            gap: 8px;
            padding: 20px;
            background: linear-gradient(145deg, #60A3D9, #0074B7);
            border-radius: 20px;
            box-shadow: 
              0 25px 50px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,255,0.2);
            transform: rotateX(10deg) rotateY(-5deg);
            animation: boardFloat 8s ease-in-out infinite;
          }
          
          @keyframes boardFloat {
            0%, 100% { transform: rotateX(10deg) rotateY(-5deg) translateY(0px) scale(1); }
            25% { transform: rotateX(8deg) rotateY(-3deg) translateY(-8px) scale(1.02); }
            50% { transform: rotateX(12deg) rotateY(-7deg) translateY(-15px) scale(1.05); }
            75% { transform: rotateX(8deg) rotateY(-3deg) translateY(-8px) scale(1.02); }
          }
          
          .board-cell {
            width: 120px;
            height: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            background: linear-gradient(145deg, #BFD7ED, #ffffff);
            box-shadow: 
              inset 3px 3px 6px rgba(0,0,0,0.1),
              inset -3px -3px 6px rgba(255,255,255,0.8),
              0 4px 8px rgba(0,0,0,0.1);
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            overflow: hidden;
          }
          
          .board-cell:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 
              inset 3px 3px 6px rgba(0,0,0,0.1),
              inset -3px -3px 6px rgba(255,255,255,0.8),
              0 8px 20px rgba(0,116,183,0.3);
            background: linear-gradient(145deg, #ffffff, #BFD7ED);
          }
          
          .board-cell::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%);
            border-radius: 15px;
            pointer-events: none;
          }
          
          .symbol-x {
            font-size: 4rem;
            font-weight: bold;
            color: transparent;
            background: linear-gradient(135deg, #0074B7, #003B73);
            background-clip: text;
            -webkit-background-clip: text;
            text-shadow: 2px 2px 4px rgba(0,59,115,0.3);
            animation: symbolEntry 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            position: relative;
          }
          
          .symbol-o {
            font-size: 4rem;
            font-weight: bold;
            color: transparent;
            background: linear-gradient(135deg, #60A3D9, #0074B7);
            background-clip: text;
            -webkit-background-clip: text;
            text-shadow: 2px 2px 4px rgba(96,163,217,0.3);
            animation: symbolEntry 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            position: relative;
          }
          
          @keyframes symbolEntry {
            from { 
              transform: scale(0) rotate(180deg);
              opacity: 0;
            }
            to { 
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          .symbol-x::before,
          .symbol-o::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%);
            z-index: -1;
            animation: symbolGlow 2s ease-in-out infinite alternate;
          }
          
          @keyframes symbolGlow {
            from { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 0.7; transform: translate(-50%, -50%) scale(1.2); }
          }
          
          .symbol-x:hover,
          .symbol-o:hover {
            animation: symbolBounce 0.6s ease-in-out;
          }
          
          @keyframes symbolBounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(5deg); }
          }
          
          .coord-label {
            position: absolute;
            bottom: 5px;
            right: 5px;
            font-size: 12px;
            color: rgba(0,116,183,0.6);
            font-weight: bold;
            pointer-events: none;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
          }
          
          .empty-cell-effect {
            position: relative;
          }
          
          .empty-cell-effect::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 2px dashed rgba(0,116,183,0.3);
            border-radius: 50%;
            opacity: 0;
            transition: all 0.3s ease;
          }
          
          .empty-cell-effect:hover::after {
            opacity: 1;
            width: 60px;
            height: 60px;
            animation: pulseRing 1s ease-in-out infinite;
          }
          
          @keyframes pulseRing {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
          }
          
          .game-info {
            position: absolute;
            bottom: 20px;
            color: #BFD7ED;
            font-size: 1.2rem;
            text-align: center;
            opacity: 0.9;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          }
          
          .win-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, #60A3D9, transparent);
            animation: winLineGlow 1s ease-in-out infinite alternate;
          }
          
          @keyframes winLineGlow {
            from { box-shadow: 0 0 10px rgba(96,163,217,0.5); }
            to { box-shadow: 0 0 30px rgba(96,163,217,0.9); }
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
          
          .input-container h3 {
            color: #BFD7ED;
            margin: 0 0 15px 0;
            font-size: 1.4rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
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
            border: none;
            border-radius: 10px;
            background: rgba(255,255,255,0.9);
            color: #003B73;
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            font-family: 'Finger Paint', cursive;
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          
          .move-input:focus {
            outline: none;
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.1),
              0 0 0 3px rgba(96,163,217,0.5),
              0 2px 8px rgba(0,0,0,0.1);
            transform: scale(1.05);
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
            background: linear-gradient(145deg, #28a745, #20c997);
            color: white;
            box-shadow: 0 4px 15px rgba(40,167,69,0.3);
          }
          
          .play-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(40,167,69,0.4);
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
          }
          
          @keyframes playerTurnPulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; transform: scale(1.05); }
          }
          
          .input-instructions {
            color: rgba(191,215,237,0.8);
            font-size: 0.9rem;
            margin-top: 10px;
            line-height: 1.3;
          }
        </style>
      `);

    document.write("<title>Tic Tac Toe - Game Engine</title>");
    document.write('<div class="game-title">✖️ Tic Tac Toe ⭕</div>');
    document.write('<div class="board-container">');
    document.write('<div class="board">');

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cellContent = "";
        let cellClasses = "board-cell";

        if (board[i][j] === " ") {
          cellClasses += " empty-cell-effect";
          cellContent = `<span class="coord-label">${i}${j}</span>`;
        } else if (board[i][j] === "X") {
          cellContent = `<div class="symbol-x">✖</div>`;
        } else if (board[i][j] === "O") {
          cellContent = `<div class="symbol-o">⭕</div>`;
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
    document.write('<div class="game-info">Get three in a row, column or diagonal to win</div>');
    document.close();
  }

  //input: rc
  controller(board, input, playerTurn) {
    if ([...input].length !== 2) {
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
