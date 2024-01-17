import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 스피너 컴포넌트 스타일을 정의합니다.
export const Loader = styled.div<{ $size: string }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  margin: 0 auto;

  border: ${({ $size }) => Number($size) * 0.1}px solid rgba(255, 255, 255, 0.3);
  border-top: ${({ $size }) => Number($size) * 0.1}px solid #0074d9;
  border-radius: 50%;

  animation: ${spinAnimation} 1s linear infinite;
`;

// UI 컨테이너 스타일을 정의합니다.
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
