import { useCallback, useEffect, useRef, useState } from 'react';

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const modalRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef(document.body);

  const on = useCallback(() => {
    setIsOpen(true);
  }, []);

  const off = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onTime = useCallback(
    (ms: number) => {
      on();
      setTimeout(off, ms);
    },
    [on, off]
  );

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        off();
      }
    },
    [off]
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

      if (!isClickInsideDialog) off();
    },
    [off]
  );

  useEffect(() => {
    const dialog = modalRef.current;
    const body = bodyRef.current;

    if (isOpen) {
      dialog?.showModal();
      dialog?.addEventListener('click', closeOnBackdropClick);

      body.style.overflowY = 'hidden';

      window.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      dialog?.close();
      dialog?.removeEventListener('click', closeOnBackdropClick);

      body.style.overflowY = 'auto';

      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isOpen, on, off, keyDownHandler, closeOnBackdropClick]);

  return { isOpen, on, off, onTime, modalRef };
};

export default useModal;
