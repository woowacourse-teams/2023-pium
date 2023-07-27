import { styled } from 'styled-components';
import { ToastType } from '.';

export const Wrapper = styled.div<{ type: ToastType }>`
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

export const IconArea = styled.div`
  margin-right: 12px;

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
