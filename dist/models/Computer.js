import { PlayerType } from "../utils/types.js";
export class Computer {
    constructor() {
        this.AIPlayer = PlayerType.player1;
        this.player = PlayerType.player2;
        this.alpha = -Infinity;
        this.beta = Infinity;
    }
    computerMove(board) {
        let boarderState = board.getBoard();
    }
    //focntion minimax récursive
    minimax(depth, alpha, beta, isMaximizing, board, turn) {
        let boarderState = board.getBoard();
        let winner = board.checkWinner(turn);
        //condition d' arrêt de la fonction récursive
        if (winner === 1)
            return 1; // l' IA gagne
        if (winner === 2)
            return -1; // le joueur gagne
        if (isMaximizing) {
            let maxScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (boarderState[i][j] === 0) {
                        boarderState[i][j] = this.AIPlayer;
                        let score = this.minimax(depth - 1, alpha, beta, false, board, turn);
                        boarderState[i][j] = 0;
                        maxScore = Math.max(maxScore, score);
                        alpha = Math.max(alpha, score);
                        if (beta <= alpha) {
                            break;
                        }
                    }
                }
            }
            return maxScore;
        }
        else {
            let minScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (boarderState[i][j] === 0) {
                        boarderState[i][j] = this.player;
                        let score = this.minimax(depth + 1, alpha, beta, true, board, turn);
                        boarderState[i][j] = 0;
                        minScore = Math.min(minScore, score);
                        beta = Math.max(beta, score);
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
