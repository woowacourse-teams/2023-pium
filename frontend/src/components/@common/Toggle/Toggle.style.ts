import styled, { css } from 'styled-components';

interface ToggleParams {
  on: boolean;
  width: number;
  height: number;
}

export const Wrapper = styled.div``;

export const ToggleBtn = styled.button<ToggleParams>`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  background-color: ${({ on, theme }) => (!on ? theme.color.gray : theme.color.primary)};
  border: none;
  border-radius: 30px;

  transition: all 0.5s ease-in-out;
`;
export const Circle = styled.div<ToggleParams>`
  position: absolute;
  left: 5%;

  width: ${({ height }) => height * 0.8}px;
  height: ${({ height }) => height * 0.8}px;

  ${({ on, width, height }) =>
    on &&
    css`
      transform: translate(${width - height}px, 0);
      transition: all 0.5s ease-in-out;
    `}

  background-color: white;
  border-radius: ${({ height }) => height}px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */

  transition: all 0.5s ease-in-out;
`;
