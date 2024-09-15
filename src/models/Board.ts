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

  public suggestMoves(row: number, col: number): number[][] {
    let moves: number[][] = [];

    const linearMoves = [
      [row - 1, col], //gauche
      [row + 1, col], //droite
      [row, col - 1], //ascendant
      [row, col + 1], //descendant
    ];

    const diagonalMoves = [
      [row - 1, col - 1],
      [row - 1, col + 1],
      [row + 1, col - 1],
      [row + 1, col + 1],
    ];

    //mouvement valides
    linearMoves.forEach((move) => {
      if (this.boardHelper.canMove(row, col, move[1], move[0])) {
        moves.push(move);
      }
    });

    diagonalMoves.forEach((move) => {
      if (this.boardHelper.canMove(row, col, move[1], move[0])) {
        moves.push(move);
      }
    });

    return moves;
  }
}
