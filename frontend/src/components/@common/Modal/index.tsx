import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Background, CloseButton, ModalBox } from './Modal.style';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const root = document.getElementById('modal-root') ?? document.body;

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const body = useRef(document.body);

  useEffect(() => {
    if (isOpen) {
      body.current.querySelector('#root')?.setAttribute('aria-hidden', 'true');
      body.current.style.overflowY = 'hidden';
      window.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      body.current.querySelector('#root')?.setAttribute('aria-hidden', 'false');
      body.current.style.overflowY = 'auto';
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isOpen]);

  return createPortal(
    isOpen && (
      <>
        <Background onClick={closeModal} />
        <ModalBox aria-modal="true">
          <CloseButton type="button" onClick={closeModal} aria-label="모달 닫기">
            x
          </CloseButton>
          {children}
        </ModalBox>
      </>
    ),
    root
  );
};

export default Modal;
