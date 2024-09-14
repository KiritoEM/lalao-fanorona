import { BoardView } from "./views/boardView.js";
document.addEventListener("DOMContentLoaded", () => {
    const boardView = new BoardView();
    boardView.renderBoard();
});
