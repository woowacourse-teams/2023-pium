import styled from 'styled-components';

export const Background = styled.div`
  cursor: pointer;

  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.25);
`;

export const ModalBox = styled.dialog`
  position: fixed;
  z-index: 2;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 0 auto;

  background-color: ${({ theme: { color } }) => color.background};
  border: none;
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 28px;
  font: 800 2rem/2.4rem 'NanumSquareRound';
`;
