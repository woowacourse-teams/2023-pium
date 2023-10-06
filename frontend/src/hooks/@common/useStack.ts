import { useState } from 'react';

/**
 * `@pium/stack-component`를 사용하기 위한 훅.
 * @param initialShowCount 맨 처음에 보여줄 개수
 * @param stackSize 스택 안에 들어가는 요소의 수
 * @returns `showCount`: 현재 보여주는 개수
 * @returns `showNextElement`: 현재 보여지고 있는 마지막 요소의 index를 받았다면 다음 요소를 보여주는 함수
 * @returns `isLastElementShown`: 마지막 요소까지 전부 보여줬다면 `true`
 */
const useStack = (initialShowCount: number, stackSize: number) => {
  const [showCount, setShowCount] = useState(initialShowCount);
  const isLastElementShown = showCount === stackSize;

  const showNextElement = (myIndex: number) => {
    const nextAlreadyShown = showCount - 1 > myIndex;
    if (isLastElementShown || nextAlreadyShown) return;

    setShowCount(showCount + 1);
  };

  return { showCount, showNextElement, isLastElementShown };
};

export default useStack;
