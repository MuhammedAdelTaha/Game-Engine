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
    await new Promise((resolve) => setTimeout(resolve, 300));

    while (true) {
      let input = prompt("Enter the input of the game (E for Exit)");
      if (input == "E") break;

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
async function play() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let check;
  while (true) {
    check = prompt(
      "1- TicTacToe \n2- Connect4 \n3- Checkers \n4- Chess \n5- Sudoku \n6- EightQueens\n7- Exit\n" +
        "===============*** notes ***===============\n" +
        "** For Tic-Tac-Toe, 8-Queens enter the cell number (like 00)\n" +
        "** For Connect-4 enter the column number (like 0)\n" +
        "** For Checkers, Chess enter the from cell number, comma and to cell number (like 00,11)\n" +
        "** For Sudoku enter the cell number, comma and the number to put in the cell (like 00,0)"
    );
    check = parseInt(check);
    if (!isNaN(check) && check >= 1 && check <= 7) break;
  }
  if (check == 7) return;

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
        .fill()
        .map(() => Array(7).fill(" "));
      game = new Connect4();
      break;
    }
    case 3: {
      board = [
        [" ", "b", " ", "b", " ", "b", " ", "b"],
        ["b", " ", "b", " ", "b", " ", "b", " "],
        [" ", "b", " ", "b", " ", "b", " ", "b"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        ["w", " ", "w", " ", "w", " ", "w", " "],
        [" ", "w", " ", "w", " ", "w", " ", "w"],
        ["w", " ", "w", " ", "w", " ", "w", " "],
      ];
      game = new Checkers();
      break;
    }
    case 4: {
      board = [
        ["R", "N", "B", "Q", "K", "B", "N", "R"],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["r", "n", "b", "q", "k", "b", "n", "r"],
      ];
      game = new Chess();
      break;
    }
    case 5: {
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
    case 6: {
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
  }
  /**
   * Start the game
   */
  if (board != null) {
    game.gameLoop(board);
  }
}
play();
