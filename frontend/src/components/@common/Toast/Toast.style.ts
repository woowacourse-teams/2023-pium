import { ToastItem } from 'types/@common';
import { keyframes, styled } from 'styled-components';
import theme from 'style/theme.style';

const toastBorderColors: Record<ToastItem['type'], string> = {
  info: theme.color.primary,
  success: '#3fa2ed',
  warning: '#ec9b40',
  error: theme.color.accent,
};

const show = keyframes`
  0% {
    opacity: 0.4;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const hide = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(50%);
  }
`;

export const Wrapper = styled.div<{
  $type: ToastItem['type'];
  $visible: boolean;
  $isTop: boolean;
}>`
  position: absolute;
  bottom: 0;
  transform: scale(${(props) => (props.$isTop ? '100%' : '98%')})
    translateY(${(props) => (props.$isTop ? '0' : '-4px')});

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 80%;
  max-width: ${(props) => props.theme.width.mobile};
  height: max-content;
  padding: 8px 16px;

  color: ${(props) => props.theme.color.sub};

  background-color: ${(props) => props.theme.color.background + 'ee'};
  backdrop-filter: blur(1px);
  border: solid 1px ${(props) => toastBorderColors[props.$type]};
  border-radius: 8px;

  transition: transform 0.2s;
  animation: ${(props) => (props.$visible ? show : hide)} 0.2s ease-out alternate;
`;

export const LeftArea = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;

  width: calc(100% - 32px);

  border-right: solid 1px ${(props) => props.theme.color.gray};
`;

export const IconArea = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 4px;

  & > * {
    width: 2rem;
    height: 2rem;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  width: 88%;
  padding: 4px 0;
`;

export const MessageArea = styled.div`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 600;
`;

export const InteractionButton = styled.button`
  width: max-content;
  max-width: 60%;
  margin-top: 8px;
  margin-right: 8px;
  padding: 4px 8px;

  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.6rem;

  border: solid 1px ${(props) => props.theme.color.gray};
  border-radius: 12px;
`;

export const CloseButton = styled.button`
  display: flex;
  align-self: flex-start;
`;

const fill = keyframes`
  0%    { transform: translateX(0); }
  100%  { transform: translateX(100%); }
`;

export const ProgressBar = styled.div<{ $type: ToastItem['type']; $time: number }>`
  position: absolute;
  bottom: 0;
  left: -100%;

  width: 100%;
  height: 3px;

  background-color: ${(props) => toastBorderColors[props.$type] + '99'};
  border-radius: 2px;

  animation: ${fill} ${(props) => props.$time}ms;
`;

export const ToastListWrapper = styled.div`
  position: fixed;
  z-index: ${({ theme: { zIndex } }) => zIndex.popover};
  bottom: 68px;

  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;

  width: 100%;
`;
