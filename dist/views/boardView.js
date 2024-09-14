export class BoardView {
    constructor() {
        this.canvas = document.getElementById("board");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.adjustCanvasSize();
        this.cellSize = (this.canvas.width - 80) / 4;
        this.renderBoard();
    }
    adjustCanvasSize() {
        const container = this.canvas.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight / 0.91;
        this.canvas.width = width;
        this.canvas.height = height;
    }
    renderBoard() {
        // Définition du plateau canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawCellDiagonals();
        this.drawIntersectionCircles();
    }
    drawGrid() {
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        // Dessiner les lignes verticales
        for (let col = 0; col <= 4; col++) {
            this.ctx.beginPath();
            this.ctx.moveTo(col * this.cellSize + 40, 40);
            this.ctx.lineTo(col * this.cellSize + 40, this.canvas.height - 40);
            this.ctx.stroke();
        }
        // Dessiner les lignes horizontales
        for (let row = 0; row <= 2; row++) {
            this.ctx.beginPath();
            this.ctx.moveTo(40, row * this.cellSize + 40);
            this.ctx.lineTo(this.canvas.width - 40, row * this.cellSize + 40);
            this.ctx.stroke();
        }
    }
    drawCellDiagonals() {
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 4; col++) {
                const x = col * this.cellSize + 40;
                const y = row * this.cellSize + 40;
                // Diagonale gauche
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + this.cellSize, y + this.cellSize);
                this.ctx.stroke();
                // Diagonale droite
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + this.cellSize);
                this.ctx.lineTo(x + this.cellSize, y);
                this.ctx.stroke();
                // Ligne verticale au milieu de la cellule
                this.ctx.beginPath();
                this.ctx.moveTo(x + this.cellSize / 2, y);
                this.ctx.lineTo(x + this.cellSize / 2, y + this.cellSize);
                this.ctx.stroke();
                // Ligne horizontale au milieu de la cellule
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + this.cellSize / 2);
                this.ctx.lineTo(x + this.cellSize, y + this.cellSize / 2);
                this.ctx.stroke();
            }
        }
    }
    drawIntersectionCircles() {
        this.ctx.fillStyle = "#f00";
        for (let row = 0; row <= 2; row++) {
            for (let col = 0; col <= 4; col++) {
                const x = col * this.cellSize + 40;
                const y = row * this.cellSize + 40;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
                this.ctx.fill();
                //moitié de chaque case
                const midX = x + this.cellSize / 2;
                const midY = y + this.cellSize / 2;
                this.ctx.beginPath();
                this.ctx.arc(midX, y, 15, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.arc(x, midY, 15, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.arc(midX, midY, 15, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }
}
