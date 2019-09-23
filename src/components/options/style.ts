import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 250px;
  padding: 16px;
  border-radius: 4px;
  background: white;
  position: absolute;
  top: 16px;
  right: 16px;

  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
`;

export const Button = styled.button`
  outline: 0;
  border: 0;
  width: 80px;
  height: 40px;
  background-color: #ccc;
  border-radius: 4px;
`;

export const Instruction = styled.p`
  margin-bottom: 4px;
  margin-top: 4px;
`;