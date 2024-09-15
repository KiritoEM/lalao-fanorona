import { PlayerType } from "../utils/types.js";
export class GameHelper {
    constructor() {
        this.currentPlayer = PlayerType.player1;
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    changeTurn() {
        this.currentPlayer =
            this.currentPlayer === PlayerType.player1
                ? PlayerType.player2
                : PlayerType.player1;
    }
}
