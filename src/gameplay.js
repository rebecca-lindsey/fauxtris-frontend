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
    let board = Gameplay.gameBoard;
    let activeBlocks = Gameplay.findActiveBlocks();
    let keys = Object.keys(activeBlocks);
    if (direction == "left") {
      this.moveLeft(board, activeBlocks, keys);
    } else if (direction == "right") {
      this.moveRight(board, activeBlocks, keys);
    } else if (direction == "down") {
      this.moveDown(board, activeBlocks, keys);
    } else if (direction == "rotate") {
      Tetromino.activeBlock.rotate(board, activeBlocks, keys);
    }
  }

  static moveLeft(board, activeBlocks, keys) {
    keys.forEach((row) => {
      let firstIndex = activeBlocks[row][0];
      let lastIndex = activeBlocks[row].slice(-1)[0];
      board[row][firstIndex - 1] = Tetromino.activeBlock.constructor.name;
      board[row][lastIndex] = null;
    });
    Gameplay.populateBoard();
  }

  static moveRight(board, activeBlocks, keys) {
    keys.forEach((row) => {
      let firstIndex = activeBlocks[row][0];
      let lastIndex = activeBlocks[row].slice(-1)[0];
      board[row][lastIndex + 1] = Tetromino.activeBlock.constructor.name;
      board[row][firstIndex] = null;
    });
    Gameplay.populateBoard();
  }

  static moveDown(board, activeBlocks, keys) {
    let newLetter = `${String.fromCharCode(
      keys[0].charCodeAt(0) - keys.length
    )}Row`;
    activeBlocks[keys[0]].forEach((index) => {
      board[keys[0]][index] = null;
      board[newLetter][index] = Tetromino.activeBlock.constructor.name;
    });
    Gameplay.populateBoard();
  }

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
