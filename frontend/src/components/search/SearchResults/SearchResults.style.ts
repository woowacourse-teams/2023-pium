import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  margin-bottom: 30px;
  padding: 10px;
`;

export const Title = styled.p`
  margin-bottom: 10px;
  font: ${({ theme }) => theme.font.dictTitle};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const StyledLink = styled(Link)`
  font-weight: normal;
  color: ${({ theme: { color } }) => color.primary};
  text-decoration: underline;
`;
