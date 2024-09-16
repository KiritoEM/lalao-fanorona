import { GREEN_COLOR, RED_COLOR } from "../helpers/constants.js";
import { GameHelper } from "../helpers/GameHelper.js";
import { Board } from "../models/Board.js";
import { Computer } from "../models/Computer.js";
import { PlayerType } from "../utils/types.js";

export class FanoronaGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private boardMatrix: number[][];
  private cellSize: number;
  private selectedRow: number = -1;
  private selectedCol: number = -1;

  board = new Board();
  gameHelper = new GameHelper();
  computer = new Computer();

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

  private drawDiagonals() {
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
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (this.selectedRow === -1 && this.selectedCol === -1) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.boardMatrix[row][col] !== 0) {
            if (this.validatePawn(col, row, clickX, clickY)) {
              this.selectedRow = row;
              this.selectedCol = col;
              this.drawSuggestions(
                this.board.suggestMoves(this.selectedRow, this.selectedCol)
              );
              this.drawSelectedPawnBorder();
              return;
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

      if (currentRow !== -1 && currentCol !== -1) {
        if (this.gameHelper.getCurrentPlayer() === PlayerType.player1) {
          this.board.movePawn(
            this.selectedRow,
            this.selectedCol,
            currentRow,
            currentCol
          );
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

  private handleAITurn() {
    if (this.gameHelper.getCurrentPlayer() === PlayerType.player2) {
      const move = this.computer.computerMove(
        this.board,
        7,
        this.gameHelper.getCurrentPlayer()
      );

      if (move) {
        const [row, col, predictRow, predictedCol] = move;
        this.board.movePawn(row, col, predictRow, predictedCol);
        this.board.checkWinner(this.gameHelper.getCurrentPlayer());
        this.gameHelper.changeTurn();
        this.boardMatrix = this.board.getBoard();
        this.renderBoard();
      } else {
        console.log("No valid move found for AI.");
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

  public drawSuggestions(moves: number[][]) {
    this.ctx.fillStyle = "rgb(255, 195, 0, 0.65)";
    moves.forEach((move) => {
      const x = move[1] * this.cellSize + 40;
      const y = move[0] * this.cellSize + 40;

      this.ctx.beginPath();
      this.ctx.arc(x, y, 17, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }

  private drawSelectedPawnBorder() {
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
