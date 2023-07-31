import { memo, useEffect, useState } from 'react';
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
  const [visible, setVisible] = useState(true); // 애니메이션을 위한 상태

  const icon = {
    info: <InfoCircle />,
    success: <CheckCircle />,
    warning: <Warning />,
    error: <CloseCircle />,
  }[type];

  const handleToastClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    setTimeout(handleToastClose, 2000);
  }, [handleToastClose]);

  return (
    <Wrapper type={type} visible={visible} role="alert">
      <IconArea>{icon}</IconArea>
      <MessageArea>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </MessageArea>
    </Wrapper>
  );
};

export default memo(Toast);
