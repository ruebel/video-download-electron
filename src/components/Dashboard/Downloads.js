import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Download from './Download';

const Wrapper = styled.div`margin: 15px 0;`;

const Downloads = ({ downloads, onComplete }) => {
  return (
    <Wrapper>
      {downloads.map(f => (
        <Download key={f.id} onComplete={onComplete} info={f} />
      ))}
    </Wrapper>
  );
};

Downloads.propTypes = {
  downloads: PropTypes.array,
  onComplete: PropTypes.func.isRequired
};

export default Downloads;
