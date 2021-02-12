class tBlock extends Tetromino {
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
}

//   rotate(board, activeBlocks, keys) {
//     let firstIndex = activeBlocks[keys[0]][0];
//     let lastIndex = activeBlocks[keys[0]].slice(-1)[0];
//     if (this.orientation == "first") {
//       this.rotateFirst(board, activeBlocks, keys, firstIndex, lastIndex);
//     } else if (this.orientation == "second") {
//       this.rotateSecond(board, activeBlocks, keys, firstIndex, lastIndex);
//     }
//     Gameplay.populateBoard();
//   }

//   rotateFirst(board, activeBlocks, keys, firstIndex, lastIndex) {
//     let alphaIncrementor = 2;
//     let row = board[keys];
//     let newSpace = activeBlocks[keys][2];
//     for (let i = firstIndex; i <= lastIndex; i++) {
//       let newLetter = `${String.fromCharCode(
//         keys[0].charCodeAt(0) + alphaIncrementor
//       )}Row`;
//       row[i] = null;
//       Gameplay.gameBoard[newLetter][newSpace] = "iBlock";
//       alphaIncrementor -= 1;
//     }
//     this.orientation = "second";
//   }

//   rotateSecond(board, activeBlocks, keys, firstIndex, lastIndex) {
//     let newLetter = keys[2];
//     for (const row in activeBlocks) {
//       let index = activeBlocks[row][0];
//       board[row][index] = null;
//     }
//     for (let i = firstIndex - 2; i <= lastIndex + 1; i++) {
//       board[newLetter][i] = "iBlock";
//     }
//     this.orientation = "first";
//   }
// }
