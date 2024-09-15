export class Board {
    constructor() {
        //valeur initiale du plateau de jeu
        this.board = [
            [1, 1, 1],
            [1, 0, 2],
            [2, 2, 2],
        ];
        this.board = this.board;
    }
    getBoard() {
        return this.board;
    }
    resetBoard() {
        this.board = [
            [1, 1, 1],
            [1, 0, 2],
            [2, 2, 2],
        ];
    }
    movePawn(row, col, playerType) {
        return false;
    }
}
