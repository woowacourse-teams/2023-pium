import { styled } from 'styled-components';
import theme from 'style/theme.style';
import type { InputStatus } from '.';

interface ContentBoxProps {
  status: InputStatus;
}

const colorMap = {
  default: theme.color.gray,
  error: theme.color.accent,
  focus: theme.color.primary,
};

export const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const ContentBox = styled.div<ContentBoxProps>`
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: solid 2px ${(props) => colorMap[props.status]};

  &:focus {
    border-bottom: solid 2px #333333;
  }
`;

export const RequireFlag = styled.span`
  color: ${(props) => props.theme.color.accent};
`;

export const Title = styled.p`
  margin-bottom: 16px;
  font: 500 1.4rem/1.7rem 'GmarketSans';
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  font: 400 1.2rem/1.7rem 'GmarketSans';
  color: ${(props) => props.theme.color.accent};
`;
