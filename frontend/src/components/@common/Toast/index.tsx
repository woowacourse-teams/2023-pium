import type { ToastItem } from 'types/toast';
import { memo, useEffect, useState, useCallback } from 'react';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
import { IconArea, Message, MessageArea, Title, Wrapper } from './Toast.style';
import theme from 'style/theme.style';

const icons: Record<ToastItem['type'], JSX.Element> = {
  info: <SvgIcons color={theme.color.background} icon="info-circle" aria-label="정보 알림" />,
  success: <SvgIcons color={theme.color.background} icon="check-circle" aria-label="성공 알림" />,
  warning: <SvgIcons color={theme.color.background} icon="warning" aria-label="경고 알림" />,
  error: <SvgIcons color={theme.color.background} icon="close-circle" aria-label="실패 알림" />,
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
