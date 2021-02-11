document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded")
    document.getElementById("game-display").addEventListener("keydown", function (event) {
        Gameplay.handleArrowKey(event)
    })
});
