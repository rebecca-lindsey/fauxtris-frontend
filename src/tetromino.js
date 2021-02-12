class Tetromino {
    static activeBlock
}

class iBlock extends Tetromino {
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