import { useEffect, useRef } from 'react';

const useChildrenLeftPositions = <T extends HTMLElement>(domRef: React.RefObject<T>) => {
  const childrenPositions = useRef<number[]>([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      childrenPositions.current = Array.from(entry.target.children).map(
        (child) => child.getBoundingClientRect().left
      );
    });

    if (domRef.current) resizeObserver.observe(domRef.current);
    return () => resizeObserver.disconnect();
  }, [domRef]);

  return childrenPositions.current;
};

export default useChildrenLeftPositions;
