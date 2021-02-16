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
    for (const [row, index] of Object.entries(blocksToAdd)) {
      Gameplay.gameBoard[row][index] = this.constructor.name;
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
    this.addBlocks(blocksToAdd);
    this.removeBlocks(blocksToRemove);
  }
}
