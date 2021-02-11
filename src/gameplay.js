function createNewBoard() {
    let gameRows = {}
    for (let i = 0; i < 20; i++) {
        const rowName = `${String.fromCharCode(97 + i)}Row`
        gameRows[rowName] = Array(10).fill(null)
    }
    populateBoard(gameRows)
}

function populateBoard(board) {
    for (const row in board) {
        for (const space of board[`${row}`]){
            const newSpace = document.createElement("div")
            newSpace.classList.add("game-space")
            if (space != null) {
                // run new function here
            }
                document.getElementById("game-display").append(newSpace)
        }
    }
}