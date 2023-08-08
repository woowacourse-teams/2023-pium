import { styled } from 'styled-components';
import theme from 'style/theme.style';

export const HiddenRadio = styled.input`
  display: none;

  &:checked + span {
    font-weight: bold;
    color: ${theme.color.primary};
  }
`;

export const Label = styled.label`
  cursor: pointer;
  display: inline-block;
  padding: 3px 13px;

  &:hover {
    font-weight: bold;
  }
`;
