import { useState } from 'react';

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

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

  return { isOpen, on, off, onTime };
};

export default useModal;
