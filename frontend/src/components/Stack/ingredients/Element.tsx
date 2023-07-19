import styled, { keyframes } from 'styled-components';

const fall = (height: string) => keyframes`
  from {
    margin-top: -${height};
    transform: translateY(-${height});
    opacity: 0;
  }
  to {
    margin-top: 0;    
    transform: translateY(0);
    opacity: 1;
  }
`;

const Element = styled.div<{ height: string }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: ${({ height }) => height};
  margin-top: 0;

  animation: ${({ height }) => fall(height)} 0.4s linear;
`;

export default Element;
