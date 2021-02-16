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
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const centerIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[centerRow][1];
    const leftIndex = centerIndex - 1;

    board[bottomRow][rightIndex] = null;
    board[bottomRow][leftIndex] = "sBlock";
    board[topRow][centerIndex] = null;
    board[bottomRow][centerIndex] = "sBlock";

    this.orientation = "first";
  }
}
