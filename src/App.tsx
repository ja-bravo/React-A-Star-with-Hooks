import * as React from 'react';
import './App.css';

class App extends React.Component<any, any> {
  public state  = {
    mousePosition: {x: 0, y: 0},
  }
  private canvas: HTMLCanvasElement;
  // private cContext: CanvasRenderingContext2D;
  
  public componentDidMount() {
    this.canvas.addEventListener('mousemove',(event: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.setState({mousePosition: {x : event.clientX - rect.left, y: event.clientY - rect.top}})
    }, false);
  }

  public render() {
    const { mousePosition } = this.state;
    return (
      <div className="App">
        <canvas ref={ref => this.setContext(ref!)}/>
        <div className="cursor">{mousePosition.x} | {mousePosition.y}</div>
      </div>
    );
  }

  private setContext(ref: HTMLCanvasElement) {
    this.canvas = ref;
    // this.cContext = this.canvas.getContext('2d')!;
  }
}

export default App;
