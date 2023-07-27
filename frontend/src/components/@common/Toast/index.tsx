import { createPortal } from 'react-dom';
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
  AiOutlineWarning,
} from 'react-icons/ai';
import { IconArea, Message, MessageArea, Title, Wrapper } from './Toast.style';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  title?: string;
}

const Toast = ({ type, title, message }: ToastProps) => {
  const root = document.getElementById('toast-root')!;

  return createPortal(
    <Wrapper type={type}>
      <IconArea>
        {
          {
            info: <AiOutlineInfoCircle />,
            success: <AiOutlineCheckCircle />,
            warning: <AiOutlineWarning />,
            error: <AiOutlineCloseCircle />,
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
