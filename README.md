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
    * [Asset Management](#asset-management)
* [Adding a New Game (3 Steps)](#adding-a-new-game-3-steps)
* [Architecture Benefits](#architecture-benefits)

## Game Engine Architecture

A modular game engine built with JavaScript and OOP principles,
designed to easily integrate multiple board games while maintaining a consistent architecture.

## Code Structure
```
├── index.html          # Main UI with game selection menu
├── style.css           # Styling for main menu and responsive layout
├── GameEngine.js       # Core engine class (abstract base)
└── games/              # Game implementations
├── TicTacToe.js
├── Connect4.js
├── Checkers.js
├── Chess.js
├── Sudoku.js
└── EightQueens.js
```

## Core OOP Architecture

### Base Game Engine Class
```javascript
class GameEngine {
  // Template methods to be implemented by concrete games
  drawer(board) { throw "Not implemented" }  // Render game state
  controller(board, input, playerTurn) { throw "Not implemented" } // Handle moves
  
  // Common game loop logic
  async gameLoop(board) {
    // Handles turn management, input processing, and state updates
  }
}
```

### Game Implementation Structure
```javascript
class BoardGame extends GameEngine {
  drawer(board) {
    // Custom rendering logic for the game pieces and board
  }

  controller(board, input, playerTurn) {
    // Game-specific move validation
  }
}
```

## Key Design Patterns

### Template Method Pattern
* **Base Class:** defines algorithm skeleton (`gameLoop`).
* **Concrete Classes:** implement specific steps (`drawer`, `controller`).

### Factory Pattern
```javascript
function play(gameId) {
  const games = {
    1: TicTacToe,
    2: Connect4,
    3: Checkers,
    4: Chess,
    5: Sudoku,
    6: EightQueens
  };
  
  return new games[gameId]();
}
```

### Polymorphism
```javascript
// Engine treats all games uniformly
const currentGame = new SelectedGame();
currentGame.drawer(board);
currentGame.controller(input);
```

## Scalability Features

### Game Implementation Interface
To add a new game, developers need to:
1. Extend `GameEngine` class.
2. Implement:
    * `drawer(board)`: Visual representation logic.
    * `controller(board, input, playerTurn)`: Move validation logic.
3. Register in game factory.

### Component Isolation
* **Game Logic**: Contained in individual classes.
* **Rendering**: Handled through DOM manipulation in `drawer()`.
* **Input Handling**: Normalized to string-based format.

### State Management
* Immutable board state passed between controller and drawer.
* Turn management handled by base class.

### Asset Management
```javascript
class BoardGame extends GameEngine {
  drawer() {
      document.write(`
      <style>
        .board-container {
          /* Other styles */
          background-image: url('assets/game-background.png') 
        }
      </style>
    `);
  }
}
```

## Adding a New Game (3 Steps)
1. **Create Game Class**
```javascript
// games/NewGame.js
class NewGame extends GameEngine {
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
        case 7: return new NewGame();  // Add new case 
    }
}
```

3. **Add UI Entry**
```html
<!-- index.html -->
<div class="game newGame" onclick="play(7)">
  <h2>New Game</h2>
  <span class="d-none d-lg-block">
    <img class="resizable-image" src="assets/newGame.png" alt="..."/>
  </span>
  <p>
    New Game Description.
  </p>
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