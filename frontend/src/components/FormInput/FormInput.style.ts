import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;

  font: ${({ theme }) => theme.font.input};
  text-align: center;

  appearance: textfield;
  border: none;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }
`;
