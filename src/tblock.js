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
    let currentBlockIndex = activeBlocks[keys[2]][0];
    let newBlockIndex = activeBlocks[keys[1]][1] + 1;
    board[keys[2]][currentBlockIndex] = null;
    board[keys[1]][newBlockIndex] = "tBlock";
    this.orientation = "third";
  }

  rotateThird(board, activeBlocks, keys) {
    let currentBlockIndex = activeBlocks[keys[1]][0];
    let newBlockIndex = currentBlockIndex + 1;
    let newRow = Tetromino.nextLetterRowDownwards(keys[1]);
    board[keys[1]][currentBlockIndex] = null;
    board[newRow][newBlockIndex] = "tBlock";
    this.orientation = "fourth";
  }

  rotateFourth(board, activeBlocks, keys) {
    let currentBlockIndex = activeBlocks[keys[0]][0];
    let newBlockIndex = currentBlockIndex - 1;
    board[keys[0]][currentBlockIndex] = null;
    board[keys[1]][newBlockIndex] = "tBlock";
    this.orientation = "first";
  }
}
