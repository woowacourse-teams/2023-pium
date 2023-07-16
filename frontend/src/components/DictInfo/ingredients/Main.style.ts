import { styled } from 'styled-components';

interface WrapperProps {
  $flexDirection: 'row' | 'column';
  $width?: string;
  $height?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: inline-flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;
