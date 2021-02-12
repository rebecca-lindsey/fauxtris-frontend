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

  rotate(activeBlocks, row, key, firstIndex, lastIndex) {
    if (this.orientation == "first") {
      this.rotateFirst(activeBlocks, row, key, firstIndex, lastIndex);
    } else if (this.orientation == "second") {
      this.rotateSecond(activeBlocks, row, key, firstIndex, lastIndex);
    }
    Gameplay.populateBoard();
  }

  rotateFirst(activeBlocks, row, key, firstIndex, lastIndex) {
    let j = 2;
    for (let i = firstIndex; i <= lastIndex; i++) {
      let newLetter = `${String.fromCharCode(key.charCodeAt(0) + j)}Row`;
      let newSpace = activeBlocks[key][0] + 2;
      row[i] = null;
      Gameplay.gameBoard[newLetter][newSpace] = "iBlock";
      j -= 1;
    }
    this.orientation = "second";
  }

  rotateSecond(activeBlocks, row, key, firstIndex, lastIndex) {
    let newLetter = Object.keys(activeBlocks)[2];
    for (const row in activeBlocks) {
      Gameplay.gameBoard[row][activeBlocks[row][0]] = null;
    }
    for (let i = firstIndex - 2; i <= lastIndex + 1; i++) {
      activeBlocks[key][firstIndex] = null;
      Gameplay.gameBoard[newLetter][i] = "iBlock";
    }
    this.orientation = "first";
  }
}
