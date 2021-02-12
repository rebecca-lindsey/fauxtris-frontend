class Tetromino {
  constructor() {
    this.orientation = "first";
  }
  static activeBlock;
}

class iBlock extends Tetromino {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateIBlock();
  }

  populateIBlock() {
    for (let i = 3; i < 7; i++) {
      Gameplay.gameBoard["tRow"][i] = "iBlock";
    }
    Gameplay.populateBoard();
  }

  rotate(board, activeBlocks, keys) {
    if (this.orientation == "first") {
      this.rotateFirst(board, activeBlocks, keys);
    } else if (this.orientation == "second") {
      this.rotateSecond(board, activeBlocks, keys);
    }
    Gameplay.populateBoard();
  }

  rotateFirst(activeBlocks, key, firstIndex, lastIndex) {
    let alphaIncrementor = 2;
    let row = Gameplay.gameBoard[Object.keys(activeBlocks)];
    let newSpace = activeBlocks[key][0] + 2;

    for (let i = firstIndex; i <= lastIndex; i++) {
      let newLetter = `${String.fromCharCode(
        key.charCodeAt(0) + alphaIncrementor
      )}Row`;
      row[i] = null;
      Gameplay.gameBoard[newLetter][newSpace] = "iBlock";
      alphaIncrementor -= 1;
    }

    this.orientation = "second";
  }

  rotateSecond(activeBlocks, firstIndex, lastIndex) {
    let newLetter = Object.keys(activeBlocks)[2];
    for (const row in activeBlocks) {
      let index = activeBlocks[row][0];
      Gameplay.gameBoard[row][index] = null;
    }
    for (let i = firstIndex - 2; i <= lastIndex + 1; i++) {
      Gameplay.gameBoard[newLetter][i] = "iBlock";
    }
    this.orientation = "first";
  }
}

class oBlock extends Tetromino {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateOBlock();
  }

  populateOBlock() {
    for (let i = 4; i < 6; i++) {
      Gameplay.gameBoard["tRow"][i] = "oBlock";
      Gameplay.gameBoard["sRow"][i] = "oBlock";
    }
    Gameplay.populateBoard();
  }
}
