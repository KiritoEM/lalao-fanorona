import { BoardHelper } from "../helpers/BoardHelper.js";
import { GameHelper } from "../helpers/GameHelper.js";
export class Board {
    constructor() {
        // Valeur initiale du plateau de jeu
        this.board = [
            [1, 1, 1],
            [0, 0, 0],
            [2, 2, 2],
        ];
        this.boardHelper = new BoardHelper();
        this.gameHelper = new GameHelper();
    }
    getBoard() {
        return this.board;
    }
    resetBoard() {
        this.board = [
            [1, 1, 1],
            [0, 0, 0],
            [2, 2, 2],
        ];
    }
    movePawn(row, col, newRow, newCol) {
        if (this.boardHelper.canMove(row, col, newCol, newRow) &&
            this.board[newRow][newCol] === 0) {
            this.board[newRow][newCol] = this.board[row][col];
            this.board[row][col] = 0;
            this.gameHelper.changeTurn();
            console.log("Tour: " + this.gameHelper.getCurrentPlayer());
        }
        else {
            alert("Impossible d'effectuer le déplacement");
        }
    }
}
