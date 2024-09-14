export class BoardView {
    constructor() {
        this.canvas = document.getElementById("board");
        this.ctx = this.canvas.getContext("2d");
        this.cellSize = this.canvas.width / 4;
    }
    renderBoard() {
        // Définition du plateau canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawCellDiagonals();
    }
    drawGrid() {
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        for (let i = 1; i < 4; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.canvas.height);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.cellSize);
            this.ctx.stroke();
        }
    }
    drawCellDiagonals() {
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const x = col * this.cellSize;
                const y = row * this.cellSize;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + this.cellSize, y + this.cellSize);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + this.cellSize);
                this.ctx.lineTo(x + this.cellSize, y);
                this.ctx.stroke();
            }
        }
    }
}
