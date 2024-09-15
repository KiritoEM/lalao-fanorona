import { Game } from "./Controller/Game.js";
const boardMatrix = [
    [1, 1, 1],
    [1, 0, 2],
    [2, 2, 2],
];
document.addEventListener("DOMContentLoaded", () => {
    const boardView = new Game(boardMatrix);
    boardView.renderBoard();
});
