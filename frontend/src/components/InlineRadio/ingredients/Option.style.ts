import { styled } from 'styled-components';
import theme from '../../../style/theme.style';

export const HiddenRadio = styled.input`
  display: none;

  &:checked + span {
    font-weight: bold;
    color: ${theme.color.primary};
    text-shadow: 1.2px 1.2px 1.2px lightgrey;
  }
`;

export const Label = styled.label`
  display: inline-block;
  padding: 3px 13px;

  &:hover {
    font-weight: bold;
  }
`;
