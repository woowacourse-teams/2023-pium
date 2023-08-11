import { useEffect, useRef } from 'react';
import useSwitch from './useSwitch';

const useModal = (initialState = false) => {
  const { isOn: isOpen, on, off } = useSwitch(initialState);
  const modalRef = useRef<HTMLDialogElement>(null);
  const body = useRef(document.body);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      off();
    }
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
      body.current.querySelector('#root')?.setAttribute('aria-hidden', 'true');
      body.current.style.overflowY = 'hidden';
      window.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      modalRef.current?.close();
      body.current.querySelector('#root')?.setAttribute('aria-hidden', 'false');
      body.current.style.overflowY = 'auto';
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isOpen]);

  return { isOpen, on, off, modalRef };
};

export default useModal;
