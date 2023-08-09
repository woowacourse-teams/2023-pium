import { useEffect, useRef, useState } from 'react';

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const modalRef = useRef<HTMLDialogElement>(null);

  const on = () => {
    setIsOpen(true);
  };

  const off = () => {
    setIsOpen(false);
  };

  const onTime = (ms: number) => {
    on();
    setTimeout(off, ms);
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      off();
    }
  };

  const closeOnBackdropClick = (event: MouseEvent) => {
    if (!modalRef.current) return;

    const dialog = modalRef.current.getBoundingClientRect();
    const isClickInsideDialog =
      dialog.top <= event.clientY &&
      event.clientY <= dialog.top + dialog.height &&
      dialog.left <= event.clientX &&
      event.clientX <= dialog.left + dialog.width;

    if (!isClickInsideDialog) off();
  };

  const body = useRef(document.body);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
      modalRef.current?.addEventListener('click', closeOnBackdropClick);

      body.current.querySelector('#root')?.setAttribute('aria-hidden', 'true');
      body.current.style.overflowY = 'hidden';

      window.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      modalRef.current?.close();
      modalRef.current?.removeEventListener('click', closeOnBackdropClick);

      body.current.querySelector('#root')?.setAttribute('aria-hidden', 'false');
      body.current.style.overflowY = 'auto';

      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isOpen]);

  return { isOpen, on, off, onTime, modalRef };
};

export default useModal;
