import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bar = styled.div`
  background: ${p => p.theme.color.secondary};
  height: 100%;
  left: ${p => -100 + p.percent}%;
  mix-blend-mode: color-dodge;
  position: absolute;
  top: 0;
  width: 100%;
`;

class ProgressBar extends React.PureComponent {
  render() {
    return <Bar percent={this.props.percent} />;
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.PropTypes.number
};

export default ProgressBar;
