import { styled } from 'styled-components';

export interface WrapperProps {
  flexDirection: 'row' | 'column';
  width?: string;
  height?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: inline-flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  align-self: start;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
