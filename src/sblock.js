class sBlock extends TwoRotation {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateSBlock();
  }

  populateSBlock() {
    for (let i = 3; i < 6; i++) {
      switch (i) {
        case 3:
          Gameplay.gameBoard["sRow"][i] = "sBlock";
          break;
        case 4:
          Gameplay.gameBoard["tRow"][i] = "sBlock";
          Gameplay.gameBoard["sRow"][i] = "sBlock";
          break;
        case 5:
          Gameplay.gameBoard["tRow"][i] = "sBlock";
          break;
      }
    }
    Gameplay.populateBoard();
  }

  rotateFirst(board, activeBlocks, keys) {
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const leftIndex = activeBlocks[bottomRow][0];
    const centerIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[centerRow][1];

    board[bottomRow][leftIndex] = null;
    board[topRow][centerIndex] = "sBlock";
    board[bottomRow][centerIndex] = null;
    board[bottomRow][rightIndex] = "sBlock";

    this.orientation = "second";
  }

  rotateSecond(board, activeBlocks, keys) {
    let bottomBlockCurrentIndex = activeBlocks[keys[2]][0];
    let bottomBlockNewIndex = bottomBlockCurrentIndex - 2;
    board[keys[2]][bottomBlockCurrentIndex] = null;
    board[keys[2]][bottomBlockNewIndex] = "sBlock";

    let topBlockCurrentIndex = activeBlocks[keys[0]][0];
    board[keys[0]][topBlockCurrentIndex] = null;
    board[keys[2]][topBlockCurrentIndex] = "sBlock";
    this.orientation = "first";
  }
}
