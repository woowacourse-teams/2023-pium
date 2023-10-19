import { useCallback, useMemo } from 'react';
import createObserver from 'utils/createObserver';

const useIntersectionRef = (onIntersecting: () => void) => {
  const observer = useMemo(() => createObserver(onIntersecting), [onIntersecting]);

  const intersectionRef = useCallback(
    <T extends Element>(instance: T | null) => {
      if (instance) observer.observe(instance);
    },
    [observer]
  );

  return intersectionRef;
};

export default useIntersectionRef;
