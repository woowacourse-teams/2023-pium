import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const DateValue = styled.button<{
  $placeholder?: boolean;
}>`
  display: inline-block;

  width: 100%;

  font: 500 1.2rem/2.2rem 'GmarketSansMedium';
  color: ${({ $placeholder, theme }) => ($placeholder ? theme.color.subLight : 'black')};
  text-align: center;
`;
