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

  static addColor(space) {
    const colorList = {
      iBlock: "i-block",
      oBlock: "o-block",
      tBlock: "t-block",
      sBlock: "s-block",
      zBlock: "z-block",
      jBlock: "j-block",
      lBlock: "l-block",
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

  // static findActiveBlocks() {
  //   const activeBlocks = {};
  //   for (const row in Gameplay.gameBoard) {
  //     if (Gameplay.gameBoard[row].some((item) => item != null)) {
  //       Gameplay.gameBoard[row].forEach((value, index) => {
  //         if (value == Tetromino.activeBlock.constructor.name) {
  //           if (activeBlocks[row]) {
  //             activeBlocks[row].push(index);
  //           } else {
  //             activeBlocks[row] = [index];
  //           }
  //         }
  //       });
  //     }
  //   }
  //   return activeBlocks;
  // }

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
}
