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
    const firstIndex = activeBlocks[keys[0]][0];
    if (this.orientation == "first") {
      this.rotateFirst(board, activeBlocks, keys, firstIndex);
    } else if (this.orientation == "second") {
      this.rotateSecond(board, activeBlocks, keys, firstIndex);
    }
    Gameplay.populateBoard();
  }

  rotateFirst(board, activeBlocks, keys, firstIndex) {
    const currentRowName = keys[0];
    const lastIndex = activeBlocks[currentRowName].slice(-1)[0];
    const row = board[currentRowName];
    const verticalIndex = activeBlocks[currentRowName][2];
    let alphaIncrementor = 2;

    for (let i = firstIndex; i <= lastIndex; i++) {
      const newRowName = `${String.fromCharCode(
        keys[0].charCodeAt(0) + alphaIncrementor
      )}Row`;
      row[i] = null;
      Gameplay.gameBoard[newRowName][verticalIndex] = "iBlock";
      alphaIncrementor -= 1;
    }
    this.orientation = "second";
  }

  rotateSecond(board, activeBlocks, keys, originalIndex) {
    const newRowName = keys[2];
    for (const row in activeBlocks) {
      const index = activeBlocks[row][0];
      board[row][index] = null;
    }
    for (let i = originalIndex - 2; i <= originalIndex + 1; i++) {
      board[newRowName][i] = "iBlock";
    }
    this.orientation = "first";
  }
}
