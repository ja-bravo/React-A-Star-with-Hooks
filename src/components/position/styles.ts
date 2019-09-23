import styled from 'styled-components/macro';
import STATES from '../../enums/states';
import { SQUARE_SIZE } from '../../utils/constants';
import IPosition from '../../interfaces/position';

const Wrapper = styled.div<{ position: IPosition }>`
  height: ${SQUARE_SIZE}px;
  width: ${SQUARE_SIZE}px;
  border: 1px solid #33333324;
  background: ${p => {
    const { isInPath, parent, isStart, isEnd, state } = p.position;

    if (isEnd) return '#c80000';
    if (isStart) return '#5fba7d';
    if (isInPath) return 'yellow';
    if (parent) return 'pink';
    if (state === STATES.BLOCKED) return '#333';
  }};
`;

export default Wrapper;
