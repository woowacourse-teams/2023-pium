import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
  const [isOn, setIsOn] = useState(initialState);

  const on = useCallback(() => {
    setIsOn(true);
  }, []);

  const off = useCallback(() => {
    setIsOn(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOn((prev) => !prev);
  }, []);

  return { isOn, on, off, toggle };
};

export default useToggle;
