import { memo } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { ToastListWrapper } from './Toast.style';
import { toastListState } from 'store/atoms/@common';
import Toast from '.';

const SHOW_TOAST_SIZE = 4;

const ToastList = () => {
  const toastList = useRecoilValue(toastListState).slice(-SHOW_TOAST_SIZE);
  const root = document.getElementById('toast-root') ?? document.body;

  return createPortal(
    <>
      {toastList.length > 0 && (
        <ToastListWrapper aria-live="assertive">
          {toastList.map((props) => (
            <Toast key={props.id} {...props} />
          ))}
        </ToastListWrapper>
      )}
    </>,
    root
  );
};

export default memo(ToastList);
