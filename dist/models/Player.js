export var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["player1"] = 1] = "player1";
    PlayerType[PlayerType["player2"] = 2] = "player2";
})(PlayerType || (PlayerType = {}));
export class Player {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    getPlayerType() {
        return this.type;
    }
}
