class ScoreApi {
  static updateDatabase(scoreToAdd, scoreToRemove) {
    ScoreApi.removeScoreFromDatabase(scoreToRemove);
    setTimeout(() => {
      ScoreApi.addNewScoreToDatabase(scoreToAdd);
    }, 200);
  }

  static addNewScoreToDatabase(scoreToAdd) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(scoreToAdd),
    };

    fetch("http://127.0.0.1:3000/score", configObj)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  static removeScoreFromDatabase(scoreToRemove) {
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
