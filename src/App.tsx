import * as React from 'react';
import './App.css';
import Cell from './classes/cell';

class App extends React.Component<any, any> {
  public state = {
    mousePosition: { x: 0, y: 0 },
  }

  private canvas: HTMLCanvasElement;
  private cContext: CanvasRenderingContext2D;
  private canvasWidth = 1200;
  private canvasHeight = 800;
  private tileSize = 25;
  private cells = Array<Array<Cell>>();

  public componentDidMount() {
    this.setCells();
    this.renderGrid();
  }

  public render() {
    const { mousePosition } = this.state;
    return (
      <div className="App">
        <canvas ref={ref => this.setContext(ref!)} height={`${this.canvasHeight}px`} width={`${this.canvasWidth}px`} onMouseMove={e => this.handleMouse(e.nativeEvent)} onMouseDownCapture={e => this.onClick(e.nativeEvent)} />
        <div className="cursor">{mousePosition.x} | {mousePosition.y}</div>
      </div>
    );
  }

  private setContext(ref: HTMLCanvasElement) {
    if (ref) {
      this.canvas = ref;
      this.cContext = this.canvas.getContext('2d')!;
    }
  }

  private renderGrid() {
    this.cContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    const gutter = 0.5;

    this.cContext.lineWidth = 1;

    for (var y = 0; y < this.canvasHeight; y += this.tileSize) {
      for (var x = 0; x < this.canvasWidth; x += this.tileSize) {
        this.cContext.moveTo(x + gutter, y + gutter);
        this.cContext.lineTo(this.tileSize + x + gutter, y + gutter);
        this.cContext.lineTo(this.tileSize + x + gutter, y + this.tileSize + gutter);
      }
    }

    this.cContext.strokeStyle = "rgba(0,0,0,0.3)";
    this.cContext.stroke();

    this.cells.forEach(row => {
      row.forEach(c => {
        this.paintCell(c);
      })
    })
    requestAnimationFrame(this.renderGrid.bind(this));
  }

  private setCells() {
    var column = 0;
    var row = 0;
    const cells: Cell[][] = Array<Array<Cell>>();
    for (var y = 0; y < this.canvasHeight; y += this.tileSize) {
      cells[row] = [];
      for (var x = 0; x < this.canvasWidth; x += this.tileSize) {
        cells[row][column] = new Cell(row, column, x, y);
        column++;
      }
      row++;
      column = 0;
    }
    this.cells = cells;
  }

  private onClick(event: MouseEvent) {
    const canvasPosition = this.canvas.getBoundingClientRect();
    const canvasX = Math.round(canvasPosition.left);
    const canvasY = Math.round(canvasPosition.top);

    const xInGrid = Math.trunc((event.pageX - canvasX) / this.tileSize);
    const yInGrid = Math.trunc((event.pageY - canvasY) / this.tileSize);

    this.cells[yInGrid][xInGrid].changeState();
  }

  private handleMouse(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.setState({ mousePosition: { x: event.clientX - rect.left, y: event.clientY - rect.top } });
  }

  private paintCell(cell: Cell) {
    if (cell.state === 'blocked') {
      const screen = this.cContext;
      screen.beginPath();
      screen.rect(cell.x, cell.y, this.tileSize, this.tileSize);
      screen.fillStyle = '#DD5734';
      screen.fill();
      screen.closePath();

      screen.beginPath();
      screen.moveTo(cell.x, cell.y);
      screen.rect(cell.x, cell.y, this.tileSize, this.tileSize);
      screen.strokeStyle = "black";
      screen.stroke();
      screen.closePath();
    }
  }
}

export default App;
