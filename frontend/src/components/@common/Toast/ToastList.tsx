import { memo, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ToastListWrapper } from './Toast.style';
import useToast from 'hooks/useToast';
import Toast from '.';

const ToastList = () => {
  const root = document.getElementById('toast-root') ?? document.body;

  const { toastList } = useToast();

  const toasts = useMemo(
    () => toastList.map((props, idx) => <Toast key={props.id + idx} {...props} />),
    [toastList]
  );

  return createPortal(
    <>
      {toastList.length > 0 && <ToastListWrapper aria-live="assertive">{toasts}</ToastListWrapper>}
    </>,
    root
  );
};

export default memo(ToastList);
