class Difficulty {
  constructor(level, scoreArray) {
    this.level = level;
    this.scores = scoreArray;
    Difficulty.allDifficulties.push(this);
    debugger;
  }

  static allDifficulties = [];
}
