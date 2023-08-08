import { useState } from 'react';

const useStack = (stackSize: number) => {
  const [topIndex, setTopIndex] = useState(0);
  const isLastElementShown = topIndex + 1 === stackSize;

  const showNextElement = (index: number) => {
    const nextAlreadyShown = topIndex > index;
    if (isLastElementShown || nextAlreadyShown) return;

    setTopIndex(index + 1);
  };

  return { topIndex, showNextElement, isLastElementShown };
};

export default useStack;
