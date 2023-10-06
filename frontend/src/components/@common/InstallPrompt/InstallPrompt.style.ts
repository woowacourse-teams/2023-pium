import styled, { keyframes } from 'styled-components';

const slideDown = keyframes` 
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  `;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 100%;
  min-width: ${({ theme }) => theme.width.mobile};
  max-width: ${({ theme }) => theme.width.pad};
  height: 120px;
  margin: 16px 0;
  padding: 0 32px;

  background: ${({ theme }) => theme.color.background};
  border-bottom: solid 2px ${({ theme }) => theme.color.grayLight};

  animation: ${slideDown} 1s ease-in-out;
`;

export const ContentWrapper = styled.div`
  position: relative;

  svg {
    cursor: pointer;
    position: absolute;
    top: -20px;
    right: 0;
  }
`;

export const GuideParagraph = styled.p`
  font: 500 1.6rem/2.2rem NanumSquareRound;
`;

export const IosGuide = styled.p`
  justify-content: center;
  height: 30px;
  font: 600 1.6rem/2.2rem NanumsquareRound;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  height: 30px;
  font: 500 1.8rem/2.2rem NanumSquareRound;

  button {
    width: 100%;
    background-color: ${({ theme }) => theme.color.grayLight};
    border-radius: 8px;
  }

  :last-child {
    color: ${({ theme }) => theme.color.background};
    background-color: ${({ theme }) => theme.color.primary};
  }
`;
