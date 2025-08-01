class LightsOut extends GameEngine {
    inputHandler(playerTurn) {
        return new Promise((resolve) => {
            // Add input interface to the existing document
            const inputContainer = document.createElement('div');
            inputContainer.className = 'input-container';
            inputContainer.innerHTML = `
              <div class="player-turn">
                💡 Your Turn - Toggle Lights
              </div>
              <h3>Choose Light to Click</h3>
              <div class="input-row">
                <input type="text" class="move-input" id="moveInput" placeholder="rc" maxlength="2" autocomplete="off">
                <button class="game-button play-btn" id="playBtn">Toggle Light</button>
                <button class="game-button exit-btn" id="exitBtn">Exit Game</button>
              </div>
              <div class="input-instructions">
                Enter row and column (0–4) • Example: 02 for row 0, column 2
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

            // Auto-format input (only allow numbers 0-4)
            moveInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-4]/g, '');
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
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: titleGlow 2s ease-in-out infinite alternate;
          }
          
          @keyframes titleGlow {
            from { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
            to { text-shadow: 2px 2px 25px rgba(96,163,217,0.9), 0 0 40px rgba(255,255,0,0.5); }
          }
          
          .board-container {
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1200px;
          }
          
          .board {
            display: grid;
            grid-template-columns: repeat(5, 80px);
            grid-template-rows: repeat(5, 80px);
            gap: 8px;
            padding: 20px;
            background: linear-gradient(145deg, #60A3D9, #0074B7);
            border-radius: 20px;
            box-shadow: 
              0 25px 50px rgba(0,0,0,0.3),
              inset 0 2px 4px rgba(255,255,255,0.2);
            transform: rotateX(5deg) rotateY(-2deg);
            animation: boardFloat 6s ease-in-out infinite;
          }
          
          @keyframes boardFloat {
            0%, 100% { transform: rotateX(5deg) rotateY(-2deg) translateY(0px); }
            50% { transform: rotateX(5deg) rotateY(-2deg) translateY(-10px); }
          }
          
          .light-cell {
            width: 80px;
            height: 80px;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            border: 3px solid transparent;
          }
          
          .light-cell:hover {
            transform: scale(1.05);
            border-color: rgba(255,255,255,0.5);
          }
          
          .light-on {
            background: linear-gradient(145deg, #FFD700, #FFA500);
            box-shadow: 
              0 0 20px rgba(255,215,0,0.8),
              inset 0 2px 4px rgba(255,255,255,0.3);
            animation: lightGlow 2s ease-in-out infinite alternate;
          }
          
          @keyframes lightGlow {
            from { 
              box-shadow: 
                0 0 20px rgba(255,215,0,0.8),
                inset 0 2px 4px rgba(255,255,255,0.3);
            }
            to { 
              box-shadow: 
                0 0 35px rgba(255,215,0,1),
                inset 0 2px 4px rgba(255,255,255,0.5);
            }
          }
          
          .light-off {
            background: linear-gradient(145deg, #003B73, #001122);
            box-shadow: 
              inset 0 4px 8px rgba(0,0,0,0.5),
              0 2px 4px rgba(0,0,0,0.2);
          }
          
          .light-cell::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border-radius: 50%;
            pointer-events: none;
          }
          
          .light-on::before {
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
            animation: bulbShine 3s ease-in-out infinite alternate;
          }
          
          @keyframes bulbShine {
            from { opacity: 0.8; }
            to { opacity: 1; }
          }
          
          .light-off::before {
            background: radial-gradient(circle, rgba(96,163,217,0.2) 0%, transparent 70%);
          }
          
          .light-cell::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            pointer-events: none;
            transition: all 0.3s ease;
          }
          
          .light-on::after {
            background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,215,0,0.5));
            box-shadow: 0 0 15px rgba(255,255,255,0.8);
          }
          
          .light-off::after {
            background: radial-gradient(circle, rgba(0,59,115,0.8), rgba(0,0,0,0.9));
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
          }
          
          .coord-label {
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 8px;
            color: rgba(191,215,237,0.5);
            font-weight: bold;
            pointer-events: none;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          }
          
          .light-on .coord-label {
            color: rgba(0,59,115,0.7);
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
          }
          
          .recently-clicked {
            animation: clickEffect 0.6s ease-out;
          }
          
          @keyframes clickEffect {
            0% { 
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255,215,0,0.7);
            }
            50% { 
              transform: scale(1.15);
              box-shadow: 0 0 0 20px rgba(255,215,0,0);
            }
            100% { 
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255,215,0,0);
            }
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
            font-size: 3.5rem;
            color: #FFD700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: victoryBounce 2s ease-in-out infinite;
            z-index: 1000;
          }
          
          @keyframes victoryBounce {
            0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.2) rotate(5deg); }
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
          }
          
          .play-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(255,215,0,0.6);
            background: linear-gradient(145deg, #FFA500, #FFD700);
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
            background: rgba(255,215,0,0.1);
            padding: 8px 12px;
            border-radius: 8px;
            border-left: 3px solid rgba(255,215,0,0.5);
          }
        </style>
      `);

        document.write("<title>Lights Out - Game Engine</title>");
        document.write('<div class="game-title">💡 Lights Out 🔦</div>');
        document.write('<div class="board-container">');
        document.write('<div class="board">');

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let cellValue = board[i][j];
                let cellClasses = "light-cell";

                if (cellValue === 1) {
                    cellClasses += " light-on";
                } else {
                    cellClasses += " light-off";
                }

                let cell = `
          <div class="${cellClasses}" data-row="${i}" data-col="${j}">
            <span class="coord-label">${i}${j}</span>
          </div>
        `;
                document.write(cell);
            }
        }

        document.write('</div></div>');
        document.write('<div class="game-info">Click a light to toggle it and adjacent lights • Turn all lights OFF to win</div>');
        document.close();
    }

    // Input: rc
    controller(board, input, playerTurn) {
        if ([...input].length !== 2) {
            return { f: false, BD: board };
        }

        let row = parseInt(input[0]);
        let col = parseInt(input[1]);

        if (isNaN(row) || isNaN(col) || row < 0 || row > 4 || col < 0 || col > 4) {
            return { f: false, BD: board };
        }

        // Toggle the clicked light and adjacent lights
        let newBoard = board.map(row => [...row]);

        // Directions: up, down, left, right, center
        let directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]
        ];

        directions.forEach(([dr, dc]) => {
            let newRow = row + dr;
            let newCol = col + dc;

            if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
                newBoard[newRow][newCol] = 1 - newBoard[newRow][newCol]; // Toggle 0->1, 1->0
            }
        });

        return { f: true, BD: newBoard };
    }
}