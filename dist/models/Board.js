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
        //mouvements possibles
        const linearMoves = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
        ];
        const diagonalMoves = [
            [row - 1, col - 1],
            [row - 1, col + 1],
            [row + 1, col - 1],
            [row + 1, col + 1],
        ];
        const isValidMove = (move) => {
            //pur s' assurer que les actions sont dans la matrice
            const [newRow, newCol] = move;
            return (newRow >= 0 &&
                newRow < this.board.length &&
                newCol >= 0 &&
                newCol < this.board[0].length &&
                this.board[newRow][newCol] === 0 &&
                this.board[row][col] === this.gameHelper.getCurrentPlayer());
        };
        //mouvement valides
        linearMoves.forEach((move) => {
            if (this.boardHelper.canMove(row, col, move[1], move[0]) &&
                isValidMove(move)) {
                moves.push(move);
                console.log("linear suggest" + move);
            }
        });
        diagonalMoves.forEach((move) => {
            if (this.boardHelper.canMove(row, col, move[1], move[0]) &&
                isValidMove(move)) {
                moves.push(move);
                console.log("diagonal suggest" + move);
            }
        });
        return moves;
    }
}
