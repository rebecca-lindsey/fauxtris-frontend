class Gameplay {
  constructor() {
    this.board = {};
    this.score = 0;
    Gameplay.currentGame = this;
    this.createNewBoard();
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
    };
    return colorList[space];
  }

  handleArrowKey(key) {
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

  // FIXME: Make this dynamic to search entire board

  rowClear() {
    if (this.board["aRow"].every((element) => element != null)) {
      for (let index = 0; index < 10; index++) {
        this.board["aRow"][index] = "flash";
      }
      this.populateBoard();
    }
    setTimeout(rowDrop, 200);
  }

  rowDrop() {
    const keyArray = Object.keys(this.board).sort();
    for (let i = 0; i < keyArray.length - 1; i++) {
      this.board[keyArray[i]] = this.board[keyArray[i + 1]];
    }
    this.board[keyArray[keyArray.length - 1]] = Array(10).fill(null);
    this.populateBoard();
  }
}
