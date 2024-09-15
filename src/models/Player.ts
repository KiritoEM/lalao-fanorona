import { PlayerType } from "../utils/types.js";

export class Player {
  private name: string;
  private type: PlayerType;

  constructor(name: string, type: PlayerType) {
    this.name = name;
    this.type = type;
  }

  public getPlayerName(): string {
    return this.name;
  }

  public getPlayerType(): PlayerType {
    return this.type;
  }
}
