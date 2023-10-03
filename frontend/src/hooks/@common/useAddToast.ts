import type { ToastItem } from 'types/@common';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastListState } from 'store/atoms/@common';

/**
 * @returns 새로운 토스트를 추가하는 함수
 */
const useAddToast = () => {
  const setToasts = useSetRecoilState(toastListState);

  const addToast = useCallback(
    (props: Omit<ToastItem, 'id'>) => {
      const id = self.crypto.randomUUID();

      setToasts((prev) => [...prev, { ...props, id }]);
    },
    [setToasts]
  );

  return addToast;
};

export default useAddToast;
