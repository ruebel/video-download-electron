import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H2 from '../typography/H2';

const Detail = styled.div``;

const Image = styled.img`
  height: 148px;
  width: 220px;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
`;

const SourceDetails = ({ info }) => {
  return (
    <Wrapper>
      <Image alt={info.title} src={info.thumbnail} />
      <H2>{info.title}</H2>
      <Detail>{info.duration}</Detail>
      <Detail>{info.size}</Detail>
    </Wrapper>
  );
};

SourceDetails.propTypes = {
  info: PropTypes.object
};

export default SourceDetails;
