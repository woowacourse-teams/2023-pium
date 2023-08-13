import type { ToastItem } from 'types/toast';
import { memo, useEffect, useState, useCallback } from 'react';
import { IconArea, Message, MessageArea, Title, Wrapper } from './Toast.style';
import CheckCircle from '../Icons/CheckCircle';
import CloseCircle from '../Icons/CloseCircle';
import InfoCircle from '../Icons/InfoCircle';
import Warning from '../Icons/Warning';

const icons: Record<ToastItem['type'], JSX.Element> = {
  info: <InfoCircle aria-label="정보 알림" />,
  success: <CheckCircle aria-label="성공 알림" />,
  warning: <Warning aria-label="경고 알림" />,
  error: <CloseCircle aria-label="실패 알림" />,
};

const Toast = ({ type, title, message }: ToastItem) => {
  const [visible, setVisible] = useState(true);

  const handleToastClose = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    setTimeout(handleToastClose, 2100);
  }, [handleToastClose]);

  return (
    <Wrapper $type={type} $visible={visible} role="alert">
      <IconArea>{icons[type]}</IconArea>
      <MessageArea>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </MessageArea>
    </Wrapper>
  );
};

export default memo(Toast);
