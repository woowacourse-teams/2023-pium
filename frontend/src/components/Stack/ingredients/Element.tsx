import styled, { keyframes } from 'styled-components';

const fall = (height: string) => keyframes`
  from {
    margin-top: -${height};
    transform: translateY(-${height});
  }
  to {
    margin-top: 0;    
    transform: translateY(0);
  }
`;

const Element = styled.div<{ height: string }>`
  display: flex;
  align-items: center;

  height: ${({ height }) => height};
  margin-top: 0;

  animation: ${({ height }) => fall(height)} 0.3s linear;
`;

export default Element;
