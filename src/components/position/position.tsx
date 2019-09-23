import React, { ReactNode } from 'react';
import Item from './styles';
import IPosition from '../../interfaces/position';

type IProps = {
  position: IPosition;
  onClick: () => void;
  onDoubleClick: () => void;
  onRightClick: () => void;
  children?: ReactNode;
};

const Position = (props: IProps) => {
  const { position, onClick, onDoubleClick, onRightClick } = props;
  return (
    <Item
      onClick={() => onClick()}
      onDoubleClick={() => onDoubleClick()}
      position={position}
      onContextMenu={e => {
        e.preventDefault();
        onRightClick();
      }}
    />
  );
};

export default Position;
