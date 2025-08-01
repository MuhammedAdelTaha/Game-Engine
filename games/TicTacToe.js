class TicTacToe extends GameEngine {
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
    document.write('<div class="game-info">Choose your cell coordinates • Get 3 in a row, column or diagonal to win • Input Format: rc • E to exit</div>');
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
