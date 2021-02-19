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
    .then((data) => console.log(data));
}
