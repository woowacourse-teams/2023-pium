import type { ToastItem } from 'types/@common';
import { memo, useEffect, useState, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import {
  IconArea,
  InteractionButton,
  LeftArea,
  Message,
  ContentArea,
  CloseButton,
  Title,
  Wrapper,
  ProgressBar,
} from './Toast.style';
import { toastListState } from 'store/atoms/@common';
import theme from 'style/theme.style';

const icons: Record<ToastItem['type'], JSX.Element> = {
  info: <SvgFill color={theme.color.primary} icon="info-circle" aria-label="정보 알림" size={20} />,
  success: <SvgFill color="#3fa2ed" icon="check-circle" aria-label="성공 알림" size={20} />,
  warning: <SvgFill color="#ec9b40" icon="warning" aria-label="경고 알림" size={20} />,
  error: (
    <SvgFill color={theme.color.accent} icon="close-circle" aria-label="실패 알림" size={20} />
  ),
};

const Toast = (props: ToastItem) => {
  const { id, type, message, time = 2100, title, buttonContent, onClickButton } = props;

  const [toastList, setToastList] = useRecoilState(toastListState);
  const [visible, setVisible] = useState(true);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setToastList((prev) => prev.filter(({ id: toastId }) => toastId !== id));
    }, 200);
  }, []);

  const handleClickButton = () => {
    onClickButton?.();
    close();
  };

  useEffect(() => {
    setTimeout(close, time);
  }, [close, time]);

  return (
    <Wrapper
      role="alert"
      $type={type}
      $visible={visible}
      $isTop={toastList[toastList.length - 1].id === id}
    >
      <LeftArea>
        <IconArea>{icons[type]}</IconArea>
        <ContentArea>
          {title && <Title>{title}</Title>}
          <Message>{message}</Message>
          {buttonContent && (
            <InteractionButton type="button" onClick={handleClickButton}>
              {buttonContent}
            </InteractionButton>
          )}
        </ContentArea>
      </LeftArea>
      <CloseButton type="button" onClick={close}>
        <SvgFill size={16} icon="close" color={theme.color.sub} />
      </CloseButton>
      <ProgressBar $type={type} $time={time} />
    </Wrapper>
  );
};

export default memo(Toast);
