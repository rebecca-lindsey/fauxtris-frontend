class Gameplay {
  constructor() {
    this.board = {};
    this.score = 0;
    this.difficulty = "Medium";
    this.freeze = false;
    Gameplay.currentGame = this;
    this.createNewBoard();
    this.generateNewBlock();
  }

  static currentGame;

  createNewBoard() {
    for (let i = 20; i > 0; i--) {
      const rowName = `${String.fromCharCode(96 + i)}Row`;
      this.board[rowName] = Array(10).fill(null);
    }
    this.populateBoard();
  }

  clearBoard() {
    document.getElementById("game-display").innerHTML = "";
  }

  populateBoard() {
    this.clearBoard();

    for (const row in this.board) {
      for (const space of this.board[row]) {
        const newSpace = document.createElement("div");
        newSpace.classList.add("game-space");
        if (space) {
          newSpace.classList.add(this.addColor(space));
        }
        document.getElementById("game-display").append(newSpace);
      }
    }
  }

  stopGame() {
    clearInterval(Tetromino.blockFallInterval);
    this.displayLastBlock();
    console.log("Gameover!");
  }

  displayLastBlock() {
    for (const row in Tetromino.activeTetromino.activeBlocks) {
      Tetromino.activeTetromino.activeBlocks[row].forEach((index) => {
        Gameplay.currentGame.board[row][index] = "losingBlock";
      });
    }
    Gameplay.currentGame.populateBoard();
  }

  // BUG: Correct multi-block generation bug

  generateNewBlock() {
    const randomNum = Math.floor(Math.random() * 7);
    const tetrominoArray = [
      iBlock,
      jBlock,
      lBlock,
      oBlock,
      sBlock,
      tBlock,
      zBlock,
    ];
    new tetrominoArray[randomNum]();
    Tetromino.activeTetromino.blockFall();
  }

  addColor(space) {
    const colorList = {
      iBlock: "i-block",
      oBlock: "o-block",
      tBlock: "t-block",
      sBlock: "s-block",
      zBlock: "z-block",
      jBlock: "j-block",
      lBlock: "l-block",
      flash: "flash",
      losingBlock: "losing-Block",
    };
    return colorList[space];
  }

  handleArrowKey(key) {
    if (!this.freeze) {
      switch (key) {
        case "ArrowLeft":
          this.moveActivePiece("left");
          break;
        case "ArrowRight":
          this.moveActivePiece("right");
          break;
        case "ArrowDown":
          this.moveActivePiece("down");
          break;
        case " ":
          this.moveActivePiece("rotate");
      }
    }
  }

  moveActivePiece(direction) {
    const activeBlocks = Tetromino.activeTetromino.activeBlocks;
    const keys = Object.keys(activeBlocks);
    const activeTetromino = Tetromino.activeTetromino;

    switch (direction) {
      case "left":
        activeTetromino.moveLeft(activeBlocks, keys);
        break;
      case "right":
        activeTetromino.moveRight(activeBlocks, keys);
        break;
      case "down":
        activeTetromino.moveDown(activeBlocks, keys);
        break;
      case "rotate":
        if (activeTetromino.constructor.name !== "oBlock") {
          activeTetromino.rotate(activeBlocks, keys);
        }
        break;
    }
  }

  validMove(blocksToAdd) {
    let boolean = true;
    for (const [row, indexes] of Object.entries(blocksToAdd)) {
      if (row === "invalidRow") {
        boolean = false;
      } else {
        indexes.forEach((index) => {
          if (this.board[row][index] != null || index < 0 || index > 9) {
            boolean = false;
          }
        });
      }
    }
    return boolean;
  }

  checkForClearedRow() {
    let keys = Object.keys(Tetromino.activeTetromino.activeBlocks);
    let boolean = false;
    for (const row of keys) {
      if (this.board[row].every((element) => element != null)) {
        boolean = true;
      }
    }
    return boolean;
  }

  rowClear() {
    let keys = Object.keys(Tetromino.activeTetromino.activeBlocks);
    for (const row of keys) {
      if (this.board[row].every((element) => element != null)) {
        for (let index = 0; index < 10; index++) {
          this.board[row][index] = "flash";
        }
      } else {
        keys = keys.filter((element) => element != row);
      }
    }

    this.populateBoard();
    setTimeout(() => {
      this.rowDrop(keys.sort());
    }, 200);
  }

  rowDrop(rowsToRemove = []) {
    this.addToScore();

    const keyArray = Object.keys(this.board).sort();
    const startingIndex = keyArray.indexOf(rowsToRemove[0]);

    for (let i = startingIndex; i < keyArray.length; i++) {
      let j = i + 1;
      if (keyArray[j]) {
        this.board[keyArray[i]] = this.board[keyArray[j]];
      } else {
        this.board[keyArray[i]] = Array(10).fill(null);
      }
    }

    rowsToRemove.shift();

    if (rowsToRemove.length > 0) {
      rowsToRemove = rowsToRemove.map((rowName) => {
        return Tetromino.nextLetterRowDownwards(rowName);
      });
      this.rowDrop(rowsToRemove);
    } else {
      this.populateBoard();
      this.generateNewBlock();
    }
  }

  checkForLoss(blocksToRemove) {
    if (blocksToRemove.hasOwnProperty("tRow")) {
      this.stopGame();
      return true;
    } else {
      return false;
    }
  }

  addToScore() {
    this.score += 10;
  }
}
