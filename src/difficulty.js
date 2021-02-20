class Difficulty {
  constructor(level, scoreArray) {
    this.level = level;
    this.scores = scoreArray;
    Difficulty.allDifficulties = this;
  }

  static allDifficulties;
}
