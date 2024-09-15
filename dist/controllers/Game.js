import { GREEN_COLOR, RED_COLOR } from "../helpers/constants.js";
import { GameHelper } from "../helpers/GameHelper.js";
import { Board } from "../models/Board.js";
export class FanoronaGame {
    constructor() {
        this.selectedRow = -1;
        this.selectedCol = -1;
        //instanciation de la classe Board
        this.board = new Board();
        this.gameHelper = new GameHelper();
        this.canvas = document.getElementById("board");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.adjustCanvasSize();
        this.cellSize = (this.canvas.width - 80) / 2; // grille de 2x2
        this.boardMatrix = this.board.getBoard();
    }
    start() {
        this.renderBoard();
        // Événement click
        this.canvas.addEventListener("click", (e) => this.handleGridClick(e));
    }
    adjustCanvasSize() {
        const container = this.canvas.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.canvas.width = width;
        this.canvas.height = height;
    }
    renderBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawDiagonals();
        this.drawPawns();
    }
    drawGrid() {
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        // lignes verticales
        for (let col = 0; col < 3; col++) {
            this.ctx.beginPath();
            this.ctx.moveTo(col * this.cellSize + 40, 40);
            this.ctx.lineTo(col * this.cellSize + 40, this.canvas.height - 40);
            this.ctx.stroke();
        }
        // lignes horizontales
        for (let row = 0; row < 3; row++) {
            this.ctx.beginPath();
            this.ctx.moveTo(40, row * this.cellSize + 40);
            this.ctx.lineTo(this.canvas.width - 40, row * this.cellSize + 40);
            this.ctx.stroke();
        }
    }
    drawDiagonals() {
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        // Diagonale principale
        this.ctx.beginPath();
        this.ctx.moveTo(40, 40);
        this.ctx.lineTo(this.canvas.width - 40, this.canvas.height - 40);
        this.ctx.stroke();
        // Diagonale secondaire
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width - 40, 40);
        this.ctx.lineTo(40, this.canvas.height - 40);
        this.ctx.stroke();
    }
    drawPawns() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.boardMatrix[row][col] === 2) {
                    this.ctx.fillStyle = RED_COLOR;
                }
                else if (this.boardMatrix[row][col] === 1) {
                    this.ctx.fillStyle = GREEN_COLOR;
                }
                else {
                    continue;
                }
                // Dessiner le pion
                const x = col * this.cellSize + 40;
                const y = row * this.cellSize + 40;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }
    handleGridClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        if (this.selectedRow === -1 && this.selectedCol === -1) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (this.boardMatrix[row][col] !== 0) {
                        if (this.validatePawn(col, row, clickX, clickY)) {
                            this.selectedRow = row;
                            this.selectedCol = col;
                            this.drawSuggestions(this.board.suggestMoves(this.selectedRow, this.selectedCol));
                            return;
                        }
                    }
                }
            }
        }
        else {
            let currentRow = -1;
            let currentCol = -1;
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (this.validatePawn(col, row, clickX, clickY)) {
                        currentRow = row;
                        currentCol = col;
                        break;
                    }
                }
            }
            if (currentRow !== -1 && currentCol !== -1) {
                console.log(`Case sélectionné : row=${this.selectedRow}, col=${this.selectedCol}`);
                console.log(`Case actuel : row=${currentRow}, col=${currentCol}`);
                //déplacement des pions
                this.board.movePawn(this.selectedRow, this.selectedCol, currentRow, currentCol);
                this.boardMatrix = this.board.getBoard();
                this.renderBoard();
            }
            //réinitialisation des index
            this.selectedRow = -1;
            this.selectedCol = -1;
        }
    }
    validatePawn(col, row, clickX, clickY) {
        const x = col * this.cellSize + 40;
        const y = row * this.cellSize + 40;
        // 15: diamètre de chaque pion
        if (clickX >= x - 15 &&
            clickX <= x + 15 &&
            clickY >= y - 15 &&
            clickY <= y + 15) {
            return true;
        }
        return false;
    }
    drawSuggestions(moves) {
        this.ctx.fillStyle = "rgb(255, 195, 0, 0.65)";
        moves.forEach((move) => {
            const x = move[1] * this.cellSize + 40;
            const y = move[0] * this.cellSize + 40;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 17, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }
}
