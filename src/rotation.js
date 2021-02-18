class FourRotation extends Tetromino {
  rotate(activeBlocks, keys) {
    const keyArray = keys.sort().reverse();
    switch (this.orientation) {
      case "first":
        this.rotateFirst(activeBlocks, keyArray);
        break;
      case "second":
        this.rotateSecond(activeBlocks, keyArray);
        break;
      case "third":
        this.rotateThird(activeBlocks, keyArray);
        break;
      case "fourth":
        this.rotateFourth(activeBlocks, keyArray);
        break;
    }

    Gameplay.currentGame.populateBoard();
  }
}

class TwoRotation extends Tetromino {
  rotate(activeBlocks, keys) {
    const keyArray = keys.sort().reverse();
    if (this.orientation == "first") {
      this.rotateFirst(activeBlocks, keyArray);
    } else if (this.orientation == "second") {
      this.rotateSecond(activeBlocks, keyArray);
    }
    Gameplay.currentGame.populateBoard();
  }
}
