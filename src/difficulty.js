class Difficulty {
  constructor(level, scoreArray) {
    this.level = level;
    this.scores = scoreArray.sort().reverse();
    Difficulty.allDifficulties.push(this);
  }

  static allDifficulties = [];
}
