import styled from 'styled-components';

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
