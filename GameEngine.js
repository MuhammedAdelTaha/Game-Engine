class gameEngine{
  
  constructor() {
    this.board = null;
    this.playerTurn=true;
  }

  drawer() {
       throw new Error('Method "drawer" must be implemented');
   }

   controller() {
      throw new Error('Method "controller" must be implemented');
   }

  async Game_loop(){
    await new Promise(resolve => setTimeout(resolve, 1000));
    while(true){
      while(true){
        var check = prompt('1- TicTacToe \n2- Connect4 \n3- Checkers \n4- Chess \n5- Sudoku \n6- EightQueens \n7- Exit');
        check = parseInt(check);
        if(check >= 1 && check <= 7) break;
      }
      if(check === 7) break;
      var game;
      switch(check){
        case(1):{
          this.board = [
                [' ',' ',' '],
                [' ',' ',' '],
                [' ',' ',' ']
          ];
          game = new TicTacToe(); break;
        }
        case(2):{
          this.board = Array(6).fill().map(() => Array(7).fill(' '));
          game = new Connect4(); break;
        }
        case(3):{
          this.board = [      
            [' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
            ['b', ' ', 'b', ' ', 'b', ' ', 'b', ' '],
            [' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['w', ' ', 'w', ' ', 'w', ' ', 'w', ' '],
            [' ', 'w', ' ', 'w', ' ', 'w', ' ', 'w'],
            ['w', ' ', 'w', ' ', 'w', ' ', 'w', ' ']
          ];
          game = new Checkers(); break;
        }
        case(4):{
          this.board = [      
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
          ];
          game = new Chess(); break;
        }
        case(5):{
          this.board = [
            [' ', ' ', '9', ' ', ' ', '2', ' ', ' ', ' '],
            ['3', ' ', ' ', '9', ' ', '8', ' ', '5', '2'],
            ['2', ' ', ' ', ' ', '7', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', '6', ' ', '9', ' '],
            [' ', '7', '2', ' ', '1', ' ', '8', '3', ' '],
            [' ', '3', ' ', '2', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', '8', ' ', ' ', ' ', '1'],
            ['7', '1', ' ', '6', ' ', '5', ' ', ' ', '8'],
            [' ', ' ', ' ', '4', ' ', ' ', '5', ' ', ' ']
          ]
          game = new Sudoku(); break;
        }
        case(6):{
          this.board = [      
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
          ];
          game = new EightQueens(); 
          break;
        }
      }
      game.drawer(this.board);
      await new Promise(resolve => setTimeout(resolve, 500));
      let play = true;
      while(play){
        let result=null;
        switch(check){
          //XO
          case(1):{
            let row = prompt('Please, Enter a cell row (enter E to Exit)');
            if(row === 'E') {
              play = false; break;
            }
            let col = prompt('Please, Enter a cell column');
            result=game.controller(this.board,row, col,this.playerTurn);
            break;
          }
          //connect4
          case(2):{
            let col = prompt('Please, Enter a cell column (enter E to Exit)');
            if(col === 'E'){
              play = false; break;
            }
            result=game.controller(this.board, col,this.playerTurn);
            break;
          }
          //checker
          case(3):{
            let fromRow = prompt('Please, Enter a cell row to move from (enter E to Exit)');
            if(fromRow === 'E'){
              play = false; break;
            }
            let fromCol = prompt('Please, Enter a cell column to move from');
            let toRow = prompt('Please, Enter a cell row to move to');
            let toCol = prompt('Please, Enter a cell column to move to');
            result=game.controller(this.board,fromRow, fromCol, toRow, toCol,this.playerTurn);
            break;
          }
          //chess
          case(4):{
            let fromRow = prompt('Please, Enter a cell row to move from (enter E to Exit)');
            if(fromRow === 'E'){
              play = false; break;
            }
            let fromCol = prompt('Please, Enter a cell column to move from');
            let toRow = prompt('Please, Enter a cell row to move to');
            let toCol = prompt('Please, Enter a cell column to move to');
            result=game.controller(this.board,fromRow, fromCol, toRow, toCol,this.playerTurn);
            break;
          }
          //sudoko
          case(5):{
            let row = prompt('Please, Enter a cell row (enter E to Exit)');
            if(row === 'E'){
              play = false; break;
            }
            let col = prompt('Please, Enter a cell column');
            let num = prompt('Please, Enter a number from 1 to 9');
            result= game.controller(this.board,row, col, num);
            break;
          }
          //8-queens
          case(6):{
            let Row = prompt('Please, Enter a cell row (enter E to Exit)');
            if(Row === 'E'){
              play = false; break;
            }
            let Col = prompt('Please, Enter a cell column');
            result=game.controller(this.board,Row,Col);
            break;
          }
        }
        if(play==true){
            if(result.f!=7){
              Alerts(result.f);
            }else if(result.f==7){
              this.board=result.BD;
              game.drawer(this.board);
              this.playerTurn=!this.playerTurn;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
}

class TicTacToe extends gameEngine{

  drawer(board) {
    document.open(board);
    document.write(`
      <style>
        body {
          height: 100%;
          margin: 0;
          font-family: 'Finger Paint', cursive;
        }
        
        /* Style the board container with the background image */
        .board-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          background-image: url('assets/backgrounds/xo.png');
          background-repeat: 2;
          background-size: contain;
        }

        /* Style the board */
        .board {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          grid-template-rows: repeat(3, 100px);
          width: 100%;
          max-width: 300px;
          height: 100%;
          max-height: 300px;
          box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
          background-color: #fff; /* Add a white background color */
        }
        
        #pos{
          position: relative;
          bottom: 40%;
          right: 40%;
          color: #191919;
          font-size: 0.75rem;
        }

        /* Style the board cells */
        .board-cell {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 5em;
          font-weight: bold;
          border: 1px solid #000;
          color: #000; /* Set the text color to black */
          transition: background-color 0.2s ease-in-out; /* Add a smooth transition */
        }
      </style>
    `);

    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if(board[i][j] === ' '){
          document.write(`<div class="board-cell" data-row="${i}" data-col="${j}"><span id="pos">${i}${j}</span></div>`); continue;
        }
        document.write(`<div class="board-cell" data-row="${i}" data-col="${j}">${board[i][j]}</div>`);
      }
    }
    document.write('</div>');
    document.write('</div>');
    document.close();
  }
  
  controller(board,row, col,playerTurn) {
    row = parseInt(row);
    col = parseInt(col);
    let flag=7;
    if(isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
      //alert('Wrong Input');
      flag=0;
    }
    else if (board[row][col] === ' ') {
      if (playerTurn) {
        board[row][col] = 'X';
      } else {
        board[row][col] = 'O';
      }
    }
    else {
      //alert('This place is already occupied.');
      flag=1;
    }
    return { BD: board, f: flag };
  }
}

class Connect4 extends gameEngine{

  drawer(board) {
    document.open();
    document.write(`
      <style>
        body {
          height: 100%;
          margin: 0;
          font-family: 'Finger Paint', cursive;
        }

        .board-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('assets/backgrounds/checkers.jpg');
          background-repeat: 2;
          background-size: contain;
          height: 120vh;
        }
  
        .board {
          display: grid;
          grid-template-columns: repeat(${7}, 70px);
          grid-template-rows: repeat(${6}, 70px);
          background-color: blue;
          width: calc(70px * ${7});
          height: calc(70px * ${6});
          border: 2px solid #000;
          border-collapse: collapse;
          box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
        }
        
        .board-cell {
          display: flex;
          margin : 3px;
          justify-content: center;
          align-items: center;
          font-size: 0em;
          border: 1px solid #000;
          border-radius: 50%;
          background-color: white;
        }
      </style>
    `);

    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i <=5 ; i++) {
      for (let j = 0; j < 7; j++) {
        let cellValue = board[i][j];
        let backgroundColor = "white";
        if (cellValue === "X") {
          backgroundColor = "yellow";
        } 
        else if (cellValue === "O") {
          backgroundColor = "red";
        }
        let cell = `<div class="board-cell" data-row="${i}" data-col="${j}" style="background-color:${backgroundColor}">${cellValue}</div>`;
        document.write(cell);
      }
    }
    document.write('</div>');
    document.write('</div>');
    document.close();
  }

  controller(board,col,playerTurn) {
    col = parseInt(col);
    if(isNaN(col) || col < 0 || col > 6) {
      //alert('Wrong Input');
      return { BD: board, f: 0 };
    }
    
    // find the first empty cell in the given column
    let row = -1;
    for (let i = 5; i >= 0; i--) {
      if (board[i][col] === ' ') {
        row = i;
        break;
      }
    }
    
    if (row === -1) {
      //alert('This column is full.');
      return { BD: board, f: 4 };
    }
    
    // update the cell with the player's mark
    if (playerTurn) {
      board[row][col] = 'X';
    } else {
      board[row][col] = 'O';
    }

    return { BD: board, f: 7 };
  }
}

class Checkers extends gameEngine{
 
  drawer(board) {
    document.open();
    document.write(`
      <style>
        body {
          height: 100%;
          margin: 0;
          font-family: 'Finger Paint', cursive;
        }
        .board-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 120vh;
          background-image: url('assets/backgrounds/checkers.jpg');
          background-repeat: 2;
          background-size: contain;
        }
        .board {
          display: grid;
          margin-left: 10px;
          grid-template-columns: repeat(8, 70px);
          grid-template-rows: repeat(8, 70px);
          background-color: #d1a05f;
          width: calc(70px * 8);
          height: calc(70px * 8);
          border: 2px solid #000;
          border-collapse: collapse;
          box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
          background-color: #fff; /* Add a white background color */
        }
        #pos{
          position: relative;
          bottom: 40%;
          right: 35%;
          color: #191919;
          font-size: 0.65rem;
        }
        .board-cell {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0em;
          font-weight: bold;
          border: 1px solid #000;
          background-color: white;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        .board-cell.black {
          background-color: #aea2a2;
        }
        .selected {
          background-color: #ffffcc !important;
        }
      </style>
    `);

    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let cellValue = board[i][j];
        let cellClasses = 'board-cell';
        if ((i + j) % 2 === 0) {
          cellClasses += ' white';
        } 
        else {
          cellClasses += ' black';
        }
        let cellImgSrc = '';
        switch(cellValue) {
         case 'w':
          cellImgSrc = 'images/white.png';
          break;
         case 'b':
          cellImgSrc = 'images/black.png';
          break;
        }
        let cell = `<div class="${cellClasses}" style="background-image: url('${cellImgSrc}')" data-row="${i}" data-col="${j}"><span id="pos">${i}${j}</span></div>`; 
        document.write(cell);
      }
    }
    document.write('</div></div>');
    document.close();
  }

  controller(board,fromRow, fromCol, toRow, toCol,playerTurn) {
    fromRow = parseInt(fromRow); fromCol = parseInt(fromCol);
    toRow = parseInt(toRow); toCol = parseInt(toCol);
    if(isNaN(fromRow) || isNaN(fromCol) || isNaN(toRow) || isNaN(toCol) || fromRow > 7 || fromRow < 0 || fromCol > 7 || fromCol < 0 || toRow > 7 || toRow < 0 || toCol > 7 || toCol < 0){
      //alert('Wrong Input');
      return { BD: board, f: 0 };
    }
    else if( board[fromRow][fromCol]!='b' && board[fromRow][fromCol]!='w') {
      return { BD: board, f: 2 };
    }
    else if( (playerTurn && board[fromRow][fromCol]=='b') || (!playerTurn && board[fromRow][fromCol]=='w') ){
      if(board[fromRow][fromCol]=='b'){
        if( fromRow+1==toRow && (fromCol+1==toCol || fromCol-1== toCol) && board[toRow][toCol]==' '){
          board[toRow][toCol]=board[fromRow][fromCol];
          board[fromRow][fromCol]=' ';
          return { BD: board, f: 7 };
        }
        else if( fromRow+2==toRow &&( (fromCol+2==toCol &&board[fromRow+1][fromCol+1]=='w')
                ||(fromCol-2==toCol && board[fromRow+1][fromCol-1]=='w') )
                && board[toRow][toCol]==' '){
          if(toCol<fromCol){
            board[fromRow+1][fromCol-1]=' ';
          } 
          else{ 
            board[fromRow+1][fromCol+1]=' ';
          }
          board[toRow][toCol]=board[fromRow][fromCol];
          board[fromRow][fromCol]=' ';
          return { BD: board, f: 7 };
        }
        else{
          return { BD: board, f: 6 };
        }
      }
      else if(board[fromRow][fromCol]=='w'){
        if( fromRow-1==toRow && (fromCol+1==toCol || fromCol-1== toCol) && board[toRow][toCol]==' '){
          board[toRow][toCol]=board[fromRow][fromCol];
          board[fromRow][fromCol]=' ';
          return { BD: board, f: 7 };
        }
        else if( fromRow-2==toRow &&( (fromCol+2==toCol &&board[fromRow-1][fromCol+1]=='b')
                ||(fromCol-2==toCol && board[fromRow-1][fromCol-1]=='b') )
                && board[toRow][toCol]==' '){
          if(toCol<fromCol){
            board[fromRow-1][fromCol-1]=' ';
          }   
          else{
            board[fromRow-1][fromCol+1]=' ';
          }
          board[toRow][toCol]=board[fromRow][fromCol];
          board[fromRow][fromCol]=' ';
          return { BD: board, f: 7 };
        }
        else{
          return { BD: board, f: 6 };
        }
      }
    }
    else{
      return { BD: board, f: 3 };
    }
  }
}

class Chess extends gameEngine{
  
  drawer(board) {
    document.open();
    document.write(`
      <style>
        body {
          height: 100%;
          margin: 0;
          font-family: 'Finger Paint', cursive;
        }
        .board-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 120vh;
          background-image: url('assets/backgrounds/chess.jpg');
          background-repeat: 2;
          background-size: contain;
        }
        .board {
          display: grid;
          margin-left: 10px;
          grid-template-columns: repeat(8, 70px);
          grid-template-rows: repeat(8, 70px);
          background-color: #d1a05f;
          width: calc(70px * 8);
          height: calc(70px * 8);
          border: 2px solid #000;
          border-collapse: collapse;
          box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
          background-color: #fff; /* Add a white background color */
        }
        #pos{
          position: relative;
          bottom: 43%;
          right: 37%;
          color: #191919;
          font-size: 0.6rem;
        }
        .board-cell {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0em;
          font-weight: bold;
          border: 1px solid #000;
          background-color: white;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        .board-cell.black {
          background-color: #aea2a2;
        }
        .selected {
          background-color: #ffffcc !important;
        }
      </style>
    `);

    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let cellValue = board[i][j];
        let cellClasses = 'board-cell';
        if ((i + j) % 2 === 0) {
          cellClasses += ' white';
        } else {
          cellClasses += ' black';
        }
        let cellImgSrc = '';
        switch(cellValue) {
         case 'K':
           cellImgSrc = 'images/Bking.png';
           break;
         case 'Q':
           cellImgSrc = 'images/Bqueen.png';
           break
         case 'R':
           cellImgSrc = 'images/Brook.png';
           break;
         case 'B':
           cellImgSrc = 'images/Bbishop.png';
           break;
         case 'N':
           cellImgSrc = 'images/Bknight.png';
           break;
         case 'P':
           cellImgSrc = 'images/Bpawn.png';
           break;
         case 'k':
           cellImgSrc = 'images/Wking.png';
           break;
         case 'q':
           cellImgSrc = 'images/Wqueen.png';
           break;
         case 'r':
           cellImgSrc = 'images/Wrook.png';
           break;
         case 'b':
           cellImgSrc = 'images/Wbishop.png';
           break;
         case 'n':
           cellImgSrc = 'images/Wknight.png';
           break;
         case 'p':
           cellImgSrc = 'images/Wpawn.png';
           break;
        }
        let cell = `<div class="${cellClasses}" style="background-image: url('${cellImgSrc}')" data-row="${i}" data-col="${j}"><span id="pos">${i}${j}</span></div>`; 
        document.write(cell);
      }
    }
    document.write('</div></div>');
    document.close();
  }

  controller(board,fromRow, fromCol, toRow, toCol,playerTurn) {
    fromRow = parseInt(fromRow); fromCol = parseInt(fromCol);
    toRow = parseInt(toRow); toCol = parseInt(toCol);
    if(isNaN(fromRow) || isNaN(fromCol) || isNaN(toRow) || isNaN(toCol) || fromRow > 7 || fromRow < 0 || fromCol > 7 || fromCol < 0 || toRow > 7 || toRow < 0 || toCol > 7 || toCol < 0){
      //alert('Wrong Input');
      return { BD: board, f: 0 };
    }
    else if( !('A'<=board[fromRow][fromCol] && board[fromRow][fromCol]<='Z') &&
            !('a'<=board[fromRow][fromCol] && board[fromRow][fromCol]<='z')){
              return { BD: board, f: 2 };
    }
    else if( (playerTurn&&'A'<=board[fromRow][fromCol] && board[fromRow][fromCol]<='Z') ||
          (!playerTurn&&'a'<=board[fromRow][fromCol] && board[fromRow][fromCol]<='z') ){
        
            // Queen    q or Q    الملكة
            if (board[fromRow][fromCol] === 'q' || board[fromRow][fromCol] === 'Q') {
              // Check if the move is diagonal, horizontal, or vertical
              if ((Math.abs(toRow - fromRow) == Math.abs(toCol - fromCol)) || (toRow == fromRow) || (toCol == fromCol)) {
                const rowDistance = toRow - fromRow;
                const colDistance = toCol - fromCol;
            
                // Check if there are any pieces in the path
                let i = fromRow;
                let j = fromCol;
                const rowStep = rowDistance < 0 ? -1 : 1;
                const colStep = colDistance < 0 ? -1 : 1;
            
                while ((0 <= i && i <= 7 && 0 <= j && j <= 7) && (i !== toRow || j !== toCol)) {
                  i += rowStep;
                  j += colStep;
                  if ((board[fromRow][fromCol] === 'q' && 'a' <= board[i][j] && board[i][j] <= 'z') ||
                      (board[fromRow][fromCol] === 'Q' && 'A' <= board[i][j] && board[i][j] <= 'Z')) {
                          //alert(`Eating friend `);
                          return { BD: board, f: 5 };
                  }
                  if ((board[fromRow][fromCol] === 'q' && 'A' <= board[i][j] && board[i][j] <= 'Z') ||
                      (board[fromRow][fromCol] === 'Q' && 'a' <= board[i][j] && board[i][j] <= 'z')) {
                          board[toRow][toCol] = board[fromRow][fromCol];
                          board[fromRow][fromCol] = ' ';
                          return { BD: board, f: 7 };
                  }
                }
              
                // Check if there is a piece at the destination, and if it is of the opposite color
                if ((board[fromRow][fromCol] == 'q' && 'A' <= board[toRow][toCol] && board[toRow][toCol] <= 'Z') ||
                    (board[fromRow][fromCol] == 'Q' && 'a' <= board[toRow][toCol] && board[toRow][toCol] <= 'z') || 
                    board[toRow][toCol] == ' ') {
                  board[toRow][toCol] = board[fromRow][fromCol];    
                  board[fromRow][fromCol] = ' ';
                  return { BD: board, f: 7 };
                } else {
                  //alert('Invalid movement');
                  return { BD: board, f: 6 };
                }
              }else {
                //alert('Invalid movement');
                return { BD: board, f: 6 };
              }
            }
            
            //bishop  b or B    الفيل
            if (board[fromRow][fromCol] === 'b' || board[fromRow][fromCol] === 'B') {
              // Check if the move is diagonal
              if (Math.abs(toRow - fromRow) == Math.abs(toCol - fromCol)) {
                const rowDistance = toRow - fromRow;
                const colDistance = toCol - fromCol;

                // Check if there are any pieces in the path
                let i = fromRow;
                let j = fromCol;
                const rowStep = rowDistance < 0 ? -1 : 1;
                const colStep = colDistance < 0 ? -1 : 1;

                while (i != toRow && j != toCol ) {
                  i += rowStep;
                  j += colStep;

                  if ((board[fromRow][fromCol] == 'b' && 'a' <= board[toRow][toCol] && board[toRow][toCol] <= 'z' ) ||
                    (board[fromRow][fromCol] == 'B' &&  'A' <= board[toRow][toCol] && board[toRow][toCol] <= 'Z')) 
                    {
                      //alert(`Eating friend`);
                      return { BD: board, f: 5 };

                  }
                  if ((board[fromRow][fromCol] == 'b' && 'A' <= board[toRow][toCol] && board[toRow][toCol] <= 'Z' ) ||
                    (board[fromRow][fromCol] == 'B' &&  'a' <= board[toRow][toCol] && board[toRow][toCol] <= 'z')) {
                      board[toRow][toCol] = board[fromRow][fromCol];
                      board[fromRow][fromCol] = ' ';
                      return { BD: board, f: 7 };
                  }
                } 

                // Check if there is a piece at the destination, and if it is of the opposite color
                  if (board[toRow][toCol]==' ' || (board[fromRow][fromCol] == 'b' && 'A' <= board[toRow][toCol] && board[toRow][toCol] <= 'Z' ) ||
                    (board[fromRow][fromCol] == 'B' &&  'a' <= board[toRow][toCol] && board[toRow][toCol] <= 'z')) {
                      board[toRow][toCol] = board[fromRow][fromCol];
                      board[fromRow][fromCol] = ' ';
                      return { BD: board, f: 7};
                  } else {
                      //alert('Invalid movement: The destination contains a piece of the same color');
                      return { BD: board, f: 6 };
                  }
                }else{ 
                    //alert('Invalid movement: The bishop moves only diagonally');
                    return { BD: board, f: 6 };
                }
            } 

            //King    k or K    الملك
            if (board[fromRow][fromCol] == 'K' || board[fromRow][fromCol] == 'k') {
              // Determine the row and column distance
              const rowDistance = Math.abs(toRow - fromRow);
              const colDistance = Math.abs(toCol - fromCol);
            
              console.log(`row : `,rowDistance,` ,col `,colDistance);
            
              // Check if the move is valid for a king
              if ((rowDistance <= 1 && colDistance <= 1)) {
                // Check if there is a piece at the destination, and if it is of the opposite color
                if ((board[fromRow][fromCol] == 'k' && 'A' <= board[toRow][toCol] && board[toRow][toCol] <= 'Z') ||
                    (board[fromRow][fromCol] == 'K' && 'a' <= board[toRow][toCol] && board[toRow][toCol] <= 'z') || 
                    board[toRow][toCol] == ' ') {
                  board[toRow][toCol] = board[fromRow][fromCol];    
                  board[fromRow][fromCol] = ' ';
                  return { BD: board, f: 7 };
                } else {
                  //alert('Invalid movement wergwegwegwe');
                  return { BD: board, f: 6 };
                }
              } else {
                //alert('Invalid movement');
                return { BD: board, f: 6 };              
              }
            }
            
            //knight  N or n    حصان
            if (board[fromRow][fromCol] === 'n' || board[fromRow][fromCol] === 'N') {
              // Determine the row and column distance
              const rowDistance = Math.abs(toRow - fromRow);
              const colDistance = Math.abs(toCol - fromCol);
            
              console.log(`row : `,rowDistance,` ,col `,colDistance);
              // Check if the move is valid for a knight
              if ( (rowDistance == 1 && colDistance == 2) || (rowDistance == 2 && colDistance === 1) ) {
                // Check if there is a piece at the destination, and if it is of the opposite color
                if ((board[fromRow][fromCol] == 'n' && 'A' <= board[toRow][toCol] && board[toRow][toCol] <= 'Z' ) ||
                    (board[fromRow][fromCol] == 'N' &&  'a' <= board[toRow][toCol] && board[toRow][toCol] <= 'z')  
                    || (board[toRow][toCol]==' ') 
                  ){     
                  board[toRow][toCol] = board[fromRow][fromCol];
                  board[fromRow][fromCol] = ' ';
                  return { BD: board, f: 7 };
                } else {
                  //alert('Invalid movement nljknlknj');
                  return { BD: board, f: 6 };
                }
              } else {
                //alert('Invalid movement');
                return { BD: board, f: 6 };
              }

            }
            
            //rook   R or r     
            if (board[fromRow][fromCol] == 'r' || board[fromRow][fromCol] == 'R') {
                var end, cnst, tmp, i, j, tmp1 = 'R';
                var cap = true;
              
                if (board[fromRow][fromCol] == 'r') {
                  cap = false;
                  tmp1 = 'r';
                }
              
                i = fromRow;
                j = fromCol;
              
                if (fromCol == toCol && fromRow != toRow) {
                  end = toRow;
                  cnst = 0;
                  if (fromRow < toRow) {
                    tmp = 1;
                  } else if (fromRow > toRow) {
                    tmp = -1;
                  }
                } else if (fromRow == toRow && fromCol != toCol) {
                  end = toCol;
                  cnst = 1;
                  if (fromCol < toCol) {
                    tmp = 1;
                  } else if (fromCol > toCol) {
                    tmp = -1;
                  }
                } else {
                  //alert(`INVALID MOVEMENT `);
                  return { BD: board, f: 6 };
                }
              
                while (true) {
                  //increament and check condition   
                  if (cnst == 0) {
                    i += tmp;
                    if (tmp == 1 && i > end) break;
                    else if (tmp == -1 && i < end) break;
                  } else if (cnst == 1) {
                    j += tmp;
                    if (tmp == 1 && j > end) break;
                    else if (tmp == -1 && j < end) break;
                  }
                  //check logic
                  if ((cap && 'a' <= board[i][j] && board[i][j] <= 'z') ||
                    (!cap && 'A' <= board[i][j] && board[i][j] <= 'Z')) {
                    board[fromRow][fromCol] = ' ';
                    board[i][j] = tmp1;
                    return { BD: board, f: 7 };
                  } else if ((!cap && 'a' <= board[i][j] && board[i][j] <= 'z') ||
                    (cap && 'A' <= board[i][j] && board[i][j] <= 'Z')) {
                      //alert(`Eating friend `);
                      return { BD: board, f: 5 };
                  }
                }
                this.board[fromRow][fromCol] = ' ';
                this.board[toRow][toCol] = tmp1;
                return { BD: board, f: 7 };
            }

            //for white pawn
            if(board[fromRow][fromCol]=='p'){
                if(toCol==fromCol && toRow==(fromRow-1) && board[toRow][toCol]==' '){
                      board[toRow][toCol] = 'p';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                }else if(fromRow==6 && toCol==fromCol&& toRow==(fromRow-2) && board[toRow][toCol]==' '){
                      board[toRow][toCol] = 'p';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                }
                else if(toCol==(fromCol+1) && (fromCol+1)<=7 && toRow==(fromRow-1) && 
                        'A'<=board[toRow][toCol] && board[toRow][toCol]<='Z'){
                      board[toRow][toCol]='p';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                }else if(toCol==(fromCol-1) && 0<=(fromCol-1) && toRow==(fromRow-1) && 
                        'A'<=board[toRow][toCol]&&board[toRow][toCol]<='Z'){
                      board[toRow][toCol]='p';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                }
                else{
                  // alert(`INVALID MOVEMENT `);return;
                  return { BD: board, f: 6 };
                }
            }
            
            //for black pawn
            if(board[fromRow][fromCol]=='P'){
                 // console.log(fromRow+666,` `,fromCol,` `,toRow,` `,toCol,` `);
                  if( toCol==fromCol && toRow==fromRow+1 && board[toRow][toCol]==' '){
                      board[toRow][toCol] = 'P';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                  }else if(fromRow==1 && toCol==fromCol&& toRow==(3) &&board[toRow][toCol]==' '){
                      board[toRow][toCol] = 'P';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                  }
                  else if(toCol==(fromCol+1) && (fromCol+1)<=7 && toRow==(fromRow+1) && 
                          'a'<=board[toRow][toCol]&&board[toRow][toCol]<='z'){
                      board[toRow][toCol]='P';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                  }else if(toCol==(fromCol-1) && 0<=(fromCol-1) && toRow==(fromRow+1) && 
                          'a'<=board[toRow][toCol]&&board[toRow][toCol]<='z'){
                      board[toRow][toCol]='P';
                      board[fromRow][fromCol]=' ';
                      return { BD: board, f: 7 };
                  }
                  else{
                     //alert(`INVALID INPUT black pawn`);
                     return { BD: board, f: 6 };
                  }
            }

    }else{
        //alert(`you cannot choose this item`);
        return { BD: board, f: 3 };
    }
  }
}

class Sudoku extends gameEngine{
  
  drawer(board) {
    document.open();
    document.write(`
      <style>
        body {
          height: 100%;
          margin: 0;
          font-family: 'Finger Paint', cursive;
        }

        .board-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 120vh;
          background-image: url('assets/backgrounds/checkers.jpg');
          background-repeat: 2;
          background-size: contain;
        }
        
        .board {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          grid-template-rows: repeat(9, 1fr);
          grid-gap: 1px;
          background-color: #e0e0e0;
          padding: 20px;
          box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
        }
        
        #pos{
          position: relative;
          bottom: 40%;
          right: 35%;
          color: #191919;
          font-size: 0.55rem;
        }

        .board-cell {
          display: flex;
          font-size: 20px;
          background-color: #ffffff;
          border: 1px solid #000000;
          justify-content: center;
          align-items: center;
          height: 50px;
          width: 50px;
        }
        
        .board-cell[data-row="2"], 
        .board-cell[data-row="5"], 
        .board-cell[data-row="8"] {
          border-bottom-width: 3px;
        }
        
        .board-cell[data-col="2"], 
        .board-cell[data-col="5"], 
        .board-cell[data-col="8"] {
          border-right-width: 3px;
        }
      </style>
    `);

    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if(board[i][j] === ' '){
          document.write(`<div class="board-cell" data-row="${i}" data-col="${j}"><span id="pos">${i}${j}</span></div>`); continue;
        }
        document.write(`<div class="board-cell" data-row="${i}" data-col="${j}">${board[i][j]}</div>`);
      }
    }
    document.write('</div>');
    document.write('</div>');
  }

  checkRow(board,row, num){
    for(let i = 0; i < 9; i++){
      let tmp = parseInt(board[row][i]);
      if(isNaN(tmp)) continue;
      if(num === tmp) return false;
    }
    return true;
  }
  checkCol(board,col, num){
    for(let i = 0; i < 9; i++){
      let tmp = parseInt(board[i][col]);
      if(isNaN(tmp)) continue;
      if(num === tmp) return false;
    }
    return true;
  }
  checkBox(board,row, col, num){
    let startRow = Math.floor(row / 3.0) * 3;
    let endRow = startRow + 2;
    let startCol = Math.floor(col / 3.0) * 3;
    let endCol = startCol + 2;
    for(let i = startRow; i <= endRow; i++){
      for(let j = startCol; j <= endCol; j++){
        let tmp = parseInt(board[i][j]);
        if(isNaN(tmp)) continue;
        if(num === tmp) return false;
      }
    }
    return true;
  }
  controller(board,row, col, num){
    row = parseInt(row); col = parseInt(col); num = parseInt(num);
    if(isNaN(row) || isNaN(col) || isNaN(num) || row < 0 || row > 8 || col < 0 || col > 8 || num < 1 || num > 9){
      //alert('Wrong Input');
      return{ BD:board, f: 0 }
    }
    else if(board[row][col] === ' '){
      if(this.checkRow(board,row, num) && this.checkCol(board,col, num) && this.checkBox(board,row, col, num)){
        board[row][col] = num;
      }
      else{
        //alert('Wrong Play...');
        return { BD: board, f: 8 };
      }
    }
    else{
      //alert('This place is already occupied.');
      return { BD: board, f: 1 };
    }
    //Done
    return { BD: board, f: 7 };
  }
}

class EightQueens extends gameEngine{
  drawer(board) {
    document.open();
    document.write(`
      <style>
        body {
          height: 100%;
          margin: 0;
          font-family: 'Finger Paint', cursive;
        }
        .board-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 120vh;
          background-image: url('assets/backgrounds/chess.jpg');
          background-repeat: 2;
          background-size: contain;
        }
        .board {
          display: grid;
          margin-left: 10px;
          grid-template-columns: repeat(8, 70px);
          grid-template-rows: repeat(8, 70px);
          background-color: #d1a05f;
          width: calc(70px * 8);
          height: calc(70px * 8);
          border: 2px solid #000;
          border-collapse: collapse;
          box-shadow: 0 0 30px #626b74; /* Add a subtle box shadow */
          background-color: #fff; /* Add a white background color */
        }
        #pos{
          position: relative;
          bottom: 43%;
          right: 37%;
          color: #191919;
          font-size: 0.6rem;
        }
        .board-cell {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0em;
          font-weight: bold;
          border: 1px solid #000;
          background-color: white;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        .board-cell.black {
          background-color: #aea2a2;
        }
        .selected {
          background-color: #ffffcc !important;
        }
      </style>
    `);

    document.write('<div class="board-container">');
    document.write('<div class="board">');
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let cellClasses = 'board-cell';
        if ((i + j) % 2 === 0) {
          cellClasses += ' white';
        } else {
          cellClasses += ' black';
        }
        let cellImgSrc='';
        if(board[i][j]=='Q'){
          cellImgSrc ='images/Bqueen.png';
        }
        let cell = `<div class="${cellClasses}" style="background-image: url('${cellImgSrc}')" data-row="${i}" data-col="${j}"><span id="pos">${i}${j}</span></div>`;
        document.write(cell);
      }
    }
    document.write('</div></div>');
    document.close();
  }
 
  controller(board,Row, Col) {
    Row = parseInt(Row); Col = parseInt(Col);
    if(isNaN(Row) || isNaN(Col) || Row > 7 || Row < 0 || Col > 7 || Col < 0 ){
      //alert('Wrong Input');
      return { BD: board, f: 0 };
    }
    else if( board[Row][Col] =='Q'){
      return { BD: board, f: 1 };
    }
    else if(board[Row][Col]=='n'){
      return{ BD: board, f: 9 };
    }
    else{
      board[Row][Col]='Q';
      //get all valid cells that can queen move to and write it in array as n
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (board[i][j] != 'Q') {
            if (i == Row || j == Col || i - j == Row - Col || i + j == Row + Col) {
              board[i][j] = 'n';
            }
          }
        }
      }
      return{ BD: board, f: 7 };
    }
  }
}

function Alerts(i){
  if(i==0){alert(`Wrong input `);}
  else if(i==1){alert(`ALready occupied `);}
  else if(i==2){alert(`This place is empty`);}
  else if(i==3){alert(`can't choose this item `);}
  else if(i==4){alert('This column is full.');}
  else if(i==5){alert(`take care :  you can't eat your friend`);}
  else if(i==6){alert(`Invalid movement`);}
  else if(i==8){alert('Wrong Play...');}
  else if(i==9){alert(`cannot choose this place`);}
}

//Run code
const start= new gameEngine;
start.Game_loop();