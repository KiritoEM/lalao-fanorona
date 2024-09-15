import { FanoronaGame } from "./controllers/Game.js";
document.addEventListener("DOMContentLoaded", () => {
    const fanorona = new FanoronaGame();
    fanorona.start();
});
