import IPosition from '../interfaces/position';

type Stage = Array<IPosition[]>;
const HORIZONTAL_COST = 10;
// const DIAGONAL_COST = 15;

const getNeighbours = (p: IPosition, stage: Stage, allowDiagonal: boolean) => {
  const neighbours: IPosition[] = [];
  const rightLimit = stage[0].length - 1;
  const leftLimit = stage.length - 1;

  // Top left
  if (allowDiagonal && p.y - 1 >= 0 && p.x - 1 >= 0) {
    neighbours.push(stage[p.y - 1][p.x - 1]);
  }

  // Top
  if (p.y - 1 >= 0) {
    neighbours.push(stage[p.y - 1][p.x]);
  }

  // Top right
  if (allowDiagonal && p.y - 1 >= 0 && p.x + 1 <= rightLimit) {
    neighbours.push(stage[p.y - 1][p.x + 1]);
  }

  // Left
  if (p.x - 1 >= 0) {
    neighbours.push(stage[p.y][p.x - 1]);
  }

  // Right
  if (p.x + 1 <= rightLimit) {
    neighbours.push(stage[p.y][p.x + 1]);
  }

  // Bottom left
  if (allowDiagonal && p.y + 1 <= leftLimit && p.x - 1 >= 0) {
    neighbours.push(stage[p.y + 1][p.x - 1]);
  }

  // Bottom
  if (p.y + 1 <= leftLimit) {
    neighbours.push(stage[p.y + 1][p.x]);
  }

  // Bottom right
  if (allowDiagonal && p.y + 1 <= leftLimit && p.x + 1 <= rightLimit) {
    neighbours.push(stage[p.y + 1][p.x]);
  }
  return neighbours;
};

const getHCost = (p: IPosition, goal: IPosition) => {
  return Math.abs(p.x - goal.x) + Math.abs(p.y - goal.y);
};

const getGCost = (start: IPosition, end: IPosition) => {
  return HORIZONTAL_COST;
};

const getGoal = (stage: Stage) => {
  let goal = {} as IPosition;
  stage.forEach(r =>
    r.forEach(p => {
      if (p.isEnd) goal = p;
    }),
  );
  return goal;
};

const getStart = (stage: Stage) => {
  let goal = {} as IPosition;
  stage.forEach(r =>
    r.forEach(p => {
      if (p.isStart) goal = p;
    }),
  );
  return goal;
};

const getLowestF = (openList: IPosition[]) => {
  let min = Infinity;
  let lowestF = {} as IPosition;
  openList.forEach(p => {
    const f = p.fCost;
    if (f < min) {
      lowestF = p;
      min = f;
    }
  });

  return lowestF;
};

export { getNeighbours, getHCost, getGoal, getStart, getGCost, getLowestF };
