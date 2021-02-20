document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", function (event) {
    Gameplay.currentGame.handleArrowKey(event.key);
  });

  document
    .getElementById("horizontal-content")
    .addEventListener("click", function (event) {
      handleClick(event.target.id);
    });

  fetchLeaderboard();
});

function handleClick(id) {
  switch (id) {
    case "new-game":
      returnButtonToOriginal();
      selectDifficulty();
      break;
    case "how-to-play":
      changeButtonToGame(id);
      displayHowToPlay();
      break;
    case "leaderboard":
      changeButtonToGame(id);
      displayHighScores();
      break;
    case "play":
      selectDifficulty();
      break;
    case "return-to-game":
      returnButtonToOriginal();
      returnToGame();
      break;
    case "easy":
      new Gameplay("Easy");
      clearContentAndRemoveFlex();
      break;
    case "medium":
      new Gameplay("Medium");
      clearContentAndRemoveFlex();
      break;
    case "hard":
      new Gameplay("Hard");
      clearContentAndRemoveFlex();
      break;
    case "score-submit":
      const initials = document.getElementById("initials").value.toUpperCase();
      Gameplay.currentGame.addNewHighScore(initials);
  }
}

function fetchLeaderboard() {
  fetch("http://127.0.0.1:3000/difficulty.json")
    .then((response) => response.json())
    .then((data) => createDifficultyScores(data));
}

function createDifficultyScores(scoreObj) {
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

function clearContentAndRemoveFlex() {
  document.getElementById("game-overlay").classList.remove("show-flex-element");
  document.getElementById("game-overlay").classList.add("hide-element");
  document.getElementById("game-overlay").innerHTML = "";
}

function clearContentAndAddFlex() {
  document.getElementById("game-overlay").classList.add("show-flex-element");
  document.getElementById("game-overlay").classList.remove("hide-element");
  document.getElementById("game-overlay").innerHTML = "";
}

function displayHighScores(difficulty = null) {
  if (Gameplay.currentGame) {
    Gameplay.currentGame.stopGame();
  }

  clearContentAndAddFlex();

  let difficulties = [];

  if (difficulty) {
    difficulties.push(difficulty);
  } else {
    difficulties = Difficulty.allDifficulties;
  }

  for (const difficulty of difficulties) {
    const div = document.createElement("div");
    div.innerHTML = `<p class="list-header">${difficulty.level}</p>`;
    const ul = document.createElement("ul");
    for (const score of difficulty.scores) {
      const li = document.createElement("li");
      li.innerText = `${score.points} - ${score.initials}`;
      ul.append(li);
    }
    div.append(ul);
    document.getElementById("game-overlay").append(div);
  }
}

function displayHowToPlay() {
  if (Gameplay.currentGame) {
    Gameplay.currentGame.stopGame();
  }
  clearContentAndAddFlex();

  document.getElementById(
    "game-overlay"
  ).innerHTML = `<div id="how-to-play-text">
                              <p>Blocks are falling from the sky!
                              <br>If they touch the top, you lose.
                              <br>Clear blocks by filling in rows.
                              <br>How many rows can you clear?</p>
                              <ul>
                                <li>Right Arrow Key - Move right</li>
                                <li>Left Arrow Key - Move left</li>
                                <li>Down Arrow Key - Move down</li>
                                <li>Spacebar - Rotate
                                <br>(Blocks have 0, 2, or 4 rotations) </li>
                              </ul>
                            </div>`;
}

function returnToGame() {
  clearContentAndRemoveFlex();
  Gameplay.currentGame.continueGame();
}

function changeButtonToGame(id) {
  const previousBtnClicked = document.getElementById("return-to-game");
  if (previousBtnClicked) {
    preventDuplicateButtons(previousBtnClicked, id);
  }
  if (Gameplay.currentGame) {
    const button = document.getElementById(id);
    button.id = "return-to-game";
    button.innerHTML = "Return to Game";
  }
}

function preventDuplicateButtons(previousBtnClicked, idOfCurrentBtn) {
  if (idOfCurrentBtn === "how-to-play") {
    previousBtnClicked.id = "leaderboard";
    previousBtnClicked.innerHTML = "Leaderboard";
  } else if (idOfCurrentBtn === "leaderboard") {
    previousBtnClicked.id = "how-to-play";
    previousBtnClicked.innerHTML = "how-to-play";
  }
}

function returnButtonToOriginal() {
  const button = document.getElementById("return-to-game");
  if (!button) {
    return;
  }
  const buttonArray = [...document.getElementById("side-navigation").children];
  if (buttonArray.find((name) => name.id === "how-to-play")) {
    button.id = "leaderboard";
    button.innerHTML = "Leaderboard";
  } else if (buttonArray.find((name) => name.id === "leaderboard")) {
    button.id = "how-to-play";
    button.innerHTML = "How To Play";
  }
}

function selectDifficulty() {
  clearContentAndAddFlex();
  document.getElementById(
    "game-overlay"
  ).innerHTML = `<div id="difficulty-buttons">
                            <h2 class="difficulty-level" id="difficulty-selector">Select your difficulty</h2>
                            <button id="easy" class="difficulty-level">Easy</button>
                            <button id="medium" class="difficulty-level">Medium</button>
                            <button id="hard" class="difficulty-level">Hard</button>
                            </div>`;
}
