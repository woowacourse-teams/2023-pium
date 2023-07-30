import { keyframes, styled } from 'styled-components';
import { ToastType } from '.';

const show = keyframes`
0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const hide = keyframes`
0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Wrapper = styled.div<{ type: ToastType; visible: boolean }>`
  display: flex;
  align-items: center;

  width: max-content;
  height: max-content;
  padding: 8px;

  color: white;

  background: ${({ type, theme }) =>
    ({
      info: theme.color.primary,
      success: '#3fa2ed',
      warning: '#ec9b40',
      error: theme.color.accent,
    }[type])};
  border-radius: 8px;
  box-shadow: 0 0 8px ${(p) => p.theme.color.sub + '33'};

  animation: ${({ visible }) => (visible ? show : hide)} 0.3s ease-out alternate;
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

  font-size: 2rem;
  font-weight: 900;
  vertical-align: center;
`;

export const Message = styled.p`
  width: 100%;
  font-size: 1.8rem;
  font-weight: 600;
`;

export const ToastListWrapper = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
