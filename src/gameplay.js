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
            "I-active": "i-block",
            "O-active": "o-block",
            "T-active": "t-block",
            "S-active": "s-block",
            "Z-active": "z-block",
            "J-active": "j-block",
            "L-active": "l-block",
        }
        return colorList[space]
    }

    static handleArrowKey(key) {
        switch (key) {
            case "ArrowLeft":
                Gameplay.moveLeft()
                break
            case "ArrowRight":
                console.log("Right Case");
                break
            case "ArrowDown":
                console.log("Down Case");
                break
            case " ":
                console.log("Space Case");
        }
    }

    static moveLeft() {
        let activeBlocks = Gameplay.findActiveBlocks()
        let row = Gameplay.gameBoard[`${Object.keys(activeBlocks)[0]}`]
        let key = Object.keys(activeBlocks)[0]
        let firstIndex = activeBlocks[key][0]
        if (firstIndex === 0) {
            return
        }
        let lastIndex = activeBlocks[key].slice(-1)
        row[firstIndex - 1] = "I-active"
        row[lastIndex] = null
        Gameplay.populateBoard()
    }

    static findActiveBlocks() {
        let activeBlocks = {}
        for (const row in Gameplay.gameBoard) {
            if (Gameplay.gameBoard[`${row}`].some((item) => item != null)) {
                Gameplay.gameBoard[`${row}`].forEach((value, index) => {
                if (value == "I-active") {
                    if (activeBlocks[`${row}`]) {
                        activeBlocks[`${row}`].push(index)
                    } else {
                        activeBlocks[`${row}`] = [index]
                    }
                }
                })
            }
        }
        return activeBlocks
    }
}


Gameplay.gameBoard[`${Object.keys(activeBlocks)[0]}`]

activeBlocks[`${row}`]