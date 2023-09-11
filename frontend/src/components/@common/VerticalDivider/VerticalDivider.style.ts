import styled from 'styled-components';

type Pixel = `${number}px`;

const VerticalDivider = styled.div.attrs({
  'aria-hidden': true,
})<{ height: Pixel }>`
  width: 1px; /* 세로 선의 너비를 조절할 수 있습니다. */
  height: ${({ height }) => height};
  background: ${({ theme: { color } }) => color.gray}; /* 세로 선의 색상을 지정합니다. */
`;

export default VerticalDivider;
