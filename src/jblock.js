class jBlock extends FourRotation {
  constructor(orientation) {
    super(orientation);
    this.activeBlocks = this.populateJBlock();
  }

  populateJBlock() {
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
    blocksToAdd[secondRowName] = [5];

    this.updateBlocks(blocksToAdd);
    return blocksToAdd;
  }

  rotateFirst(activeBlocks, keys) {
    const topRow = Tetromino.nextLetterRowUpwards(keys[0]);
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const leftIndex = activeBlocks[centerRow][0];
    const centerIndex = activeBlocks[centerRow][1];
    const rightIndex = activeBlocks[bottomRow][0];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[centerRow] = [leftIndex, rightIndex];
    blocksToRemove[bottomRow] = [rightIndex];
    blocksToAdd[bottomRow] = [leftIndex, centerIndex];
    blocksToAdd[topRow] = [centerIndex];

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "second";
    }
  }

  rotateSecond(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const leftIndex = activeBlocks[bottomRow][0];
    const centerIndex = activeBlocks[bottomRow][1];
    const rightIndex = centerIndex + 1;

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[bottomRow] = [leftIndex, centerIndex];
    blocksToRemove[topRow] = [centerIndex];
    blocksToAdd[topRow] = [leftIndex];
    blocksToAdd[centerRow] = [leftIndex, rightIndex];
    if (Gameplay.currentGame.validMove(blocksToAdd)) {
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

    blocksToRemove[topRow] = [leftIndex];
    blocksToRemove[centerRow] = [leftIndex, rightIndex];
    blocksToAdd[topRow] = [centerIndex, rightIndex];
    blocksToAdd[bottomRow] = [centerIndex];

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "fourth";
    }
  }

  rotateFourth(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const centerIndex = activeBlocks[topRow][0];
    const leftIndex = centerIndex - 1;
    const rightIndex = activeBlocks[topRow][1];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[topRow] = [centerIndex, rightIndex];
    blocksToRemove[bottomRow] = [centerIndex];
    blocksToAdd[centerRow] = [leftIndex, rightIndex];
    blocksToAdd[bottomRow] = [rightIndex];

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "first";
    }
  }
}
