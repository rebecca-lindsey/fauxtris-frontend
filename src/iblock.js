class iBlock extends TwoRotation {
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

  rotateFirst(activeBlocks, keys) {
    const currentRowName = keys[0];
    const firstIndex = activeBlocks[currentRowName][0];
    const lastIndex = activeBlocks[currentRowName].slice(-1)[0];
    const verticalIndex = activeBlocks[currentRowName][2];
    let alphaIncrementor = 2;

    const blocksToRemove = {};
    const blocksToAdd = {};

    for (let i = firstIndex; i <= lastIndex; i++) {
      if (i != verticalIndex) {
        if (blocksToRemove.hasOwnProperty(currentRowName)) {
          blocksToRemove[currentRowName].push(i);
        } else {
          blocksToRemove[currentRowName] = [i];
        }
      }

      const newRowName = `${String.fromCharCode(
        currentRowName.charCodeAt(0) + alphaIncrementor
      )}Row`;
      if (i != verticalIndex) {
        blocksToAdd[newRowName] = verticalIndex;
      }

      alphaIncrementor -= 1;
    }

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "second";
    }
  }

  rotateSecond(activeBlocks, keys) {
    const originalIndex = activeBlocks[keys[0]][0];
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
