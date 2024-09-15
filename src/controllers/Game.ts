import { GREEN_COLOR, RED_COLOR } from "../helpers/constants.js";
import { Board } from "../models/Board.js";

export class FanoronaGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private boardMatrix: number[][];
  private cellSize: number;
  private selectedRow: number = -1;
  private selectedCol: number = -1;

  // Instanciation de la classe Board
  board = new Board();

  constructor() {
    this.canvas = document.getElementById("board") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.adjustCanvasSize();
    this.cellSize = (this.canvas.width - 80) / 2; // grille de 2x2
    this.boardMatrix = this.board.getBoard();
  }

  public start(): void {
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

  public drawPawns(excludeRow: number = -1, excludeCol: number = -1) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        //exclusion du pion en mouvement pour qu' il ne soit pas redessiné
        if (row === excludeRow && col === excludeCol) continue;

        if (this.boardMatrix[row][col] === 2) {
          this.ctx.fillStyle = RED_COLOR;
        } else if (this.boardMatrix[row][col] === 1) {
          this.ctx.fillStyle = GREEN_COLOR;
        } else {
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

  private handleGridClick(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();

    // Fixer le click à l'intérieur du canvas
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (this.selectedRow === -1 && this.selectedCol === -1) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.boardMatrix[row][col] !== 0) {
            if (this.validatePawn(col, row, clickX, clickY)) {
              this.selectedRow = row;
              this.selectedCol = col;
              break;
            }
          }
        }
      }
    } else {
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

      //si la case séléctionnée n' est pas vide
      if (currentRow !== -1 && currentCol !== -1) {
        console.log(
          `Case sélectionnée : row=${this.selectedRow}, col=${this.selectedCol}`
        );
        console.log(`Case actuelle : row=${currentRow}, col=${currentCol}`);

        // Coordonnées de départ et d'arrivée
        const startX = this.selectedCol * this.cellSize + 40;
        const startY = this.selectedRow * this.cellSize + 40;
        const endX = currentCol * this.cellSize + 40;
        const endY = currentRow * this.cellSize + 40;
        const color =
          this.boardMatrix[this.selectedRow][this.selectedCol] === 1
            ? GREEN_COLOR
            : RED_COLOR;

        // Animation
        this.animatePawnMovement(startX, startY, endX, endY, color, () => {
          // Déplacement des pions après l'animation
          this.board.movePawn(
            this.selectedRow,
            this.selectedCol,
            currentRow,
            currentCol
          );

          // Réinitialisation des index
          this.selectedRow = -1;
          this.selectedCol = -1;
        });
      }
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

  private animatePawnMovement(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: string,
    callback: () => void
  ) {
    const duration = 500;
    let steps = 50;
    const deltaX = (endX - startX) / steps;
    const deltaY = (endY - startY) / steps;

    let currentX = startX;
    let currentY = startY;

    const interval = setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
      this.drawDiagonals();

      // Ne pas dessiner le pion d'origine pendant l'animation
      this.drawPawns(this.selectedRow, this.selectedCol);

      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(currentX, currentY, 15, 0, 2 * Math.PI);
      this.ctx.fill();

      currentX += deltaX;
      currentY += deltaY;

      if (--steps < 0) {
        clearInterval(interval);
        callback();
      }
    }, duration / steps);
  }
}
