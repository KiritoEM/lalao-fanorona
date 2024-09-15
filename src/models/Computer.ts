import { PlayerType } from "../utils/types.js";
import { Board } from "./Board.js";

export class Computer {
  constructor() {}
  private AIPlayer: PlayerType = PlayerType.player2;
  private player: PlayerType = PlayerType.player1;

  public computerMove(board: Board, depth: number, turn: PlayerType): number[] {
    let boardState = board.getBoard();
    let bestScore = -Infinity;
    let bestMove = [-1, -1];
    let alpha: number = -Infinity;
    let beta: number = Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardState[i][j] === 0) {
          boardState[i][j] = this.AIPlayer;

          let score = this.minimax(depth, alpha, beta, false, board, turn);
          boardState[i][j] = 0;

          if (score > bestScore) {
            bestScore = score;
            bestMove = [i, j];
          }
        }
      }
    }

    if (bestMove[0] !== -1 && bestMove[1] !== -1) {
      console.log(bestMove);
      return bestMove;
    }

    return [];
  }

  public minimax(
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    board: Board,
    turn: PlayerType
  ) {
    let winner = board.checkWinner(turn);

    if (winner === 1) return 1;
    if (winner === 2) return -1;

    if (isMaximizing) {
      let maxScore = -Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.getBoard()[i][j] === 0) {
            board.getBoard()[i][j] = this.AIPlayer;
            let score = this.minimax(
              depth - 1,
              alpha,
              beta,
              false,
              board,
              turn
            );
            board.getBoard()[i][j] = 0;

            maxScore = Math.max(maxScore, score!);
            alpha = Math.max(alpha, score!);

            if (beta <= alpha) {
              break;
            }
          }
        }
      }

      return maxScore;
    } else {
      let minScore = Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.getBoard()[i][j] === 0) {
            board.getBoard()[i][j] = this.player;
            let score = this.minimax(depth + 1, alpha, beta, true, board, turn);
            board.getBoard()[i][j] = 0;

            minScore = Math.min(minScore, score!);
            beta = Math.max(beta, score!);

            if (beta <= alpha) {
              break;
            }
          }
        }
      }

      return minScore;
    }
  }
}
