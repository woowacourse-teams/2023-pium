import { useState } from 'react';

const useBoolean = (initialState = false) => {
  const [boolean, setBoolean] = useState(initialState);

  const on = () => {
    setBoolean(true);
  };

  const off = () => {
    setBoolean(false);
  };

  const onTime = (ms: number) => {
    on();
    setTimeout(off, ms);
  };

  return { boolean, on, off, onTime };
};

export default useBoolean;
