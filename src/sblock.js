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

  //   rotate(board, activeBlocks, keys) {
  //     if (this.orientation == "first") {
  //       this.rotateFirst(board, activeBlocks, keys);
  //     } else if (this.orientation == "second") {
  //       this.rotateSecond(board, activeBlocks, keys);
  //     }
  //     Gameplay.populateBoard();
  //   }

  rotateFirst(board, activeBlocks, keys) {
    let furthestLeftBlockCurrentIndex = activeBlocks[keys[1]][0];
    let furthestLeftBlockNewIndex = furthestLeftBlockCurrentIndex + 2;
    board[keys[1]][furthestLeftBlockCurrentIndex] = null;
    board[keys[1]][furthestLeftBlockNewIndex] = "sBlock";

    let centerBottomBlockCurrentIndex = activeBlocks[keys[1]][1];
    board[keys[1]][centerBottomBlockCurrentIndex] = null;
    board[Tetromino.nextLetterRowUpwards(keys[0])][
      centerBottomBlockCurrentIndex
    ] = "sBlock";

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
