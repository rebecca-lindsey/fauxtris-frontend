class Difficulty {
  constructor(level, scoreArray, id) {
    this.level = level;
    this.scores = scoreArray.sort((a, b) => parseInt(b) - parseInt(a));
    this.id = id;
    Difficulty.allDifficulties.push(this);
  }

  static allDifficulties = [];

  updateDatabase(scoreToAdd, scoreToRemove) {
    debugger;
  }

  addNewScoreToDatabase(scoreToAdd) {
    // let configObj = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     points: e.target.children[0].querySelector("input").value,
    //     initials: e.target.children[1].querySelector("input").value,
    //     difficulty_id: e.target.children[2].querySelector("input").value,
    //   }),
    // };
    // fetch(url, configObj)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  }
}
