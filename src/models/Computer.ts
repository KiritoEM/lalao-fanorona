import { PlayerType } from "../utils/types.js";
import { Board } from "./Board.js";

export class Computer {
  private AIPlayer: PlayerType = PlayerType.player2;
  private player: PlayerType = PlayerType.player1;

  public getAIPawn(board: Board): any {
    let AIPawns = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board.getBoard()[i][j] === this.AIPlayer) {
          AIPawns.push([i, j]);
        }
      }
    }

    while (AIPawns.length > 0) {
      let pawn: any = AIPawns[Math.floor(Math.random() * AIPawns.length)];
      let movePossibles = board.suggestMoves(pawn[0], pawn[1]);

      if (movePossibles.length > 0) {
        return { pawn, movePossibles };
      }

      AIPawns = AIPawns.filter((p) => p !== pawn);

      if (AIPawns.length === 0) {
        break;
      }
    }
    return {};
  }

  public computerMove(board: Board, depth: number, turn: PlayerType): number[] {
    let bestScore = -Infinity;
    let bestMove = [-1, -1, -1, -1];
    let alpha: number = -Infinity;
    let beta: number = Infinity;

    let { pawn, movePossibles } = this.getAIPawn(board);

    for (let move of movePossibles) {
      let [newRow, newCol] = move;
      board.movePawn(pawn[0], pawn[1], newRow, newCol);
      let score = this.minimax(
        depth,
        alpha,
        beta,
        false,
        board,
        turn,
        pawn,
        movePossibles
      );
      console.log("score: " + score);
      console.log("bestScore: " + bestScore);

      board.movePawn(newRow, newCol, pawn[0], pawn[1]); // Annuler le mouvement

      if (score > bestScore) {
        bestScore = score;
        bestMove = [pawn[0], pawn[1], newRow, newCol];
      }
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        break;
      }
    }

    if (bestMove[0] !== -1 && bestMove[1] !== -1) {
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
    turn: PlayerType,
    pawn: any,
    movePossibles: any
  ): any {
    let winner = board.checkWinner(turn);
    let boardState = board.getBoard();

    if (winner === this.player) return -1; // joueur
    if (winner === this.AIPlayer) return 1; // IA
    if (depth === 0) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;

      movePossibles.forEach((move: any) => {
        if (boardState[move[0]][move[1]] === 0) {
          board.setBoard(move[0], move[1], this.AIPlayer);

          let score: number = this.minimax(
            depth - 1,
            alpha,
            beta,
            false,
            board,
            turn,
            pawn,
            movePossibles
          );

          board.setBoard(move[0], move[1], 0); //Annuler le mouvement

          maxEval = Math.max(maxEval, score);
          alpha = Math.max(alpha, score);

          if (beta <= alpha) {
            return maxEval;
          }
        }
      });

      return maxEval;
    } else {
      let minEval = Infinity;

      movePossibles.forEach((move: any) => {
        if (boardState[move[0]][move[1]] === 0) {
          board.setBoard(move[0], move[1], this.AIPlayer);

          let score: number = this.minimax(
            depth - 1,
            alpha,
            beta,
            true,
            board,
            turn,
            pawn,
            movePossibles
          );

          board.setBoard(move[0], move[1], 0); //Annuler le mouvement

          minEval = Math.min(minEval, score);
          beta = Math.min(beta, score);

          if (beta <= alpha) {
            return minEval;
          }
        }
      });

      return minEval;
    }
  }
}
