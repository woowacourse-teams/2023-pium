import { createPortal } from 'react-dom';
import { ToastListWrapper } from './Toast.style';
import useToast from 'hooks/useToast';
import Toast from '.';

const ToastList = () => {
  const root = document.getElementById('toast-root') ?? document.body;

  const { toastList } = useToast();

  const toasts = toastList.map((props, idx) => <Toast key={props.id + idx} {...props} />);

  return createPortal(<ToastListWrapper>{toasts}</ToastListWrapper>, root);
};

export default ToastList;
