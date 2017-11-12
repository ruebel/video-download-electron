import styled from 'styled-components';

const TextInput = styled.input`
  background: ${p => p.theme.color.dark};
  border: none;
  border-bottom: 2px solid ${p => p.theme.color.light};
  color: ${p => p.theme.color.light};
  display: block;
  font-size: 12px;
  line-height: 1.25;
  outline: none;
  padding: 8px 0;
  transition: border-color 120ms ease-in-out;
  width: 100%;

  &:invalid {
    border-color: ${p => p.touched && p.theme.color.tertiary};
  }

  &:focus {
    border-color: ${p => p.theme.color.primary};
  }

  &::placeholder {
    color: ${p => p.theme.color.medium};
  }
`;

export default TextInput;
