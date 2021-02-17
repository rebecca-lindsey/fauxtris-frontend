class Gameplay {
  static gameBoard = {};

  static score = 0;

  static createNewBoard() {
    for (let i = 20; i > 0; i--) {
      const rowName = `${String.fromCharCode(96 + i)}Row`;
      Gameplay.gameBoard[rowName] = Array(10).fill(null);
    }
    Gameplay.populateBoard();
  }

  static clearBoard() {
    document.getElementById("game-display").innerHTML = "";
  }

  static populateBoard() {
    Gameplay.clearBoard();

    for (const row in Gameplay.gameBoard) {
      for (const space of Gameplay.gameBoard[row]) {
        const newSpace = document.createElement("div");
        newSpace.classList.add("game-space");
        if (space != null) {
          newSpace.classList.add(Gameplay.addColor(space));
        }
        document.getElementById("game-display").append(newSpace);
      }
    }
  }

  static generateNewBlock() {
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

  static addColor(space) {
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

  static handleArrowKey(key) {
    switch (key) {
      case "ArrowLeft":
        Gameplay.moveActivePiece("left");
        break;
      case "ArrowRight":
        Gameplay.moveActivePiece("right");
        break;
      case "ArrowDown":
        Gameplay.moveActivePiece("down");
        break;
      case " ":
        Gameplay.moveActivePiece("rotate");
    }
  }

  static moveActivePiece(direction) {
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
        if (activeTetromino.constructor.name != "oBlock") {
          activeTetromino.rotate(activeBlocks, keys);
        }
        break;
    }
  }

  static validMove(blocksToAdd) {
    let boolean = true;
    for (const [row, indexes] of Object.entries(blocksToAdd)) {
      if (row === "invalidRow") {
        boolean = false;
      } else {
        indexes.forEach((index) => {
          if (
            Gameplay.gameBoard[row][index] != null ||
            index < 0 ||
            index > 9
          ) {
            boolean = false;
          }
        });
      }
    }
    return boolean;
  }

  // FIXME: Make this dynamic to search entire board

  static rowClear() {
    const board = Gameplay.gameBoard;
    if (board["aRow"].every((element) => element != null)) {
      for (let index = 0; index < 10; index++) {
        board["aRow"][index] = "flash";
      }
      Gameplay.populateBoard();
    }
    setTimeout(Gameplay.rowDrop, 200);
  }

  static rowDrop() {
    const board = Gameplay.gameBoard;
    const keyArray = Object.keys(board).sort();
    for (let i = 0; i < keyArray.length - 1; i++) {
      board[keyArray[i]] = board[keyArray[i + 1]];
    }
    board[keyArray[keyArray.length - 1]] = Array(10).fill(null);
    Gameplay.populateBoard();
  }
}
