import styled, { keyframes } from 'styled-components';

const showModal = keyframes({
  '0%': {
    bottom: '-100%',
  },

  '100%': {
    bottom: '0',
  },
});

export const ModalBox = styled.dialog`
  position: fixed;
  z-index: ${({ theme: { zIndex } }) => zIndex.modal};
  top: auto;
  bottom: 0;

  width: 100%;
  margin: 0 auto;
  padding: 16px 0;

  background-color: ${({ theme: { color } }) => color.background};
  border: none;
  border-radius: 8px;

  animation: ${showModal} 0.3s ease-out;

  &::backdrop {
    cursor: pointer;

    position: fixed;
    z-index: ${({ theme: { zIndex } }) => zIndex.modalBackdrop};
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.25);
  }
`;

export const ModalContent = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  max-height: 80vh;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 28px;
  font: 800 2rem/2.4rem 'GmarketSans';
`;
