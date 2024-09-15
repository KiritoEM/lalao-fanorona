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
            if (this.board[row][col] === this.gameHelper.getCurrentPlayer()) {
                this.board[newRow][newCol] = this.board[row][col];
                this.board[row][col] = 0;
                this.gameHelper.changeTurn();
            }
            else {
                alert(`Erreur de tour: tour du joueur ${this.gameHelper.getCurrentPlayer()}`);
            }
        }
        else {
            alert("Déplacement invalide");
        }
    }
    suggestMoves(row, col) {
        let moves = [];
        const linearMoves = [
            [row - 1, col], //gauche
            [row + 1, col], //droite
            [row, col - 1], //ascendant
            [row, col + 1], //descendant
        ];
        const diagonalMoves = [
            [row - 1, col - 1],
            [row - 1, col + 1],
            [row + 1, col - 1],
            [row + 1, col + 1],
        ];
        //mouvement valides
        linearMoves.forEach((move) => {
            if (this.boardHelper.canMove(row, col, move[1], move[0])) {
                moves.push(move);
            }
        });
        diagonalMoves.forEach((move) => {
            if (this.boardHelper.canMove(row, col, move[1], move[0])) {
                moves.push(move);
            }
        });
        return moves;
    }
}
