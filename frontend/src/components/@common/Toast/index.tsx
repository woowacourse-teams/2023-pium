import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconArea, Message, MessageArea, Title, Wrapper } from './Toast.style';
import CheckCircle from '../Icons/CheckCircle';
import CloseCircle from '../Icons/CloseCircle';
import InfoCircle from '../Icons/InfoCircle';
import Warning from '../Icons/Warning';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  title?: string;
  toastClose: () => void;
}

const Toast = ({ type, title, message, toastClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  const root = document.getElementById('toast-root') ?? document.body;

  const icon = {
    info: <InfoCircle />,
    success: <CheckCircle />,
    warning: <Warning />,
    error: <CloseCircle />,
  }[type];

  const handleToastClose = () => {
    setVisible(false);
    setTimeout(toastClose, 300);
  };

  useEffect(() => {
    setTimeout(handleToastClose, 2000);
  }, [handleToastClose]);

  return createPortal(
    <Wrapper type={type} visible={visible}>
      <IconArea>{icon}</IconArea>
      <MessageArea>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </MessageArea>
    </Wrapper>,
    root
  );
};

export default Toast;
