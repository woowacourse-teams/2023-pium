import { styled } from 'styled-components';

export const HeaderBox = styled.section`
  display: flex;
  align-items: center;
  height: 72px;
  border-bottom: solid 1px ${(props) => props.theme.color.gray};
`;

export const Title = styled.p`
  width: 100%;
  font: normal 3.2rem /2.4rem 'NanumsquareRound';
  text-align: center;
`;

export const ContentBox = styled.section``;
