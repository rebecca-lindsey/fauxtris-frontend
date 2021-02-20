class Difficulty {
  constructor(level, scoreArray, id) {
    this.level = level;
    this.scores = scoreArray.sort((a, b) => parseInt(b) - parseInt(a));
    this.id = id;
    Difficulty.allDifficulties.push(this);
  }

  static allDifficulties = [];

  updateDatabase(score, initials, scoreToRemove) {
    this.addNewScoreToDatabase(score, initials);
  }

  addNewScoreToDatabase(score, initials) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        points: score,
        initials: initials,
        difficulty_id: this.id,
      }),
    };
    fetch("http://127.0.0.1:3000/score", configObj)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}
