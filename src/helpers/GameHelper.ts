import { PlayerType } from "../utils/types.js";

export class GameHelper {
  private currentPlayer: PlayerType = PlayerType.player1;

  public getCurrentPlayer(): PlayerType {
    return this.currentPlayer;
  }

  public changeTurn(): void {
    this.currentPlayer =
      this.currentPlayer === PlayerType.player1
        ? PlayerType.player2
        : PlayerType.player1;
  }
}
