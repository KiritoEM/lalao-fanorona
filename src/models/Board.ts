import { BoardHelper } from "../helpers/BoardHelper.js";
import { GameHelper } from "../helpers/GameHelper.js";

export class Board {
  // Valeur initiale du plateau de jeu
  private board: number[][] = [
    [1, 1, 1],
    [0, 0, 0],
    [2, 2, 2],
  ];

  boardHelper = new BoardHelper();
  gameHelper = new GameHelper();

  constructor() {}

  public getBoard(): number[][] {
    return this.board;
  }

  public resetBoard() {
    this.board = [
      [1, 1, 1],
      [0, 0, 0],
      [2, 2, 2],
    ];
  }

  public movePawn(
    row: number,
    col: number,
    newRow: number,
    newCol: number
  ): void {
    if (
      this.boardHelper.canMove(row, col, newCol, newRow) &&
      this.board[newRow][newCol] === 0
    ) {
      this.board[newRow][newCol] = this.board[row][col];
      this.board[row][col] = 0;
      this.gameHelper.changeTurn();
      console.log("Tour: " + this.gameHelper.getCurrentPlayer());
    } else {
      alert("Impossible d'effectuer le déplacement");
    }
  }
}
