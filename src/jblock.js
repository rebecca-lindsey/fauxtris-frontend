class jBlock extends Tetromino {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateJBlock();
  }

  populateJBlock() {
    for (let i = 3; i < 6; i++) {
      Gameplay.gameBoard["tRow"][i] = "jBlock";
    }
    Gameplay.gameBoard["sRow"][5] = "jBlock";
    Gameplay.populateBoard();
  }

  rotate(board, activeBlocks, keys) {
    switch (this.orientation) {
      case "first":
        this.rotateFirst(board, activeBlocks, keys);
        break;
      case "second":
        this.rotateSecond(board, activeBlocks, keys);
        break;
      case "third":
        this.rotateThird(board, activeBlocks, keys);
        break;
      case "fourth":
        this.rotateFourth(board, activeBlocks, keys);
        break;
    }

    Gameplay.populateBoard();
  }

  rotateFirst(board, activeBlocks, keys) {
    const topRow = Tetromino.nextLetterRowUpwards(keys[0]);
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const leftIndex = activeBlocks[centerRow][0];
    const centerIndex = activeBlocks[centerRow][1];
    const rightIndex = activeBlocks[bottomRow][0];

    board[centerRow][leftIndex] = null;
    board[bottomRow][leftIndex] = "jBlock";
    board[bottomRow][rightIndex] = null;
    board[bottomRow][centerIndex] = "jBlock";
    board[centerRow][rightIndex] = null;
    board[topRow][centerIndex] = "jBlock";

    this.orientation = "second";
  }

  rotateSecond(board, activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const leftIndex = activeBlocks[bottomRow][0];
    const centerIndex = activeBlocks[bottomRow][1];
    const rightIndex = centerIndex + 1;

    board[bottomRow][leftIndex] = null;
    board[topRow][leftIndex] = "jBlock";
    board[bottomRow][centerIndex] = null;
    board[centerRow][leftIndex] = "jBlock";
    board[topRow][centerIndex] = null;
    board[centerRow][rightIndex] = "jBlock";

    this.orientation = "third";
  }

  rotateThird(board, activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = Tetromino.nextLetterRowDownwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const centerIndex = activeBlocks[centerRow][1];
    const rightIndex = activeBlocks[centerRow][2];

    board[topRow][leftIndex] = null;
    board[topRow][centerIndex] = "jBlock";
    board[centerRow][rightIndex] = null;
    board[topRow][rightIndex] = "jBlock";
    board[centerRow][leftIndex] = null;
    board[bottomRow][centerIndex] = "jBlock";

    this.orientation = "fourth";
  }

  rotateFourth(board, activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const topLeftIndex = activeBlocks[topRow][0];
    const topRightIndex = activeBlocks[topRow][1];
    const bottomIndex = activeBlocks[bottomRow][0];

    board[topRow][topLeftIndex] = null;
    board[centerRow][topLeftIndex - 1] = "jBlock";
    board[topRow][topRightIndex] = null;
    board[bottomRow][topRightIndex] = "jBlock";
    board[bottomRow][bottomIndex] = null;
    board[centerRow][topRightIndex] = "jBlock";

    this.orientation = "first";
  }
}
