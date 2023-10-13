import { useState } from 'react';

type ShowState = 'NOT_OVER' | 'HIDDEN_OVER' | 'SHOW_OVER';

const useShowState = (maxHeight: `${number}px`) => {
  const [showState, setShowState] = useState<ShowState>('NOT_OVER');

  const wrapperRef = (instance: HTMLDivElement | null) => {
    if (!instance) return;

    const maxHeightNumber = Number(maxHeight.slice(0, -2));

    if (showState === 'NOT_OVER' && instance.offsetHeight > maxHeightNumber) {
      setShowState('HIDDEN_OVER');
    }
  };

  const showOver = () => {
    setShowState('SHOW_OVER');
  };

  return { showState, wrapperRef, showOver };
};

export default useShowState;
