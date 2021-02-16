class tBlock extends FourRotation {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateTBlock();
  }

  populateTBlock() {
    for (let i = 3; i < 6; i++) {
      Gameplay.gameBoard["tRow"][i] = "tBlock";
    }
    Gameplay.gameBoard["sRow"][4] = "tBlock";
    Gameplay.populateBoard();
  }

  rotateFirst(board, activeBlocks, keys) {
    const centerRow = keys[0];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const centerIndex = activeBlocks[centerRow][1];
    const rightIndex = activeBlocks[centerRow][2];

    board[centerRow][rightIndex] = null;
    board[topRow][centerIndex] = "tBlock";

    this.orientation = "second";
  }

  rotateSecond(board, activeBlocks, keys) {
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const centerIndex = activeBlocks[keys[2]][0];
    const rightIndex = centerIndex + 1;

    board[bottomRow][centerIndex] = null;
    board[centerRow][rightIndex] = "tBlock";

    this.orientation = "third";
  }

  rotateThird(board, activeBlocks, keys) {
    const centerRow = keys[1];
    const bottomRow = Tetromino.nextLetterRowDownwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const centerIndex = activeBlocks[centerRow][1];

    board[centerRow][leftIndex] = null;
    board[bottomRow][centerIndex] = "tBlock";

    this.orientation = "fourth";
  }

  rotateFourth(board, activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const centerIndex = activeBlocks[topRow][0];
    const leftIndex = centerIndex - 1;

    board[topRow][centerIndex] = null;
    board[centerRow][leftIndex] = "tBlock";

    this.orientation = "first";
  }
}
