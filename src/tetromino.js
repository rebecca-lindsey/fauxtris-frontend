class Tetromino {
  constructor() {
    this.orientation = "first";
    Tetromino.activeTetromino = this;
  }
  static activeTetromino;
  static blockFallInterval;

  static nextLetterRowUpwards(rowName) {
    if (rowName === Object.keys(Gameplay.currentGame.board)[0]) {
      return "invalidRow";
    } else {
      return `${String.fromCharCode(rowName.charCodeAt(0) + 1)}Row`;
    }
  }

  static nextLetterRowDownwards(rowName) {
    if (rowName === Object.keys(Gameplay.currentGame.board).slice(-1)[0]) {
      return "invalidRow";
    } else {
      return `${String.fromCharCode(rowName.charCodeAt(0) - 1)}Row`;
    }
  }

  addBlocks(blocksToAdd) {
    const activeBlocks = Tetromino.activeTetromino.activeBlocks;
    for (const row in blocksToAdd) {
      blocksToAdd[row].map((index) => {
        Gameplay.currentGame.board[row][index] = this.constructor.name;

        if (activeBlocks != undefined) {
          if (activeBlocks.hasOwnProperty(row)) {
            activeBlocks[row].push(index);
          } else {
            activeBlocks[row] = [index];
          }
          activeBlocks[row] = activeBlocks[row].sort();
        }
      });
    }
  }

  removeBlocks(blocksToRemove) {
    const activeBlocks = Tetromino.activeTetromino.activeBlocks;

    for (const row in blocksToRemove) {
      blocksToRemove[row].map((index) => {
        Gameplay.currentGame.board[row][index] = null;

        if (activeBlocks != undefined) {
          if (activeBlocks[row].length == 1) {
            delete activeBlocks[row];
          } else {
            activeBlocks[row] = activeBlocks[row].filter(
              (number) => number !== index
            );
          }
        }
      });
    }
  }

  updateBlocks(blocksToAdd, blocksToRemove = {}) {
    this.removeBlocks(blocksToRemove);

    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.addBlocks(blocksToAdd);
      Gameplay.currentGame.populateBoard();
    } else {
      this.addBlocks(blocksToRemove);
    }
  }

  moveLeft(activeBlocks, keys) {
    const blocksToRemove = {};
    const blocksToAdd = {};

    keys.forEach((row) => {
      const firstIndex = Math.min(...activeBlocks[row]);
      const lastIndex = Math.max(...activeBlocks[row]);

      blocksToRemove[row] = [lastIndex];
      blocksToAdd[row] = [firstIndex - 1];
    });

    this.updateBlocks(blocksToAdd, blocksToRemove);
  }

  moveRight(activeBlocks, keys) {
    const blocksToRemove = {};
    const blocksToAdd = {};

    keys.forEach((row) => {
      const firstIndex = Math.min(...activeBlocks[row]);
      const lastIndex = Math.max(...activeBlocks[row]);

      blocksToRemove[row] = [firstIndex];
      blocksToAdd[row] = [lastIndex + 1];
    });

    this.updateBlocks(blocksToAdd, blocksToRemove);
  }

  updateBlocksOnMoveDown(blocksToAdd, blocksToRemove) {
    this.removeBlocks(blocksToRemove);
    if (Gameplay.currentGame.validMove(blocksToAdd)) {
      this.addBlocks(blocksToAdd);
      Gameplay.currentGame.populateBoard();
    } else {
      this.addBlocks(blocksToRemove);
      if (Gameplay.currentGame.checkForLoss(blocksToAdd)) {
      } else {
        Gameplay.currentGame.generateNewBlock();
      }
    }
  }

  moveDown(activeBlocks, keys) {
    const blocksToRemove = {};
    const blocksToAdd = {};

    for (let i = 0; i < keys.length; i++) {
      blocksToRemove[keys[i]] = activeBlocks[keys[i]];
      blocksToAdd[Tetromino.nextLetterRowDownwards(keys[i])] =
        activeBlocks[keys[i]];
    }

    this.updateBlocksOnMoveDown(blocksToAdd, blocksToRemove);
  }

  blockFall() {
    clearInterval(Tetromino.blockFallInterval);

    let speed;

    switch (Gameplay.currentGame.difficulty) {
      case "Easy":
        speed = 1200;
        break;
      case "Medium":
        speed = 800;
        break;
      case "Hard":
        speed = 400;
        break;
    }

    Tetromino.blockFallInterval = setInterval(() => {
      const activeBlocks = Tetromino.activeTetromino.activeBlocks;
      const keys = Object.keys(activeBlocks);
      this.moveDown(activeBlocks, keys);
    }, speed);
  }
}
