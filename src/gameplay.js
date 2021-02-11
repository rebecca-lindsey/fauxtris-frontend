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
                newSpace.classList.add(addColor(space))
                console.log(addColor(space))
            }
                document.getElementById("game-display").append(newSpace)
        }
    }
}

function addColor(space) {
    const colorList = {
        "I": "i-block",
        "O": "o-block",
        "T": "t-block",
        "S": "s-block",
        "Z": "z-block",
        "J": "j-block",
        "L": "l-block",
    }
    return colorList[space]
}