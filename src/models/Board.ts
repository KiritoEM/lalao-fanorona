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

    //mouvements possibles
    const linearMoves = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    const diagonalMoves = [
      [row - 1, col - 1],
      [row - 1, col + 1],
      [row + 1, col - 1],
      [row + 1, col + 1],
    ];

    const isValidMove = (move: number[]): boolean => {
      //pur s' assurer que les actions sont dans la matrice
      const [newRow, newCol] = move;
      return (
        newRow >= 0 &&
        newRow < this.board.length &&
        newCol >= 0 &&
        newCol < this.board[0].length &&
        this.board[newRow][newCol] === 0 &&
        this.board[row][col] === (this.gameHelper.getCurrentPlayer() as number)
      );
    };

    //mouvement valides
    linearMoves.forEach((move) => {
      if (
        this.boardHelper.canMove(row, col, move[1], move[0]) &&
        isValidMove(move)
      ) {
        moves.push(move);
        console.log("linear suggest" + move);
      }
    });

    diagonalMoves.forEach((move) => {
      if (
        this.boardHelper.canMove(row, col, move[1], move[0]) &&
        isValidMove(move)
      ) {
        moves.push(move);
        console.log("diagonal suggest" + move);
      }
    });

    return moves;
  }
}
