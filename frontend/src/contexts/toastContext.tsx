import { createContext, useState } from 'react';
import { ToastProps } from 'components/@common/Toast';

interface ContextProps {
  toastList: ToastProps[];
  setToastList: React.Dispatch<React.SetStateAction<ToastProps[]>>;
}

export const ToastContext = createContext<ContextProps | null>(null);

const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [toastList, setToastList] = useState<ToastProps[]>([]);

  return (
    <ToastContext.Provider value={{ toastList, setToastList }}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
