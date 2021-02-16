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

  rotateFirst(board, activeBlocks, keys) {
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[bottomRow][1];

    board[bottomRow][rightIndex] = null;
    board[topRow][rightIndex] = "zBlock";
    board[centerRow][leftIndex] = null;
    board[centerRow][rightIndex] = "zBlock";

    this.orientation = "second";
  }

  rotateSecond(board, activeBlocks, keys) {
    const topBlockIndex = activeBlocks[keys[0]][0];
    board[keys[2]][topBlockIndex] = "zBlock";
    board[keys[0]][topBlockIndex] = null;

    const rightCenterBlockCurrentIndex = activeBlocks[keys[1]][1];
    const rightCenterBlockNewIndex = rightCenterBlockCurrentIndex - 2;
    board[keys[1]][rightCenterBlockCurrentIndex] = null;
    board[keys[1]][rightCenterBlockNewIndex] = "zBlock";

    this.orientation = "first";
  }
}
