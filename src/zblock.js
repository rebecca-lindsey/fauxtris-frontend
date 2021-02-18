class zBlock extends TwoRotation {
  constructor(orientation) {
    super(orientation);
    this.activeBlocks = this.populateZBlock();
  }

  populateZBlock() {
    const blocksToAdd = {};
    const firstRowName = Object.keys(Gameplay.currentGame.board)[0];
    const secondRowName = Object.keys(Gameplay.currentGame.board)[1];

    for (let i = 3; i < 6; i++) {
      switch (i) {
        case 3:
          blocksToAdd[firstRowName] = [i];
          break;
        case 4:
          blocksToAdd[firstRowName].push(i);
          blocksToAdd[secondRowName] = [i];
          break;
        case 5:
          blocksToAdd[secondRowName].push(i);
          break;
      }
    }

    this.updateBlocks(blocksToAdd);
    return blocksToAdd;
  }

  rotateFirst(activeBlocks, keys) {
    const centerRow = keys[0];
    const bottomRow = keys[1];
    const topRow = Tetromino.nextLetterRowUpwards(centerRow);
    const leftIndex = activeBlocks[centerRow][0];
    const rightIndex = activeBlocks[bottomRow][1];

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[centerRow] = [leftIndex];
    blocksToRemove[bottomRow] = [rightIndex];
    blocksToAdd[topRow] = [rightIndex];
    blocksToAdd[centerRow] = [rightIndex];

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "second";
    }
  }

  rotateSecond(activeBlocks, keys) {
    const topRow = keys[0];
    const centerRow = keys[1];
    const bottomRow = keys[2];
    const rightIndex = activeBlocks[topRow][0];
    const leftIndex = activeBlocks[centerRow][0] - 1;

    const blocksToRemove = {};
    const blocksToAdd = {};

    blocksToRemove[topRow] = [rightIndex];
    blocksToRemove[centerRow] = [rightIndex];
    blocksToAdd[centerRow] = [leftIndex];
    blocksToAdd[bottomRow] = [rightIndex];

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.updateBlocks(blocksToAdd, blocksToRemove);
      this.orientation = "first";
    }
  }
}
