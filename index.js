document.addEventListener("DOMContentLoaded", () => {
    Gameplay.createNewBoard()
    document.getElementById("game-display").addEventListener("keydown", function (event) {
        console.log(event)
        Gameplay.handleArrowKey(event.key)
    })
});
