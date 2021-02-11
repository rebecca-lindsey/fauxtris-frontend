document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded")
    document.getElementById("game-display").addEventListener("keydown", function (event) {
        console.log(event)
        Gameplay.handleArrowKey(event.key)
    })
});
