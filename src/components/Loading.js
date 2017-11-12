import React from 'react';
import styled, { keyframes } from 'styled-components';

const bar1 = keyframes`
  0% {
    left: -45%;
    right: 100%;
  }
  60%, 100% {
    left: 100%;
    right: -90%;
  }
`;

const bar2 = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60%, 100% {
    left: 107%;
    right: -8%;
  }
`;

const Bar = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  transition: transform 0.2s linear;
  transform-origin: left;
  background-color: ${p => p.theme.color.primary};
`;

const Bar1 = styled(Bar)`
  animation: ${bar1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
`;

const Bar2 = styled(Bar)`
  animation: ${bar2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: 1.15s;
`;

const Wrapper = styled.div`
  height: 5px;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const Loading = () => (
  <Wrapper>
    <Bar1 />
    <Bar2 />
  </Wrapper>
);

export default Loading;
