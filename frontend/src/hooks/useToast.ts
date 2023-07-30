import { ToastContext } from 'contexts/toastContext';
import { useContext } from 'react';
import { ToastType } from 'components/@common/Toast';
import { ERROR } from 'constants/index';

/**
 *
 * toast를 추가, 리스트를 반환하는 hooks
 * @returns {addToast, toastList}
 */

const useToast = () => {
  const context = useContext(ToastContext);

  if (context === null) throw Error(ERROR.toastContext);

  const { toastList, setToastList } = context;

  const id = self.crypto.randomUUID();

  const addToast = (type: ToastType, message: string) => {
    setToastList((prev) => [...prev, { id, type, message }]);
  };

  const clearToastList = () => setToastList([]);

  return { addToast, toastList, clearToastList };
};

export default useToast;
