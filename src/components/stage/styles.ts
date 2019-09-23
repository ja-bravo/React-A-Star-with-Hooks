import styled from 'styled-components/macro';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const FAB = styled.div<{ top?: number; right?: number }>`
  height: 60px;
  width: 60px;
  border-radius: 60px;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: #e53a40;
  cursor: pointer;
  position: absolute;
  top: ${f => (f.top ? f.top : 10)}px;
  right: ${f => (f.right ? f.right : 10)}px;
`;

export { Wrapper, FAB };
