import { PropsWithChildren, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton, ModalBox, ModalContent } from './Modal.style';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { isOpen, closeModal, children },
  ref
) {
  const root = document.getElementById('modal-root') ?? document.body;

  return createPortal(
    isOpen && (
      <ModalBox aria-modal="true" ref={ref}>
        <CloseButton type="button" onClick={closeModal} aria-label="모달 닫기">
          x
        </CloseButton>
        <ModalContent>{children}</ModalContent>
      </ModalBox>
    ),
    root
  );
});

export default Modal;
