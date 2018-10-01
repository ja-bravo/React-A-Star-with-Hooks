import * as React from 'react';
import './App.css';

class App extends React.Component<any, any> {
  public state = {
    mousePosition: { x: 0, y: 0 },
  }
  private canvas: HTMLCanvasElement;
  private cContext: CanvasRenderingContext2D;
  private canvasWidth = 1200;
  private canvasHeight = 800;

  public componentDidMount() {
    this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.setState({ mousePosition: { x: event.clientX - rect.left, y: event.clientY - rect.top } })
    }, false);

    this.renderGrid();
  }

  public render() {
    const { mousePosition } = this.state;
    return (
      <div className="App">
        <canvas ref={ref => this.setContext(ref!)} height={`${this.canvasHeight}px`} width={`${this.canvasWidth}px`}/>
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
    const p = 0;
    const tileSize = 10;
    this.cContext.lineWidth = 1;

    for (var x = 0; x <= this.canvasWidth; x += tileSize) {
      this.cContext.moveTo(0.5 + x + p, p);
      this.cContext.lineTo(0.5 + x + p, this.canvasHeight + p);
    }


    for (var x = 0; x <= this.canvasHeight; x += tileSize) {
      this.cContext.moveTo(p, 0.5 + x + p);
      this.cContext.lineTo(this.canvasWidth + p, 0.5 + x + p);
    }

    this.cContext.strokeStyle = "rgba(0,0,0,0.3)";
    this.cContext.stroke();

  }
}

export default App;
