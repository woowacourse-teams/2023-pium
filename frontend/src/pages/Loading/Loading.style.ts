import { styled, keyframes } from 'styled-components';

const flip = keyframes`
  0% {
    transform: perspective(555px) rotateY(0deg);
  }

  100% {
    transform: perspective(555px) rotateY(360deg);
  }
`;

export const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: ${({ theme }) => theme.width.mobile};
  max-width: ${({ theme }) => theme.width.pad};
  margin: auto;
`;

export const LoadingImage = styled.img`
  width: 250px;
  height: 250px;
  margin-top: 50px;
  animation: ${flip} 1.2s ease-in-out infinite;
`;
