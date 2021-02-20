class DifficultyApi {
  static fetchLeaderboard() {
    fetch("http://127.0.0.1:3000/difficulty.json")
      .then((response) => response.json())
      .then((data) => DifficultyApi.createDifficultyScores(data));
  }

  static createDifficultyScores(scoreObj) {
    for (const difficulty of scoreObj) {
      const scoreArray = [];
      for (const score of difficulty.scores) {
        scoreArray.push(
          new Score(score.points, score.initials, score.id, score.difficulty_id)
        );
      }
      new Difficulty(difficulty.level, scoreArray, difficulty.id);
    }
  }
}
