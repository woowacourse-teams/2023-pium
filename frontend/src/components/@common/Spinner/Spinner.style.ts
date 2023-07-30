import { keyframes, styled } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const CircleSpinner = styled.div`
  content: '';

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  border: 10px solid rgba(0, 0, 0, 0.05);
  border-top-color: rgb(255, 105, 180);
  border-radius: 50%;

  animation: ${spin} 2s linear infinite;
`;
