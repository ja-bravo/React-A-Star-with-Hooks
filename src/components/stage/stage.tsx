import React, { useState, useEffect } from 'react';
import useDimensions from '../../hooks/useDimensions';
import Position from '../position';
import { Wrapper } from './styles';
import IPosition from '../../interfaces/position';
import STATES from '../../enums/states';
import { getNeighbours, getGoal, getStart, getLowestF, getHCost, getGCost } from '../../utils/algoUtils';
import { SQUARE_SIZE } from '../../utils/constants';
import OptionsArea from '../options';

const generateStage = (rows: number, columns: number) => {
  const stage: Array<Array<IPosition>> = [];
  for (let i = 0; i < rows; i++) {
    stage[i] = [];
    for (let j = 0; j < columns; j++) {
      stage[i][j] = { x: j, y: i, isStart: false, state: STATES.NORMAL, isEnd: false, gCost: 0, hCost: 0, fCost: 0 };
    }
  }

  return stage;
};

const Stage: React.FC = () => {
  const [positions, setPositions] = useState<Array<Array<IPosition>>>([]);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [foundSolution, setFoundSolution] = useState(false);
  const dimensions = useDimensions();
  const rowsQty = Math.floor(dimensions.height / SQUARE_SIZE);
  const colsQty = Math.floor(dimensions.width / SQUARE_SIZE);
  useEffect(() => {
    setPositions(generateStage(rowsQty, colsQty));
  }, [rowsQty, colsQty]);

  const reset = () => {
    setPositions(generateStage(rowsQty, colsQty));
    setFoundSolution(false);
  };
  const onSquareClick = (position: IPosition) => {
    if (foundSolution) return reset();
    position.state = position.state === STATES.BLOCKED ? STATES.NORMAL : STATES.BLOCKED;
    setPositions([...positions]);
  };

  const onDoubleClick = (position: IPosition) => {
    if (foundSolution) return reset();
    const newPositions = [...positions];
    newPositions.forEach(r => r.forEach(p => (p.isStart = false)));
    position.state = STATES.NORMAL;
    position.isStart = true;
    setPositions(newPositions);
  };

  const onRightClick = (position: IPosition) => {
    if (foundSolution) return reset();
    const newPositions = [...positions];
    newPositions.forEach(r => r.forEach(p => (p.isEnd = false)));
    position.state = STATES.NORMAL;
    position.isEnd = true;
    setPositions(newPositions);
  };

  const startSearch = () => {
    const goal = getGoal(positions)!;
    const start = getStart(positions)!;
    if (!goal.x || !start.x) return;
    start.gCost = 0;
    start.hCost = getHCost(start, goal);
    start.fCost = start.gCost + start.hCost;

    const open: IPosition[] = [start];
    const closed: IPosition[] = [];

    const isSame = (p1: IPosition, p2: IPosition) => p1.x === p2.x && p1.y === p2.y;
    while (open.length > 0) {
      const current = getLowestF(open)!;

      // If we reached the end
      if (isSame(current, goal)) {
        let parent = current.parent!;
        while (!isSame(parent, start)) {
          parent.isInPath = true;
          parent = parent.parent!;
        }
        setPositions([...positions]);
        setFoundSolution(true);
        return;
      }

      open.splice(open.findIndex(v => isSame(v, current)), 1);
      closed.push(current);

      const neighbours = getNeighbours(current, positions, allowDiagonal);
      for (const n of neighbours) {
        n.gCost = current.gCost + getGCost(current, n);
        n.hCost = getHCost(n, goal);
        n.fCost = n.gCost + n.hCost;
        const nInOpen = open.find(v => isSame(v, n));
        const nInClosed = closed.find(v => isSame(v, n));

        // If the position is blocked or we already looked at it
        if (n.state === STATES.BLOCKED || nInClosed) {
          continue;
        }

        // If the neighbour position is in the open queue but the current position has a lower cost,
        // we remove the neighbour from the open queue
        if (nInOpen && current.gCost < n.gCost) {
          open.splice(open.findIndex(v => isSame(v, n)), 1);
        } else if (!nInOpen) {
          n.gCost = current.gCost;
          n.fCost = n.gCost + n.hCost;
          n.parent = current;
          open.push(n);
        }
        setPositions([...positions]);
      }
    }

    alert('Solution not found');
  };

  return (
    <Wrapper>
      {positions.map(row =>
        row.map(p => (
          <Position
            onRightClick={() => onRightClick(p)}
            onDoubleClick={() => onDoubleClick(p)}
            onClick={() => onSquareClick(p)}
            position={p}
            key={`${p.x}-${p.y}`}
          />
        )),
      )}

      <OptionsArea onStart={() => startSearch()} onDiagonalChange={v => setAllowDiagonal(v)} onReset={() => reset()} />
    </Wrapper>
  );
};

export default Stage;
