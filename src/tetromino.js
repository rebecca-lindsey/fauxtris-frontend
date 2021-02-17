class Tetromino {
  constructor() {
    this.orientation = "first";
  }
  static activeBlock;

  static nextLetterRowUpwards(rowName) {
    return `${String.fromCharCode(rowName.charCodeAt(0) + 1)}Row`;
  }

  static nextLetterRowDownwards(rowName) {
    if (rowName === "aRow") {
      return "invalidRow";
    } else {
      return `${String.fromCharCode(rowName.charCodeAt(0) - 1)}Row`;
    }
  }

  addBlocks(blocksToAdd) {
    for (const row in blocksToAdd) {
      blocksToAdd[row].map(
        (index) => (Gameplay.gameBoard[row][index] = this.constructor.name)
      );
    }
  }

  removeBlocks(blocksToRemove) {
    for (const row in blocksToRemove) {
      blocksToRemove[row].map(
        (index) => (Gameplay.gameBoard[row][index] = null)
      );
    }
  }

  updateBlocks(blocksToAdd, blocksToRemove) {
    this.removeBlocks(blocksToRemove);

    if (Gameplay.validMove(blocksToAdd)) {
      this.addBlocks(blocksToAdd);
      Gameplay.populateBoard();
    } else {
      this.addBlocks(blocksToRemove);
    }
  }

  moveLeft(activeBlocks, keys) {
    const blocksToRemove = {};
    const blocksToAdd = {};

    keys.forEach((row) => {
      const firstIndex = activeBlocks[row][0];
      const lastIndex = activeBlocks[row].slice(-1)[0];

      blocksToRemove[row] = [lastIndex];
      blocksToAdd[row] = [firstIndex - 1];
    });

    this.updateBlocks(blocksToAdd, blocksToRemove);
  }

  moveRight(activeBlocks, keys) {
    const blocksToRemove = {};
    const blocksToAdd = {};

    keys.forEach((row) => {
      const firstIndex = activeBlocks[row][0];
      const lastIndex = activeBlocks[row].slice(-1)[0];

      blocksToRemove[row] = [firstIndex];
      blocksToAdd[row] = [lastIndex + 1];
    });

    this.updateBlocks(blocksToAdd, blocksToRemove);
  }

  moveDown(activeBlocks, keys) {
    const blocksToRemove = {};
    const blocksToAdd = {};

    for (let i = 0; i < keys.length; i++) {
      blocksToRemove[keys[i]] = activeBlocks[keys[i]];
      blocksToAdd[Tetromino.nextLetterRowDownwards(keys[i])] =
        activeBlocks[keys[i]];
    }

    this.updateBlocks(blocksToAdd, blocksToRemove);
  }
}
