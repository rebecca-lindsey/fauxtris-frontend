class ScoreApi {
  constructor() {
    this.baseUrl = "http://127.0.0.1:3000/score";
  }

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

    fetch(this.baseUrl, configObj)
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

    fetch(`${this.baseUrl}${scoreToRemove.id}`, configObj);
  }
}
