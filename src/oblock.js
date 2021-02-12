class oBlock extends Tetromino {
  constructor(orientation) {
    super(orientation);
    this.active = true;
    Tetromino.activeBlock = this;
    this.populateOBlock();
  }

  populateOBlock() {
    for (let i = 4; i < 6; i++) {
      Gameplay.gameBoard["tRow"][i] = "oBlock";
      Gameplay.gameBoard["sRow"][i] = "oBlock";
    }
    Gameplay.populateBoard();
  }
}