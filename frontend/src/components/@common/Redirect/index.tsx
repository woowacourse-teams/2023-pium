import type { ToastItem } from 'types/@common';
import { useEffect } from 'react';
import { Navigate, type NavigateProps } from 'react-router-dom';
import useAddToast from 'hooks/@common/useAddToast';
import useResetErrorBoundary from 'hooks/@common/useResetErrorBoundary';

interface RedirectProps extends NavigateProps {
  toastType?: ToastItem['type'];
  toastMessage?: ToastItem['message'];
}

/**
 * 본인을 fallback으로 사용하는 ErrorBoundary의 에러 상태를 초기화하고
 * props로 받은 곳으로 즉시 이동합니다.
 */
const Redirect = (props: RedirectProps) => {
  const { toastType = 'info', toastMessage, ...navigateProps } = props;
  const resetError = useResetErrorBoundary();
  const addToast = useAddToast();

  useEffect(() => {
    resetError?.();
    if (toastMessage) {
      addToast({ type: toastType, message: toastMessage });
    }
  }, [resetError, addToast, toastType, toastMessage]);

  return <Navigate {...navigateProps} />;
};

export default Redirect;
