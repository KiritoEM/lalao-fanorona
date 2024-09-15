export enum PlayerType {
  player1 = 1,
  player2 = 2,
}

export class Player {
  private name: string;
  private type: PlayerType;

  constructor(name: string, type: PlayerType) {
    this.name = name;
    this.type = type;
  }

  public getPlayerType(): PlayerType {
    return this.type;
  }
}
