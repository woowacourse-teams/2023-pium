import { createPortal } from 'react-dom';
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
  AiOutlineWarning,
} from 'react-icons/ai';
import { styled } from 'styled-components';

type ToastType = 'info' | 'success' | 'warning' | 'error';

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

const Wrapper = styled.div<Pick<ToastProps, 'type'>>`
  position: absolute;
  top: 10%;

  display: flex;

  width: max-content;
  height: max-content;
  padding: 24px;
  padding-right: 32px;

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
`;

const IconArea = styled.div`
  margin-right: 12px;

  & > * {
    width: 2rem;
    height: 2rem;
  }
`;

const MessageArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p`
  width: 100%;
  margin-bottom: 8px;

  font-size: 2rem;
  font-weight: 900;
  vertical-align: center;
`;

const Message = styled.p`
  width: 100%;
  font-size: 1.8rem;
  font-weight: 600;
`;
