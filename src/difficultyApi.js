class DifficultyApi {
  static fetchLeaderboard() {
    fetch("http://127.0.0.1:3000/difficulty.json")
      .then((response) => response.json())
      .then((data) => createDifficultyScores(data));
  }
}
