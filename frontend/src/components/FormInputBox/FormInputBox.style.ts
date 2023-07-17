import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 4px;
  border-bottom: solid 2px ${(props) => props.theme.color.primary};
`;

export const RequireFlag = styled.span`
  color: ${(props) => props.theme.color.accent};
`;

export const Title = styled.p`
  margin-bottom: 8px;
  font: 500 1.4rem/1.7rem 'NanumSquareRound';
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
`;
