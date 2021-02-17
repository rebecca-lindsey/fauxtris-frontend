class lBlock extends FourRotation {
  constructor(orientation) {
    super(orientation);
    this.activeBlocks = this.populateLBlock();
  }

  populateLBlock() {
    const blocksToAdd = {};
    const firstRowName = Object.keys(Gameplay.gameBoard)[0];
    const secondRowName = Object.keys(Gameplay.gameBoard)[1];

    for (let i = 3; i < 6; i++) {
      if (blocksToAdd.hasOwnProperty(firstRowName)) {
        blocksToAdd[firstRowName].push(i);
      } else {
        blocksToAdd[firstRowName] = [i];
      }
    }
    blocksToAdd[secondRowName] = [3];

    this.updateBlocks(blocksToAdd);
    return blocksToAdd;
  }

  rotateFirst(activeBlocks, keys) {
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const centerIndex = activeBlocks[centerRow][1];
    const rightIndex = activeBlocks[centerRow][2];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[centerRow] = [leftIndex, rightIndex];
    blocksToRemove[bottomRow] = [leftIndex];
    blocksToAdd[topRow] = [leftIndex, centerIndex];
    blocksToAdd[bottomRow] = [centerIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "second";
    }
  }

  rotateSecond(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const leftIndex = activeBlocks[topRow][0];
    const centerIndex = activeBlocks[topRow][1];
    const rightIndex = centerIndex + 1;

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[topRow] = [leftIndex, centerIndex];
    blocksToRemove[bottomRow] = [centerIndex];
    blocksToAdd[centerRow] = [leftIndex, rightIndex];
    blocksToAdd[topRow] = [rightIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "third";
    }
  }

  rotateThird(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = Tetromino.nextLetterRowDownwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const centerIndex = activeBlocks[centerRow][1];
    const rightIndex = activeBlocks[centerRow][2];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[centerRow] = [leftIndex, rightIndex];
    blocksToRemove[topRow] = [rightIndex];
    blocksToAdd[bottomRow] = [centerIndex, rightIndex];
    blocksToAdd[topRow] = [centerIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "fourth";
    }
  }

  rotateFourth(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const leftIndex = activeBlocks[centerRow][0] - 1;
    const centerIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[bottomRow][1];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[topRow] = [centerIndex];
    blocksToRemove[bottomRow] = [centerIndex, rightIndex];
    blocksToAdd[centerRow] = [leftIndex, rightIndex];
    blocksToAdd[bottomRow] = [leftIndex];

    if (Gameplay.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "first";
    }
  }
}
