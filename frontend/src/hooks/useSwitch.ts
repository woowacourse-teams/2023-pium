import { useCallback, useState } from 'react';

const useSwitch = (initialState = false) => {
  const [isOn, setIsOn] = useState(initialState);

  const on = useCallback(() => {
    setIsOn(true);
  }, []);

  const off = useCallback(() => {
    setIsOn(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOn(!isOn);
  }, [isOn]);

  return { isOn, on, off, toggle };
};

export default useSwitch;
