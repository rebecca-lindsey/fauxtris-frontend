document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("game-display")
    .addEventListener("keydown", function (event) {
      Gameplay.currentGame.handleArrowKey(event.key);
    });

  document
    .getElementById("horizontal-content")
    .addEventListener("click", function (event) {
      handleClick(event.target.id);
    });
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
      fetchLeaderboard();
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
      document.getElementById("game-overlay").style.display = "none";
      document.getElementById("game-overlay").innerHTML = "";
      break;
    case "medium":
      new Gameplay("Medium");
      document.getElementById("game-overlay").classList.add("hide-element");
      break;
    case "hard":
      new Gameplay("Hard");
      document.getElementById("game-overlay").classList.add("hide-element");
      break;
  }
}

function fetchLeaderboard() {
  fetch("http://127.0.0.1:3000/difficulty.json")
    .then((response) => response.json())
    .then((data) => displayHighScores(data));
}

function displayHighScores(scoreObj) {
  if (Gameplay.currentGame) {
    Gameplay.currentGame.stopGame();
  }
  const overlayDiv = document.getElementById("game-overlay");
  overlayDiv.style.display = "flex";
  overlayDiv.innerHTML = "";
  for (const difficulty of scoreObj) {
    const div = document.createElement("div");
    div.innerHTML = `<p class="list-header">${difficulty.level}</p>`;
    const ul = document.createElement("ul");
    for (const score of difficulty.scores) {
      const li = document.createElement("li");
      li.innerText = `${score.points} - ${score.initials}`;
      ul.append(li);
    }
    div.append(ul);
    overlayDiv.append(div);
  }
}

function displayHowToPlay() {
  if (Gameplay.currentGame) {
    Gameplay.currentGame.stopGame();
  }
  const overlayDiv = document.getElementById("game-overlay");
  overlayDiv.style.display = "flex";
  overlayDiv.innerHTML = `<div id="how-to-play-text">
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
  document.getElementById("game-overlay").classList.add("hide-element");
  Gameplay.currentGame.continueGame();
}

function changeButtonToGame(id) {
  if (Gameplay.currentGame) {
    const button = document.getElementById(id);
    button.id = "return-to-game";
    button.innerHTML = "Return to Game";
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
  document.getElementById(
    "game-overlay"
  ).innerHTML = `<div id="difficulty-buttons">
                            <h2 class="difficulty-level" id="difficulty-selector">Select your difficulty</h2>
                            <button id="easy" class="difficulty-level">Easy</button>
                            <button id="medium" class="difficulty-level">Medium</button>
                            <button id="hard" class="difficulty-level">Hard</button>
                            </div>`;
}
