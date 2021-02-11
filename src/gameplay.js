function populateBoard() {
    // 20 high, 10 across
    let gameRows = {}
    for (let i = 0; i < 20; i++){
        gameRows[`${String.fromCharCode(97 + i)}Row`] = Array(10).fill(null)
        gameRows[Object.keys(gameRows)[i]].forEach((space) => {
            const newSpace = document.createElement("div")
            newSpace.classList.add("game-space")
            document.getElementById("game-display").append(newSpace)
        })
    }
}