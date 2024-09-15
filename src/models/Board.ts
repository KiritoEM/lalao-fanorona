import { BoardHelper } from "../helpers/BoardHelper.js";

export class Board {
  //valeur initiale du plateau de jeu
  private board: number[][] = [
    [1, 1, 1],
    [1, 0, 2],
    [2, 2, 2],
  ];

  boardHelper = new BoardHelper();

  constructor() {}

  public getBoard(): number[][] {
    return this.board;
  }

  public resetBoard() {
    this.board = [
      [1, 1, 1],
      [1, 0, 2],
      [2, 2, 2],
    ];
  }

  public movePawn(
    row: number,
    col: number,
    newCol: number,
    newRow: number
  ): void {
    this.board[newRow][newCol] = this.board[row][col];
    board[row][col] = 0;
    this.boardHelper.movePawn(row, col, newCol, newRow, this.board);
  }
}
