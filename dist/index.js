import { Game } from "./controllers/Game.js";
import { Board } from "./models/Board.js";
//instanciation de la classe Board
const board = new Board();
document.addEventListener("DOMContentLoaded", () => {
    const boardView = new Game(board.getBoard());
    boardView.renderBoard();
});
