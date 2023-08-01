import { ToastContext } from 'contexts/toastContext';
import { useContext } from 'react';
import { ToastType } from 'components/@common/Toast';
import { ERROR } from 'constants/index';

/**
 * toast를 추가, 리스트를 반환하는 hooks
 * @returns {addToast, toastList}
 */
const useToast = () => {
  const context = useContext(ToastContext);

  if (context === null) throw Error(ERROR.toastContext);

  const { toastList, setToastList } = context;

  const addToast = (type: ToastType, message: string) => {
    const id = self.crypto.randomUUID();

    setToastList((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 2300);
  };

  const removeToast = (id: string) => {
    setToastList((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const clearToastList = () => setToastList([]);

  return { addToast, toastList, clearToastList };
};

export default useToast;
