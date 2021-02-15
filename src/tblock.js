class tBlock extends Tetromino {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateTBlock();
  }

  populateTBlock() {
    for (let i = 3; i < 6; i++) {
      Gameplay.gameBoard["tRow"][i] = "tBlock";
    }
    Gameplay.gameBoard["sRow"][4] = "tBlock";
    Gameplay.populateBoard();
  }

  rotate(board, activeBlocks, keys) {
    if (this.orientation == "first") {
      this.rotateFirst(board, activeBlocks, keys);
    } else if (this.orientation == "second") {
      this.rotateSecond(board, activeBlocks, keys);
    } else if (this.orientation == "third") {
      this.rotateThird(board, activeBlocks, keys);
    } else if (this.orientation == "fourth") {
      this.rotateFourth(board, activeBlocks, keys);
    }
    Gameplay.populateBoard();
  }

  rotateFirst(board, activeBlocks, keys) {
    let firstKey = keys[0];
    let rightBlockIndex = activeBlocks[firstKey][2];
    let newRowName = `${String.fromCharCode(firstKey.charCodeAt(0) + 1)}Row`;
    board[firstKey][rightBlockIndex] = null;
    board[newRowName][rightBlockIndex - 1] = "tBlock";
    this.orientation = "second";
  }

  rotateSecond(board, activeBlocks, keys) {
    let currentBlockIndex = activeBlocks[keys[2]][0];
    let newBlockIndex = activeBlocks[keys[1]][1] + 1;
    board[keys[2]][currentBlockIndex] = null;
    board[keys[1]][newBlockIndex] = "tBlock";
    this.orientation = "third";
  }

  rotateThird(board, activeBlocks, keys) {
    let currentBlockIndex = activeBlocks[keys[1]][0];
    let newBlockIndex = currentBlockIndex + 1;
    let newRow = `${String.fromCharCode(keys[1].charCodeAt(0) - 1)}Row`;
    board[keys[1]][currentBlockIndex] = null;
    board[newRow][newBlockIndex] = "tBlock";
    this.orientation = "fourth";
  }

  rotateFourth(board, activeBlocks, keys) {
    let currentBlockIndex = activeBlocks[keys[0]][0];
    let newBlockIndex = currentBlockIndex - 1;
    board[keys[0]][currentBlockIndex] = null;
    board[keys[1]][newBlockIndex] = "tBlock";
    this.orientation = "first";
  }
}
