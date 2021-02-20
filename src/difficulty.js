class Difficulty {
  constructor(level, scoreArray, id) {
    this.level = level;
    this.scores = scoreArray.sort(
      (a, b) => parseInt(b.points) - parseInt(a.points)
    );
    this.id = id;
    Difficulty.allDifficulties.push(this);
  }

  static allDifficulties = [];
}
