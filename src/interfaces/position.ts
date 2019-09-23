import STATES from '../enums/states';

export default interface IPosition {
  x: number;
  y: number;
  isStart: boolean;
  isEnd: boolean;
  state: STATES;
  gCost: number;
  hCost: number;
  fCost: number;
  parent?: IPosition;
  isInPath?: boolean;
}
