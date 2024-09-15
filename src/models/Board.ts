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
      if (
        this.board[row][col] === (this.gameHelper.getCurrentPlayer() as number)
      ) {
        this.board[newRow][newCol] = this.board[row][col];
        this.board[row][col] = 0;
        this.gameHelper.changeTurn();
      } else {
        alert(
          `Erreur de tour: tour du joueur ${this.gameHelper.getCurrentPlayer()}`
        );
      }
    } else {
      alert("Déplacement invalide");
    }
  }
}
