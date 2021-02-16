class FourRotation extends Tetromino {
  rotate(board, activeBlocks, keys) {
    switch (this.orientation) {
      case "first":
        this.rotateFirst(activeBlocks, keys);
        break;
      case "second":
        this.rotateSecond(activeBlocks, keys);
        break;
      case "third":
        this.rotateThird(activeBlocks, keys);
        break;
      case "fourth":
        this.rotateFourth(activeBlocks, keys);
        break;
    }

    Gameplay.populateBoard();
  }
}

class TwoRotation extends Tetromino {
  rotate(board, activeBlocks, keys) {
    if (this.orientation == "first") {
      this.rotateFirst(board, activeBlocks, keys);
    } else if (this.orientation == "second") {
      this.rotateSecond(board, activeBlocks, keys);
    }
    Gameplay.populateBoard();
  }
}
