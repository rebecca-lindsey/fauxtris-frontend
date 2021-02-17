class oBlock extends Tetromino {
  constructor(orientation) {
    super(orientation);
    this.activeBlocks = this.populateOBlock();
  }

  populateOBlock() {
    const blocksToAdd = {};
    const firstRowName = Object.keys(Gameplay.gameBoard)[0];
    const secondRowName = Object.keys(Gameplay.gameBoard)[1];

    for (let i = 4; i < 6; i++) {
      if (blocksToAdd.hasOwnProperty(firstRowName)) {
        blocksToAdd[firstRowName].push(i);
      } else {
        blocksToAdd[firstRowName] = [i];
      }

      if (blocksToAdd.hasOwnProperty(secondRowName)) {
        blocksToAdd[secondRowName].push(i);
      } else {
        blocksToAdd[secondRowName] = [i];
      }
    }

    this.updateBlocks(blocksToAdd);
    return blocksToAdd;
  }
}
