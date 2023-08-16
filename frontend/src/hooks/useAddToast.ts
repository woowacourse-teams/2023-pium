import type { ToastItem } from 'types/toast';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import toasts from 'store/atoms/toasts';

/**
 * @returns 새로운 토스트를 추가하는 함수
 */
const useAddToast = () => {
  const setToasts = useSetRecoilState(toasts);

  const addToast = useCallback(
    (type: ToastItem['type'], message: ToastItem['message'], time = 2300) => {
      const id = self.crypto.randomUUID();

      setToasts((prev) => [...prev, { id, type, message }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter(({ id: toastId }) => toastId !== id));
      }, time);
    },
    [setToasts]
  );

  return addToast;
};

export default useAddToast;
