export class BoardHelper {
  constructor() {}

  public canMove(
    row: number,
    col: number,
    newCol: number,
    newRow: number
  ): boolean {
    let array = [Math.abs(newRow - row), Math.abs(newCol - col)];
    /* 
        [0,1] || [1, 0] pour les déplacements linéaires
        [1, 1] pour les déplacements en diagonals
    */
    return (
      (array.includes(0) && array.includes(1)) ||
      array.every((element) => element === 1)
    );
  }
}
