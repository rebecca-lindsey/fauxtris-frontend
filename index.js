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
      break;
    case "leaderboard":
      fetchLeaderboard();
      break;
    case "play":
      new Gameplay();
      document.getElementById("game-overlay").classList.add("hide-element");
      break;
  }
}

function fetchLeaderboard() {
  fetch("http://127.0.0.1:3000/difficulty.json")
    .then((response) => response.json())
    .then((data) => displayScores(data));
}

// function displayLeaderboard(scores) {
//   const overlayDiv = document.getElementById("game-overlay");
//   overlayDiv.classList.remove("hide-element");
//   overlayDiv.innerHTML = displayScores(scores);
// }

function displayScores(scoreObj) {
  const overlayDiv = document.getElementById("game-overlay");
  overlayDiv.classList.remove("hide-element");
  const ul = document.createElement("ul");
  for (const difficulty of scoreObj) {
    ul.innerHTML += difficulty.level;
    for (const score of difficulty.scores) {
      const li = document.createElement("li");
      li.innerText = `${score.points} - ${score.initials}`;
      ul.append(li);
    }
  }
  console.log(ul);
  overlayDiv.innerHTML = ul.innerHTML;
}
