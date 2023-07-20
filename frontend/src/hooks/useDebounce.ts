import { useState, useEffect } from 'react';

/**
 * 어떤 값에 debounce를 적용하여 debounce된 값을 보여줍니다.
 *
 * @param value debounce를 적용할 값
 * @param delay debounce를 적용할 시간 (밀리초, ms)
 * @returns debounce가 적용된 값
 */
const useDebounce = <T>(value: T, delay: number) => {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setState(value), delay);

    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return state;
};

export default useDebounce;
