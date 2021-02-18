class tBlock extends FourRotation {
  constructor(orientation) {
    super(orientation);
    this.activeBlocks = this.populateTBlock();
  }

  populateTBlock() {
    const blocksToAdd = {};
    const firstRowName = Object.keys(Gameplay.currentGame.board)[0];
    const secondRowName = Object.keys(Gameplay.currentGame.board)[1];

    for (let i = 3; i < 6; i++) {
      if (blocksToAdd.hasOwnProperty(firstRowName)) {
        blocksToAdd[firstRowName].push(i);
      } else {
        blocksToAdd[firstRowName] = [i];
      }
    }
    blocksToAdd[secondRowName] = [4];

    this.updateBlocks(blocksToAdd);
    return blocksToAdd;
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

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
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

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
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

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
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

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "first";
    }
  }
}
