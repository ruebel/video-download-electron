import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.div`margin-right: 25px;`;

const Wrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
`;

const FormField = ({ children, title }) => {
  return (
    <Wrapper>
      <Label>Select Folder</Label>
      {this.props.children}
    </Wrapper>
  );
};

FormField.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default FormField;
