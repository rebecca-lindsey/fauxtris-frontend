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

  updateDatabase(newScore, newInitials, scoreToRemove) {
    this.removeScoreFromDatabase(scoreToRemove);
    setTimeout(() => {
      this.addNewScoreToDatabase(newScore, newInitials);
    }, 200);
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

  removeScoreFromDatabase(scoreToRemove) {
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(`http://127.0.0.1:3000/score/${scoreToRemove.id}`, configObj);
  }
}
