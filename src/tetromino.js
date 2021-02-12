class Tetromino {

    static activeBlock

    // constructor() {
    //     this.element = document.createElement("div")
    //     this.element.classList.add("tetromino")
    // }

}

class iBlock extends Tetromino {
    // constructor(element) {
    //     super(element)
    //     this.element.classList.add("i-block")
    //     document.getElementById("game-display").appendChild(this.element)
    // }
    constructor() {
        super()
        this.active = true
        Tetromino.activeBlock = this
        this.populateIBlock()
    }

    populateIBlock() {
        for (let i = 3; i < 7; i++) {
            Gameplay.gameBoard["tRow"][i] = "iBlock"
        }
        Gameplay.populateBoard()
    }

}