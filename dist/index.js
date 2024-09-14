import { BoardView } from "./views/boardView.js";
const boardMatrix = [
    [2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1],
];
document.addEventListener("DOMContentLoaded", () => {
    const boardView = new BoardView(boardMatrix);
    boardView.renderBoard();
});
