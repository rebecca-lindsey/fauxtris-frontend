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
      handleClick(event);
    });
});

function handleClick(event) {
  switch (event.target.id) {
    case "new-game":
      new Gameplay();
      document.getElementById("game-overlay").classList.add("hide-element");
      break;
    case "instructions":
      console.log("instructions");
      changeButtonToGame(event.target.id);
      break;
    case "leaderboard":
      changeButtonToGame(event.target.id);
      fetchLeaderboard();
      break;
    case "play":
      new Gameplay();
      document.getElementById("game-overlay").classList.add("hide-element");
      break;
    case "return-to-game":
      returnButtonToOriginal(event.target.id);
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
  if (buttonArray.find((name) => name.id === "instructions")) {
    button.id = "leaderboard";
    button.innerHTML = "Leaderboard";
  } else if (buttonArray.find((name) => name.id === "leaderboard")) {
    button.id = "instructions";
    button.innerHTML = "Instructions";
  }
}
