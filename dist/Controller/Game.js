import { GREEN_COLOR, RED_COLOR } from "../helpers/constants.js";
export class Game {
    constructor(boardMatrix) {
        this.canvas = document.getElementById("board");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.adjustCanvasSize();
        this.cellSize = (this.canvas.width - 80) / 2; // grille de 2x2
        this.boardMatrix = boardMatrix;
        this.renderBoard();
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
                const x = col * this.cellSize + 40;
                const y = row * this.cellSize + 40;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }
}
