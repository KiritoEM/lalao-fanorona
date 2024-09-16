import { PlayerType } from "../utils/types.js";
export class Computer {
    constructor() {
        this.AIPlayer = PlayerType.player2;
        this.player = PlayerType.player1;
    }
    computerMove(board, depth, turn) {
        let bestScore = -Infinity;
        let bestMove = [-1, -1, -1, -1];
        let alpha = -Infinity;
        let beta = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board.getBoard()[i][j] === this.AIPlayer) {
                    console.log(i, j);
                    let movePossibles = board.suggestMoves(i, j);
                    console.log(`suggest moves: ${movePossibles}`);
                    for (let move of movePossibles) {
                        let [newRow, newCol] = move;
                        board.movePawn(i, j, newRow, newCol);
                        let score = this.minimax(depth - 1, alpha, beta, false, board, turn);
                        console.log("score: " + score);
                        board.movePawn(newRow, newCol, i, j); // Undo the move
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = [i, j, newRow, newCol];
                        }
                        alpha = Math.max(alpha, score);
                        if (beta <= alpha) {
                            break;
                        }
                    }
                }
            }
        }
        if (bestMove[0] !== -1 && bestMove[1] !== -1) {
            return bestMove;
        }
        return [];
    }
    minimax(depth, alpha, beta, isMaximizing, board, turn) {
        let winner = board.checkWinner(turn);
        let boardState = board.getBoard();
        if (winner === 1)
            return -1;
        if (winner === 2)
            return 1;
        if (depth === 0)
            return 0;
        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (boardState[i][j] === this.AIPlayer) {
                        let movePossibles = board.suggestMoves(i, j);
                        for (let move of movePossibles) {
                            let [newRow, newCol] = move;
                            console.log(`possibles moves: ${movePossibles}`);
                            console.log(newCol, newRow, i, j);
                            board.movePawn(i, j, newRow, newCol);
                            let score = this.minimax(depth - 1, alpha, beta, false, board, turn);
                            board.movePawn(newRow, newCol, i, j); // Undo the move
                            maxEval = Math.max(maxEval, score);
                            alpha = Math.max(alpha, score);
                            if (beta <= alpha) {
                                break;
                            }
                        }
                    }
                }
            }
            return maxEval;
        }
        else {
            let minEval = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (boardState[i][j] === this.AIPlayer) {
                        let movePossibles = board.suggestMoves(i, j);
                        for (let move of movePossibles) {
                            let [newRow, newCol] = move;
                            console.log(`possibles moves: ${movePossibles}`);
                            console.log(newCol, newRow, i, j);
                            board.movePawn(i, j, newRow, newCol);
                            let score = this.minimax(depth - 1, alpha, beta, true, board, turn);
                            board.movePawn(newRow, newCol, i, j); // Undo the move
                            minEval = Math.min(minEval, score);
                            beta = Math.min(beta, score);
                            if (beta <= alpha) {
                                break;
                            }
                        }
                    }
                }
            }
            return minEval;
        }
    }
}
