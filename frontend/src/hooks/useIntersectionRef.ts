import { useEffect, useRef } from 'react';
import createObserver from 'utils/createObserver';

const useIntersectionRef = <T extends Element>(onIntersecting: () => void) => {
  const elementRef = useRef<T>(null);
  const observer = createObserver(onIntersecting);

  useEffect(() => {
    if (elementRef.current) observer.observe(elementRef.current);
  }, []);

  return elementRef;
};

export default useIntersectionRef;
