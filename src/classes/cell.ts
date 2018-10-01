export default class Cell {
  public x: number;
  public y: number;
  public row: number;
  public column: number;
  public state: 'empty' | 'blocked';
  
  constructor(row: number, column: number, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.row = row;
    this.column = column;
    this.state = 'empty';
  }

  public changeState() {
    this.state = this.state === 'empty' ? 'blocked' : 'empty';
  }
}