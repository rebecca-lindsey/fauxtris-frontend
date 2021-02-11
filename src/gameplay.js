class Gameplay {

    static gameBoard = {}

    static score = 0

    static createNewBoard() {
        for (let i = 20; i > 0; i--) {
            const rowName = `${String.fromCharCode(96 + i)}Row`
            Gameplay.gameBoard[rowName] = Array(10).fill(null)
        }
        Gameplay.populateBoard()
    }

    static clearBoard() {
        document.getElementById("game-display").innerHTML = ''
    }

    static populateBoard() {
        Gameplay.clearBoard()
        for (const row in Gameplay.gameBoard) {
            for (const space of Gameplay.gameBoard[`${row}`]){
                const newSpace = document.createElement("div")
                newSpace.classList.add("game-space")
                if (space != null) {
                    newSpace.classList.add(Gameplay.addColor(space))
                }
                    document.getElementById("game-display").append(newSpace)
            }
        }
    }

    static addColor(space) {
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

    static handleArrowKey(event) {
        console.log("key")
        console.log(event)
    }
}