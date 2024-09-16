import { GREEN_COLOR, RED_COLOR } from "../helpers/constants.js";
import { GameHelper } from "../helpers/GameHelper.js";
import { Board } from "../models/Board.js";
import { Computer } from "../models/Computer.js";
import { PlayerType } from "../utils/types.js";
export class FanoronaGame {
    constructor() {
        this.selectedRow = -1;
        this.selectedCol = -1;
        this.board = new Board();
        this.gameHelper = new GameHelper();
        this.computer = new Computer();
        this.canvas = document.getElementById("board");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.adjustCanvasSize();
        this.cellSize = (this.canvas.width - 80) / 2; // grille de 2x2
        this.boardMatrix = this.board.getBoard();
    }
    start() {
        this.renderBoard();
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
        for (let col = 0; col < 3; col++) {
            this.ctx.beginPath();
            this.ctx.moveTo(col * this.cellSize + 40, 40);
            this.ctx.lineTo(col * this.cellSize + 40, this.canvas.height - 40);
            this.ctx.stroke();
        }
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
        this.ctx.beginPath();
        this.ctx.moveTo(40, 40);
        this.ctx.lineTo(this.canvas.width - 40, this.canvas.height - 40);
        this.ctx.stroke();
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
                            this.drawSelectedPawnBorder();
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
                console.log(`Case sélectionnée : row=${this.selectedRow}, col=${this.selectedCol}`);
                console.log(`Case actuelle : row=${currentRow}, col=${currentCol}`);
                console.log(`tour actuel: ${this.gameHelper.getCurrentPlayer()}`);
                if (this.gameHelper.getCurrentPlayer() === PlayerType.player1) {
                    this.board.movePawn(this.selectedRow, this.selectedCol, currentRow, currentCol);
                    this.board.checkWinner(this.gameHelper.getCurrentPlayer());
                    this.gameHelper.changeTurn();
                    this.boardMatrix = this.board.getBoard();
                    this.renderBoard();
                    // AI's turn
                    this.handleAITurn();
                }
            }
            this.selectedRow = -1;
            this.selectedCol = -1;
        }
    }
    handleAITurn() {
        if (this.gameHelper.getCurrentPlayer() === PlayerType.player2) {
            console.log("AI tour");
            const move = this.computer.computerMove(this.board, 6, this.gameHelper.getCurrentPlayer());
            if (move) {
                const [row, col, predictRow, predictedCol] = move;
                console.log("depuis game.ts: " + row, col, predictRow, predictedCol);
                console.log(`selectedPawn: [${this.selectedRow}][${this.selectedCol}]; predictedCoord: [${predictRow}][${predictedCol}]`);
                this.board.movePawn(row, col, predictRow, predictedCol);
                this.board.checkWinner(this.gameHelper.getCurrentPlayer());
                this.gameHelper.changeTurn();
                this.boardMatrix = this.board.getBoard();
                this.renderBoard();
            }
            else {
                console.log("No valid move found for AI.");
            }
        }
    }
    validatePawn(col, row, clickX, clickY) {
        const x = col * this.cellSize + 40;
        const y = row * this.cellSize + 40;
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
    drawSelectedPawnBorder() {
        if (this.selectedRow !== -1 && this.selectedCol !== -1) {
            const x = this.selectedCol * this.cellSize + 40;
            const y = this.selectedRow * this.cellSize + 40;
            this.ctx.strokeStyle = "yellow";
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }
}
