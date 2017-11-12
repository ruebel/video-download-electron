import React from 'react';
import styled from 'styled-components';
import Dashboard from '../Dashboard';

const Wrapper = styled.div`
  background: ${p => p.theme.color.dark};
  color: ${p => p.theme.color.light};
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
  width: 100%;
`;

class App extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );
  }
}

export default App;
