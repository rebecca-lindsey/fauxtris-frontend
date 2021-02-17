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

  rotateFirst(activeBlocks, keys) {
    const centerRow = keys[0];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const centerIndex = activeBlocks[centerRow][1];
    const rightIndex = activeBlocks[centerRow][2];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[centerRow] = [rightIndex];
    blocksToAdd[topRow] = [centerIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "second";
    }
  }

  rotateSecond(activeBlocks, keys) {
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const centerIndex = activeBlocks[keys[2]][0];
    const rightIndex = centerIndex + 1;

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[bottomRow] = [centerIndex];
    blocksToAdd[centerRow] = [rightIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "third";
    }
  }

  rotateThird(activeBlocks, keys) {
    const centerRow = keys[1];
    const bottomRow = Tetromino.nextLetterRowDownwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const centerIndex = activeBlocks[centerRow][1];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[centerRow] = [leftIndex];
    blocksToAdd[bottomRow] = [centerIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "fourth";
    }
  }

  rotateFourth(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const centerIndex = activeBlocks[topRow][0];
    const leftIndex = centerIndex - 1;

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[topRow] = [centerIndex];
    blocksToAdd[centerRow] = [leftIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "first";
    }
  }
}
