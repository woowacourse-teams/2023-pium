import styled from 'styled-components';

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 68px);
`;

export const ButtonBox = styled.section`
  position: absolute;
  bottom: 68px;

  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  width: 100%;

  button {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  height: 45px;
  color: ${({ theme: { color } }) => color.gray};
  border-radius: 8px;
`;

type Pixel = `${number}px`;

export const VerticalDivider = styled.div<{ height: Pixel }>`
  width: 1px; /* 세로 선의 너비를 조절할 수 있습니다. */
  height: ${({ height }) => height};
  background: ${({ theme: { color } }) => color.gray}; /* 세로 선의 색상을 지정합니다. */
`;
