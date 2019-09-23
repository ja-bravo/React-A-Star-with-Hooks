import React from 'react';
import modernNormalize from 'styled-modern-normalize';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/macro';
import Stage from './components/stage';

const Globals = createGlobalStyle`
  ${modernNormalize}
 
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  #root, body, html {
    width: 100%;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #f5f7f7;
`;

const App: React.FC = () => {
  return (
    <AppWapper>
      <Globals />
      <Stage />
    </AppWapper>
  );
}

export default App;
