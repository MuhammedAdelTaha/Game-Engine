class GameEngine {
  inputHandler(playerTurn) {
    return new Promise((resolve) => {
      let input = prompt("Enter the input of the game (E for Exit)");
      resolve(input);
    });
  }

  drawer(board) {
    console.log(board);
  }

  controller(board, input, playerTurn) {
    console.log(board);
    console.log(input);
    console.log(playerTurn);
  }

  showToast(message, type = 'error') {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">⚠️</div>
      <div class="toast-content">
        <div class="toast-title">Invalid Move</div>
        <div class="toast-text">${message}</div>
      </div>
      <div class="toast-close" onclick="this.parentElement.remove()">✕</div>
    `;

    // Add toast styles
    const toastStyles = `
      <style id="toast-styles">
        .toast-message {
          position: fixed;
          top: 30px;
          right: 30px;
          min-width: 300px;
          max-width: 400px;
          background: linear-gradient(145deg, #dc3545, #c82333);
          color: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 
            0 15px 35px rgba(220,53,69,0.4),
            inset 0 2px 4px rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(15px);
          font-family: 'Finger Paint', cursive;
          z-index: 10000;
          animation: toastSlideIn 0.5s ease-out;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
        }

        .toast-error {
          background: linear-gradient(145deg, #dc3545, #c82333);
          box-shadow: 
            0 15px 35px rgba(220,53,69,0.4),
            inset 0 2px 4px rgba(255,255,255,0.2);
        }

        .toast-success {
          background: linear-gradient(145deg, #28a745, #20c997);
          box-shadow: 
            0 15px 35px rgba(40,167,69,0.4),
            inset 0 2px 4px rgba(255,255,255,0.2);
        }

        .toast-warning {
          background: linear-gradient(145deg, #ffc107, #fd7e14);
          color: #003B73;
          box-shadow: 
            0 15px 35px rgba(255,193,7,0.4),
            inset 0 2px 4px rgba(255,255,255,0.2);
        }

        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .toast-message:hover {
          transform: scale(1.02);
          box-shadow: 
            0 20px 45px rgba(220,53,69,0.5),
            inset 0 2px 4px rgba(255,255,255,0.3);
        }

        .toast-icon {
          font-size: 2rem;
          animation: toastIconBounce 2s ease-in-out infinite;
        }

        @keyframes toastIconBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .toast-content {
          flex: 1;
        }

        .toast-title {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 5px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }

        .toast-text {
          font-size: 0.9rem;
          opacity: 0.9;
          line-height: 1.3;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        .toast-close {
          font-size: 1.2rem;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          transition: all 0.3s ease;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.2);
        }

        .toast-close:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }

        .toast-auto-dismiss {
          animation: toastSlideIn 0.5s ease-out, toastSlideOut 0.5s ease-in 3.5s forwards;
        }

        @keyframes toastSlideOut {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
          }
        }

        @media (max-width: 768px) {
          .toast-message {
            top: 20px;
            right: 20px;
            left: 20px;
            min-width: auto;
          }
        }
      </style>
    `;

    // Add styles if not already present
    if (!document.getElementById('toast-styles')) {
      document.head.insertAdjacentHTML('beforeend', toastStyles);
    }

    // Add toast to the page
    document.body.appendChild(toast);

    // Auto-dismiss after 4 seconds
    toast.classList.add('toast-auto-dismiss');
    setTimeout(() => {
      if (toast && toast.parentElement) {
        toast.remove();
      }
    }, 4000);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.remove();
    });
  }

  async gameLoop(board) {
    let playerTurn = true;
    this.drawer(board);
    await new Promise((resolve) => setTimeout(resolve, 500));

    while (true) {
      let input = await this.inputHandler(playerTurn);
      if (input.toLowerCase() === "e") break;

      let result = this.controller(board, input, playerTurn);
      if (result.f) {
        board = result.BD;
        this.drawer(board);
        playerTurn = !playerTurn;
      } else {
        this.showToast("Please check your input and try again.");
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}

/**
 * Games Factor
 */
function play(check) {

  let game, board;
  switch (check) {
    case 1: {
      board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
      ];
      game = new TicTacToe();
      break;
    }
    case 2: {
      board = Array(6)
        .fill(undefined, undefined, undefined)
        .map(() => Array(7).fill(" "));
      game = new Connect4();
      break;
    }
    case 3: {
      board = [
        [" ", " ", "9", " ", " ", "2", " ", " ", " "],
        ["3", " ", " ", "9", " ", "8", " ", "5", "2"],
        ["2", " ", " ", " ", "7", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", "6", " ", "9", " "],
        [" ", "7", "2", " ", "1", " ", "8", "3", " "],
        [" ", "3", " ", "2", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", "8", " ", " ", " ", "1"],
        ["7", "1", " ", "6", " ", "5", " ", " ", "8"],
        [" ", " ", " ", "4", " ", " ", "5", " ", " "],
      ];
      game = new Sudoku();
      break;
    }
    case 4: {
      board = [
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
      ];
      game = new EightQueens();
      break;
    }
    case 5: {
      board = [
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
      ];
      game = new LightsOut();
      break;
    }
  }
  /**
   * Start the game
   */
  if (board != null) {
    game.gameLoop(board).then(() => window.location.reload());
  }
}
