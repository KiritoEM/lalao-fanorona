import { GREEN_COLOR, RED_COLOR } from "../helpers/constants.js";
import { Board } from "../models/Board.js";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;
  private boardMatrix: number[][];
  private selectedRow: number = -1;
  private selectedCol: number = -1;

  board = new Board();

  constructor(boardMatrix: number[][]) {
    this.canvas = document.getElementById("board") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.adjustCanvasSize();
    this.cellSize = (this.canvas.width - 80) / 2; // grille de 2x2
    this.boardMatrix = boardMatrix;
    this.renderBoard();

    // Événement click
    this.canvas.addEventListener("click", (e) => this.handleGridClick(e));
  }

  public adjustCanvasSize() {
    const container = this.canvas.parentElement as HTMLElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public renderBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawDiagonals();
    this.drawPawns();
    console.log(this.board.getBoard());
  }

  public drawGrid() {
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

  private drawDiagonals() {
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

  public drawPawns() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.boardMatrix[row][col] === 2) {
          this.ctx.fillStyle = RED_COLOR;
        } else if (this.boardMatrix[row][col] === 1) {
          this.ctx.fillStyle = GREEN_COLOR;
        } else {
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

  private handleGridClick(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();

    // Fixer le click à l'intérieur du canvas
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (this.selectedRow === -1 && this.selectedCol === -1) {
      // Premier clic : sélectionner un pion
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.boardMatrix[row][col] !== 0) {
            // Position de chaque pion
            if (this.validatePawn(col, row, clickX, clickY)) {
              this.selectedRow = row;
              this.selectedCol = col;
              break;
            }
          }
        }
      }
    } else {
      // Deuxième clic : déplacer le pion
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
        console.log(
          `Case sélectionné : row=${this.selectedRow}, col=${this.selectedCol}`
        );
        console.log(`Case actuel : row=${currentRow}, col=${currentCol}`);
        this.board.movePawn(
          this.selectedRow,
          this.selectedCol,
          currentRow,
          currentCol
        );
        this.boardMatrix = this.board.getBoard();
        this.renderBoard();
      }

      //réinitialisation
      this.selectedRow = -1;
      this.selectedCol = -1;
    }
  }

  public validatePawn(
    col: number,
    row: number,
    clickX: number,
    clickY: number
  ): boolean {
    const x = col * this.cellSize + 40;
    const y = row * this.cellSize + 40;

    // 15: diamètre de chaque pion
    if (
      clickX >= x - 15 &&
      clickX <= x + 15 &&
      clickY >= y - 15 &&
      clickY <= y + 15
    ) {
      return true;
    }
    return false;
  }
}
