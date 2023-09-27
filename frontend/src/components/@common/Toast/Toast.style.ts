import { ToastItem } from 'types/@common';
import { keyframes, styled } from 'styled-components';
import theme from 'style/theme.style';

const toastBackgroundColors: Record<ToastItem['type'], string> = {
  info: theme.color.primary,
  success: '#3fa2ed',
  warning: '#ec9b40',
  error: theme.color.accent,
};

const show = keyframes`
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const hide = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50%);
  }
`;

export const Wrapper = styled.div<{ $type: ToastItem['type']; $visible: boolean }>`
  display: flex;
  align-items: center;

  width: max-content;
  height: max-content;
  padding: 8px;

  color: #ffffff;

  background: ${({ $type }) => toastBackgroundColors[$type]};
  border-radius: 8px;
  box-shadow: 0 0 8px ${(p) => p.theme.color.sub + '33'};

  animation: ${({ $visible }) => ($visible ? show : hide)} 0.2s ease-out alternate;
`;

export const IconArea = styled.div`
  margin-right: 4px;

  & > * {
    width: 2rem;
    height: 2rem;
  }
`;

export const MessageArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.p`
  width: 100%;
  margin-bottom: 8px;
  font: 900 2rem/2.4rem NanumSquareRound;
  vertical-align: center;
`;

export const Message = styled.p`
  width: 100%;
  font: 600 1.8rem/2.2rem NanumSquareRound;
`;

export const ToastListWrapper = styled.div`
  position: fixed;
  z-index: ${({ theme: { zIndex } }) => zIndex.popover};
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
