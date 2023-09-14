import styled from 'styled-components';
import type { CSSProp } from 'styled-components';

export const Wrapper = styled.div<{
  size: number;
  customCss?: CSSProp;
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${({ theme }) => theme.color.background};
  border-radius: 50%;
  ${({ customCss }) => customCss && customCss}
`;

export const ImageLabel = styled.label`
  width: 60px;
  height: 60px;
`;

export const FileInput = styled.input.attrs(() => ({ type: 'file' }))`
  position: absolute;

  overflow: hidden;

  width: 0;
  height: 0;
  padding: 0;

  border: 0;
`;
