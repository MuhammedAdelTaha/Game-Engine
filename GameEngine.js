class GameEngine {
  drawer(board) {
    console.log(board);
  }

  controller(board, input, playerTurn) {
    console.log(board);
    console.log(input);
    console.log(playerTurn);
  }

  async gameLoop(board) {
    let playerTurn = true;
    this.drawer(board);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    while (true) {
      let input = prompt("Enter the input of the game (E for Exit)");
      if (input.toLowerCase() === "e") break;

      let result = this.controller(board, input, playerTurn);
      if (result.f) {
        board = result.BD;
        this.drawer(board);
        playerTurn = !playerTurn;
      } else {
        alert("Error....");
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
