import { InputStatus } from 'types/inputs';
import { styled } from 'styled-components';
import theme from 'style/theme.style';

interface ContentBoxProps {
  status: InputStatus;
}

const getColor = (status: InputStatus) => {
  switch (status) {
    case 'default':
      return theme.color.gray;
    case 'error':
      return theme.color.accent;
    case 'focus':
      return theme.color.primary;

    default:
      return theme.color.gray;
  }
};

export const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const ContentBox = styled.div<ContentBoxProps>`
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: solid 2px ${(props) => getColor(props.status)};

  &:focus {
    border-bottom: solid 2px #333333;
  }
`;

export const RequireFlag = styled.span`
  color: ${(props) => props.theme.color.accent};
`;

export const Title = styled.p`
  margin-bottom: 8px;
  font: 500 1.4rem/1.7rem 'GmarketSansMedium';
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorMessage = styled.span`
  font: 400 1.2rem/1.7rem 'GmarketSansMedium';
  color: ${(props) => props.theme.color.accent};
`;
