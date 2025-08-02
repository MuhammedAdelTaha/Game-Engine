# [Demo](https://MuhammedAdelTaha.github.io/Game-Engine/)

# Table of Contents
* [Game Engine Architecture](#game-engine-architecture)
* [Code Structure](#code-structure)
* [Core OOP Architecture](#core-oop-architecture)
    * [Base Game Engine Class](#base-game-engine-class)
    * [Game Implementation Structure](#game-implementation-structure)
* [Key Design Patterns](#key-design-patterns)
    * [Template Method Pattern](#template-method-pattern)
    * [Factory Pattern](#factory-pattern)
    * [Polymorphism](#polymorphism)
* [Scalability Features](#scalability-features)
    * [Component Isolation](#component-isolation)
    * [State Management](#state-management)
* [Adding a New Game (3 Steps)](#adding-a-new-game-3-steps)
* [Architecture Benefits](#architecture-benefits)

## Game Engine Architecture

A modular game engine built with JavaScript and OOP principles,
designed to easily integrate multiple board games while maintaining a consistent architecture.

## Code Structure
```
├── index.html          # Main UI with game selection menu
├── style.css           # Styling for main menu
├── GameEngine.js       # Core engine class (abstract base)
└── games/              # Game implementations
    ├── Connect4.js
    ├── EightQueens.js
    ├── LightsOut.js
    ├── Sudoku.js
    └── TicTacToe.js
```

## Core OOP Architecture

### Base Game Engine Class
```javascript
class GameEngine {
    // Template methods to be implemented by concrete games
    inputHandler(playerTurn) { throw "Not implemented" } // Handle player input
    drawer(board) { throw "Not implemented" }  // Render game state
    controller(board, input, playerTurn) { throw "Not implemented" } // Handle moves
    
    // Common methods for game management
    showToast(message, type = 'error') {
        // Display feedback messages to the user
    }
    
    // Common game loop logic
    async gameLoop(board) {
        // Handles turn management, input processing, and state updates
    }
}
```

### Game Implementation Structure
```javascript
class BoardGame extends GameEngine {
    inputHandler(playerTurn) {
        // Custom input handling logic
    }
    
    drawer(board) {
        // Custom rendering logic for the game pieces, board, and input box
    }
  
    controller(board, input, playerTurn) {
        // Game-specific move validation
    }
}
```

## Key Design Patterns

### Template Method Pattern
* **Base Class:** defines algorithm skeleton (`gameLoop`).
* **Concrete Classes:** implement specific steps (`inputHandler`, `drawer`, `controller`).

### Factory Pattern
```javascript
function play(check) {
    let game, board;
    switch (check) {
        case 1: board = [ /* Game-specific board */ ] ; game = new TicTacToe(); break;
        case 2: board = [ /* Game-specific board */ ] ; game = new Connect4(); break;
        case 3: board = [ /* Game-specific board */ ] ; game = new Sudoku(); break;
        case 4: board = [ /* Game-specific board */ ] ; game = new EightQueens(); break;
        case 5: board = [ /* Game-specific board */ ] ; game = new LightsOut(); break;
        // Add more games as needed
    }

    if (board != null) {
        game.gameLoop(board).then(() => window.location.reload());
    }
}
```

### Polymorphism
```javascript
// Engine treats all games uniformly
const currentGame = new SelectedGame();
currentGame.inputHandler(playerTurn);
currentGame.drawer(board);
currentGame.controller(board, input, playerTurn);
```

## Scalability Features

### Game Implementation Interface
To add a new game, developers need to:
1. Extend `GameEngine` class.
2. Implement:
    * `inputHandler(playerTurn)`: Input handling logic.
    * `drawer(board)`: Visual representation logic.
    * `controller(board, input, playerTurn)`: Move validation logic.
3. Register in game factory.

### Component Isolation
* **Game Logic**: Contained in individual classes.
* **Rendering**: Handled through DOM manipulation in `drawer()`.
* **Input Handling**: Managed by `inputHandler()` method.

### State Management
* Immutable board state passed between controller and drawer.
* Turn management handled by base class.

## Adding a New Game (3 Steps)
1. **Create Game Class**
```javascript
// games/NewGame.js
class NewGame extends GameEngine {
    inputHandler(playerTurn) { /* Custom input handling */ }
    drawer(board) { /* Custom rendering */ }
    controller(board, input, playerTurn) { /* Move logic */ }
}
```

2. **Register in Factory**
```javascript
// GameEngine.js
function play(check) {
    switch(check) {
        // Existing cases
        case 6: board = [ /* Game-specific board */ ] ; game = new NewGame(); break; // Add new case 
    }
}
```

3. **Add UI Entry**
```html
<!-- index.html -->
<div class="game lights-out" onclick="play(6)">
  <div class="game-icon"> <!-- Game-specific icons --> </div>
  <h2>Game Name</h2>
  <div class="game-preview">
    <!-- Game-specific preview content -->
  </div>
  <p>Game Description</p>
  <div class="play-button">
    <span>Play Now!</span>
    <div class="button-glow"></div>
  </div>
</div>
```

## Architecture Benefits

* **Encapsulation**
    * Game-specific details hidden within individual classes.
    * Base class handles common flow control.

* **Loose Coupling**
    * Games don't know about each other's implementation.
    * UI interacts only through base class interface.

* **Consistent API**
    * All games expose the same methods for engine interaction.
    * Input/Output formats standardized.

* **Easy Maintenance**
    * Changes to base class propagate to all games.
    * Game updates don't affect other components.

This architecture enables rapid game integration
while maintaining performance and code quality through strict separation of concerns and polymorphic design.