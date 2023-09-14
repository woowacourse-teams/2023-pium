import { styled } from 'styled-components';

export const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 8px;
`;

export const List = styled.ul`
  margin-top: 24px;

  & > li + li {
    margin-top: 48px;
  }
`;

export const Sensor = styled.div`
  position: absolute;
  bottom: 0;
  height: 8px;
  margin-bottom: 16px;
`;

export const Message = styled.p`
  display: flex;
  justify-content: center;

  margin-top: 32px;

  font-size: 1.4rem;
  color: ${(props) => props.theme.color.subLight};
`;
