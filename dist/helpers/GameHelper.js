import { PlayerType } from "../utils/types.js";
export class GameHelper {
    constructor() {
        this.currentPlayer = PlayerType.player1; //par défaut le joueur 1 commence
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
