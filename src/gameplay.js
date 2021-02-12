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
      for (const space of Gameplay.gameBoard[`${row}`]) {
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
    let activeBlocks = Gameplay.findActiveBlocks();
    let key = Object.keys(activeBlocks)[0];
    let row = Gameplay.gameBoard[key];
    let firstIndex = activeBlocks[key][0];
    let lastIndex = activeBlocks[key].slice(-1)[0];
    if (direction == "left" && firstIndex != 0) {
      this.moveLeft(row, firstIndex, lastIndex);
    } else if (direction == "right" && lastIndex != 9) {
      this.moveRight(row, firstIndex, lastIndex);
    } else if (direction == "down" && key != "aRow") {
      this.moveDown(key, row, firstIndex, lastIndex);
    } else if (direction == "rotate") {
      Tetromino.activeBlock.rotate(activeBlocks, key, firstIndex, lastIndex);
    }
  }

  static moveLeft(row, firstIndex, lastIndex) {
    row[firstIndex - 1] = Tetromino.activeBlock.constructor.name;
    row[lastIndex] = null;
    Gameplay.populateBoard();
  }

  static moveRight(row, firstIndex, lastIndex) {
    row[lastIndex + 1] = Tetromino.activeBlock.constructor.name;
    row[firstIndex] = null;
    Gameplay.populateBoard();
  }

  static moveDown(key, row, firstIndex, lastIndex) {
    let newLetter = `${String.fromCharCode(key.charCodeAt(0) - 1)}Row`;
    for (let i = firstIndex; i <= lastIndex; i++) {
      row[i] = null;
      Gameplay.gameBoard[newLetter][i] = Tetromino.activeBlock.constructor.name;
    }
    Gameplay.populateBoard();
  }

  //   static rotateBlock(activeBlocks, row, key, firstIndex, lastIndex) {
  //     let j = 2;
  //     for (let i = firstIndex; i <= lastIndex; i++) {
  //       let newLetter = `${String.fromCharCode(key.charCodeAt(0) + j)}Row`;
  //       let newSpace = activeBlocks[key][0] + 2;
  //       row[i] = null;
  //       Gameplay.gameBoard[newLetter][newSpace] = "iBlock";
  //       Gameplay.populateBoard();
  //       j -= 1;
  //     }
  //   }

  static findActiveBlocks() {
    let activeBlocks = {};
    for (const row in Gameplay.gameBoard) {
      if (Gameplay.gameBoard[row].some((item) => item != null)) {
        Gameplay.gameBoard[row].forEach((value, index) => {
          if (value == Tetromino.activeBlock.constructor.name) {
            if (activeBlocks[row]) {
              activeBlocks[row].push(index);
            } else {
              activeBlocks[row] = [index];
            }
          }
        });
      }
    }
    return activeBlocks;
  }
}
