export class BoardView {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;

  constructor() {
    this.canvas = document.getElementById("board") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.adjustCanvasSize();
    this.cellSize = (this.canvas.width - 80) / 4;
    this.renderBoard();
  }

  private adjustCanvasSize() {
    const container = this.canvas.parentElement as HTMLElement;
    const width = container.clientWidth;
    const height = container.clientHeight / 0.91;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public renderBoard() {
    // Définition du plateau canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawCellDiagonals();
    this.drawIntersectionCircles();
  }

  public drawGrid() {
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

  private drawCellDiagonals() {
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        const x = col * this.cellSize + 40;
        const y = row * this.cellSize + 40;

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

  private drawIntersectionCircles() {
    this.ctx.fillStyle = "#f00";

    for (let row = 0; row <= 2; row++) {
      for (let col = 0; col <= 4; col++) {
        const x = col * this.cellSize + 40;
        const y = row * this.cellSize + 40;

        this.ctx.beginPath();
        this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }
  }
}
