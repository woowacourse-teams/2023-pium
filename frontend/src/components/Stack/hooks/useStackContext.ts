import { useContext, useState } from 'react';
import { ERROR } from 'constants/index';
import { StackContext } from '../contexts/stackContext';

const useStackContext = () => {
  const stackIndex = useContext(StackContext);

  if (!stackIndex) throw new Error(ERROR.stackContext);

  const { index, setIndex, size } = stackIndex;
  const [isNextCalled, setIsNextCalled] = useState(false);
  const isLastElementShown = index + 1 === size;

  const showNextElement = () => {
    if (isNextCalled) return;
    if (isLastElementShown) return;

    setIndex(index + 1);
    setIsNextCalled(true);
  };

  return { showNextElement, isLastElementShown };
};

export default useStackContext;
