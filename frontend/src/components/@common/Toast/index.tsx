import { useEffect, useState } from 'react';
import { IconArea, Message, MessageArea, Title, Wrapper } from './Toast.style';
import CheckCircle from '../Icons/CheckCircle';
import CloseCircle from '../Icons/CloseCircle';
import InfoCircle from '../Icons/InfoCircle';
import Warning from '../Icons/Warning';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
}

const Toast = ({ type, title, message }: ToastProps) => {
  const [render, setRender] = useState(true); // 토스트의 렌더링을 구분하기 위한 상태
  const [visible, setVisible] = useState(true); // 애니메이션을 위한 상태

  const icon = {
    info: <InfoCircle />,
    success: <CheckCircle />,
    warning: <Warning />,
    error: <CloseCircle />,
  }[type];

  const handleToastClose = () => {
    setVisible(false);
    setTimeout(() => {
      setRender(false);
    }, 300);
  };

  useEffect(() => {
    setTimeout(handleToastClose, 2000);
  }, [handleToastClose]);

  return (
    <>
      {render && (
        <Wrapper type={type} visible={visible}>
          <IconArea>{icon}</IconArea>
          <MessageArea>
            {title && <Title>{title}</Title>}
            <Message>{message}</Message>
          </MessageArea>
        </Wrapper>
      )}
    </>
  );
};

export default Toast;
