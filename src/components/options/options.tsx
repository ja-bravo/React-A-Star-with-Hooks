import React from 'react';
import { Wrapper, Label, Row, Button, Instruction } from './style';

interface IProps {
  onStart: () => void;
  onReset: () => void;
  onDiagonalChange: (value: boolean) => void;
}

const OptionsArea = ({ onStart, onDiagonalChange, onReset }: IProps) => {
  return (
    <Wrapper>
      <Row>
        <Label htmlFor="diagonal">Allow diagonal movement</Label>
        <input type="checkbox" name="diagonal" id="diagonal" onChange={e => onDiagonalChange(e.target.checked)} />
      </Row>

      <Row>
        <Button onClick={onStart}>Search</Button>
        <Button onClick={onReset}>Reset</Button>
      </Row>

      <h4>Instructions</h4>
      <Instruction>Left click to add a wall</Instruction>
      <Instruction>Double click to set the starting point</Instruction>
      <Instruction>Right click to set the goal point</Instruction>
    </Wrapper>
  );
};

export default OptionsArea;
