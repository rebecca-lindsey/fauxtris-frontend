document.addEventListener("DOMContentLoaded", () => {
  //   Gameplay.createNewBoard();
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
      new Gameplay();
      document.getElementById("game-overlay").classList.add("hide-element");
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
      new Gameplay();
      document.getElementById("game-overlay").classList.add("hide-element");
      break;
    case "return-to-game":
      returnButtonToOriginal(id);
      returnToGame();
      break;
  }
}

function fetchLeaderboard() {
  fetch("http://127.0.0.1:3000/difficulty.json")
    .then((response) => response.json())
    .then((data) => displayScores(data));
}

function displayScores(scoreObj) {
  if (Gameplay.currentGame) {
    Gameplay.currentGame.stopGame();
  }
  const overlayDiv = document.getElementById("game-overlay");
  overlayDiv.classList.remove("hide-element");
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
  overlayDiv.classList.remove("hide-element");
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

function returnButtonToOriginal(btnId) {
  const button = document.getElementById(btnId);
  const buttonArray = [...document.getElementById("side-navigation").children];
  if (buttonArray.find((name) => name.id === "how-to-play")) {
    button.id = "leaderboard";
    button.innerHTML = "Leaderboard";
  } else if (buttonArray.find((name) => name.id === "leaderboard")) {
    button.id = "how-to-play";
    button.innerHTML = "How To Play";
  }
}
