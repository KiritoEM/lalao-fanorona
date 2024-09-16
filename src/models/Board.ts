import { BoardHelper } from "../helpers/BoardHelper.js";
import { GameHelper } from "../helpers/GameHelper.js";
import { PlayerType } from "../utils/types.js";
import { Computer } from "./Computer.js";

export class Board {
  private board: number[][] = [
    [1, 1, 1],
    [0, 0, 0],
    [2, 2, 2],
  ];
  private movedPawns: boolean[][] = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  boardHelper = new BoardHelper();
  gameHelper = new GameHelper();
  computer = new Computer();

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
    this.movedPawns = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
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
        this.movedPawns[row][col] = true;
        this.gameHelper.changeTurn();
      }
    }
  }

  public checkWinner(turn: PlayerType): number | null {
    if (this.haveAllPawnsMoved(turn)) {
      //ligne
      for (let row = 0; row < 3; row++) {
        if (
          this.board[row][0] === turn &&
          this.board[row][1] === turn &&
          this.board[row][2] === turn
        ) {
          setTimeout(() => {
            alert(`Le joueur ${turn} a gagné`);
          }, 600);
          this.resetBoard();
          return turn as number;
        }
      }

      //colonne
      for (let col = 0; col < 3; col++) {
        if (
          this.board[0][col] === turn &&
          this.board[1][col] === turn &&
          this.board[2][col] === turn
        ) {
          setTimeout(() => {
            alert(`Le joueur ${turn} a gagné`);
          }, 600);
          this.resetBoard();
          return turn as number;
        }
      }

      //diagonal 1
      if (
        this.board[0][0] === turn &&
        this.board[1][1] === turn &&
        this.board[2][2] === turn
      ) {
        setTimeout(() => {
          alert(`Le joueur ${turn} a gagné`);
        }, 600);
        this.resetBoard();
        return turn as number;
      }

      //diagonal 2
      if (
        this.board[2][0] === turn &&
        this.board[1][1] === turn &&
        this.board[0][2] === turn
      ) {
        setTimeout(() => {
          alert(`Le joueur ${turn} a gagné`);
        }, 600);
        this.resetBoard();
        return turn as number;
      }
    }

    return null;
  }

  private haveAllPawnsMoved(turn: PlayerType): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === turn && !this.movedPawns[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  public suggestMoves(row: number, col: number): number[][] {
    let moves: number[][] = [];

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

    linearMoves.forEach((move) => {
      if (
        this.boardHelper.canMove(row, col, move[1], move[0]) &&
        isValidMove(move)
      ) {
        moves.push(move);
      }
    });

    diagonalMoves.forEach((move) => {
      if (
        this.boardHelper.canMove(row, col, move[1], move[0]) &&
        isValidMove(move)
      ) {
        moves.push(move);
      }
    });

    return moves;
  }
}
