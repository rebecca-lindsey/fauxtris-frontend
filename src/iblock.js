class iBlock extends TwoRotation {
  constructor(orientation) {
    super(orientation);
    this.activeBlocks = this.populateIBlock();
    Tetromino.activeBlock = this;
  }

  populateIBlock() {
    const blocksToAdd = {};
    const firstRowName = Object.keys(Gameplay.gameBoard)[0];

    for (let i = 3; i < 7; i++) {
      if (blocksToAdd.hasOwnProperty(firstRowName)) {
        blocksToAdd[firstRowName].push(i);
      } else {
        blocksToAdd[firstRowName] = [i];
      }
    }

    this.updateBlocks(blocksToAdd);
    return blocksToAdd;
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
      if (currentRowName != newRowName) {
        blocksToAdd[newRowName] = [verticalIndex];
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

    const blocksToRemove = {};
    const blocksToAdd = {};

    for (const row in activeBlocks) {
      if (row != newRowName) {
        const index = activeBlocks[row][0];
        blocksToRemove[row] = [index];
      }
    }

    for (let i = originalIndex - 2; i <= originalIndex + 1; i++) {
      if (i != originalIndex) {
        if (blocksToAdd.hasOwnProperty(newRowName)) {
          blocksToAdd[newRowName].push(i);
        } else {
          blocksToAdd[newRowName] = [i];
        }
      }
    }
    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "first";
    }
  }
}
