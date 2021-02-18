document.addEventListener("DOMContentLoaded", () => {
  //   Gameplay.createNewBoard();
  document
    .getElementById("game-display")
    .addEventListener("keydown", function (event) {
      Gameplay.handleArrowKey(event.key);
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
      console.log("new game");
      break;
    case "instructions":
      console.log("instructions");
      break;
    case "leaderboard":
      console.log("leaderboard");
      break;
    case "play":
      console.log("play");
      break;
  }
}
