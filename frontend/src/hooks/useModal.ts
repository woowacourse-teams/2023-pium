import { useCallback, useEffect, useRef } from 'react';
import useSwitch from './useSwitch';

const useModal = (initialState = false) => {
  const { isOn: isOpen, on: open, off: close } = useSwitch(initialState);
  const modalRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef(document.body);

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  const closeOnBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (!modalRef.current) return;

      const dialog = modalRef.current.getBoundingClientRect();
      const isClickInsideDialog =
        dialog.top <= event.clientY &&
        event.clientY <= dialog.top + dialog.height &&
        dialog.left <= event.clientX &&
        event.clientX <= dialog.left + dialog.width;

      if (!isClickInsideDialog) close();
    },
    [close]
  );

  useEffect(() => {
    const dialog = modalRef.current;
    const body = bodyRef.current;

    if (isOpen) {
      dialog?.showModal();
      dialog?.addEventListener('click', closeOnBackdropClick);

      body.querySelector('#root')?.setAttribute('aria-hidden', 'true');
      body.style.overflowY = 'hidden';

      window.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      dialog?.close();
      dialog?.removeEventListener('click', closeOnBackdropClick);

      body.querySelector('#root')?.setAttribute('aria-hidden', 'false');
      body.style.overflowY = 'auto';

      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isOpen, open, close, keyDownHandler, closeOnBackdropClick]);

  return { isOpen, open, close, modalRef };
};

export default useModal;
