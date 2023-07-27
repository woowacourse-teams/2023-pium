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
}

const Toast = ({ type, title, message }: ToastProps) => {
  const root = document.getElementById('toast-root') ?? document.body;

  return createPortal(
    <Wrapper type={type}>
      <IconArea>
        {
          {
            info: <InfoCircle />,
            success: <CheckCircle />,
            warning: <Warning />,
            error: <CloseCircle />,
          }[type]
        }
      </IconArea>
      <MessageArea>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </MessageArea>
    </Wrapper>,
    root
  );
};

export default Toast;
