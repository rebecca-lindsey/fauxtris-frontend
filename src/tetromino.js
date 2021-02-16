class Tetromino {
  constructor() {
    this.orientation = "first";
  }
  static activeBlock;

  static nextLetterRowUpwards(rowName) {
    return `${String.fromCharCode(rowName.charCodeAt(0) + 1)}Row`;
  }

  static nextLetterRowDownwards(rowName) {
    return `${String.fromCharCode(rowName.charCodeAt(0) - 1)}Row`;
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
    this.addBlocks(blocksToAdd);
  }
}
