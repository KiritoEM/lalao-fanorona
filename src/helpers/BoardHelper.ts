export class BoardHelper {
  constructor() {}

  public canMove(
    row: number,
    col: number,
    newCol: number,
    newRow: number
  ): boolean {
    if (newCol !== -1 && newRow !== -1) {
      let array = [Math.abs(newRow - row), Math.abs(newCol - col)];
      let arr =
        (array.includes(0) && array.includes(1)) ||
        ((row + col) % 2 === 0
          ? array.every((element) => element === 1)
          : false);
      /* 
        [0,1] || [1, 0] pour les déplacements linéaires
        [1, 1] pour les déplacements en diagonals avec la condition (x + y) mod 2  === 0
    */
      console.log(
        "[ " +
          row +
          "-" +
          newRow +
          " , " +
          col +
          "-" +
          newCol +
          " ]" +
          "tableau array: " +
          array +
          " et le state: " +
          arr
      );
      return (
        (array.includes(0) && array.includes(1)) ||
        ((row + col) % 2 === 0
          ? array.every((element) => element === 1)
          : false)
      );
    } else {
      return false;
    }
  }
}
