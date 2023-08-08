import { styled } from 'styled-components';
import theme from 'style/theme.style';

const Title = styled.p`
  display: inline-flex;
  column-gap: 10px;
  align-items: center;

  font-size: 1.8rem;
  color: ${theme.color.sub};
`;

export default Title;
