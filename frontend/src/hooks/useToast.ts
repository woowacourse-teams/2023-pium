import { ToastContext } from 'contexts/toastContext';
import { useContext, useId } from 'react';
import { ERROR } from 'constants/index';

const useToast = () => {
  // 여기서 toast의 값을 추가, 삭제해야함.
  const context = useContext(ToastContext);

  if (context === null) throw Error(ERROR.toastContext);

  const { setToastList } = context;

  const id = useId();

  const success = (message: string) =>
    setToastList((prev) => [...prev, { id, type: 'success', message }]);
  const error = (message: string) =>
    setToastList((prev) => [...prev, { id, type: 'error', message }]);
  const info = (message: string) =>
    setToastList((prev) => [...prev, { id, type: 'info', message }]);
  const warning = (message: string) =>
    setToastList((prev) => [...prev, { id, type: 'warning', message }]);

  return { success, error, warning, info };
};

export default useToast;
