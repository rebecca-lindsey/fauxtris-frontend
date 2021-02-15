class zBlock extends Tetromino {
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

  rotate(board, activeBlocks, keys) {
    if (this.orientation == "first") {
      this.rotateFirst(board, activeBlocks, keys);
    } else if (this.orientation == "second") {
      this.rotateSecond(board, activeBlocks, keys);
    }
    Gameplay.populateBoard();
  }

  rotateFirst(board, activeBlocks, keys) {
    const furthestRightBlockCurrentIndex = activeBlocks[keys[1]][1];
    const newTopRow = Tetromino.nextLetterRowUpwards(keys[0]);
    board[newTopRow][furthestRightBlockCurrentIndex] = "zBlock";
    board[keys[1]][furthestRightBlockCurrentIndex] = null;

    const furthestLeftBlockCurrentIndex = activeBlocks[keys[0]][0];
    const furthestLeftBlockNewIndex = furthestLeftBlockCurrentIndex + 2;
    board[keys[0]][furthestLeftBlockCurrentIndex] = null;
    board[keys[0]][furthestLeftBlockNewIndex] = "zBlock";

    this.orientation = "second";
  }

  rotateSecond(board, activeBlocks, keys) {
    // let bottomBlockCurrentIndex = activeBlocks[keys[2]][0];
    // let bottomBlockNewIndex = bottomBlockCurrentIndex - 2;
    // board[keys[2]][bottomBlockCurrentIndex] = null;
    // board[keys[2]][bottomBlockNewIndex] = "sBlock";

    // let topBlockCurrentIndex = activeBlocks[keys[0]][0];
    // board[keys[0]][topBlockCurrentIndex] = null;
    // board[keys[2]][topBlockCurrentIndex] = "sBlock";
    this.orientation = "first";
  }
}
