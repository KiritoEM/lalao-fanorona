import { PlayerType } from "../utils/types.js";

export class GameHelper {
  private currentPlayer: PlayerType;

  constructor() {
    this.currentPlayer = PlayerType.player1; //par défaut le joueur 1 commence
  }

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
