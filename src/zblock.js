class zBlock extends TwoRotation {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateZBlock();
  }

  populateZBlock() {
    for (let i = 3; i < 6; i++) {
      switch (i) {
        case 3:
          Gameplay.gameBoard["tRow"][i] = "zBlock";
          break;
        case 4:
          Gameplay.gameBoard["tRow"][i] = "zBlock";
          Gameplay.gameBoard["sRow"][i] = "zBlock";
          break;
        case 5:
          Gameplay.gameBoard["sRow"][i] = "zBlock";
          break;
      }
    }
    Gameplay.populateBoard();
  }

  rotateFirst(activeBlocks, keys) {
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[bottomRow][1];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[centerRow] = [leftIndex];
    blocksToRemove[bottomRow] = [rightIndex];
    blocksToAdd[topRow] = [rightIndex];
    blocksToAdd[centerRow] = [rightIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "second";
    }
  }

  rotateSecond(board, activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const rightIndex = activeBlocks[topRow][0];
    const leftIndex = activeBlocks[centerRow][0] - 1;

    board[topRow][rightIndex] = null;
    board[bottomRow][rightIndex] = "zBlock";
    board[centerRow][rightIndex] = null;
    board[centerRow][leftIndex] = "zBlock";

    this.orientation = "first";
  }
}
