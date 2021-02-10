class Tetromino {
    constructor() {
        this.element = document.createElement("div")
        this.element.classList.add("tetromino")
    }

}

class iBlock extends Tetromino {
    constructor(element) {
        super(element)
        this.element.classList.add("i-block")
        document.getElementById("game-display").appendChild(this.element)
    }

}