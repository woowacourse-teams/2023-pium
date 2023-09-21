import { styled } from 'styled-components';

export const Main = styled.main`
  position: relative;

  width: 100%;
  height: calc(100% - 90px);
  margin-bottom: 70px;
  padding: 8px;
`;

export const List = styled.ul`
  margin-top: 24px;

  & > li + li {
    margin-top: 48px;
  }
`;

export const FixedButtonArea = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
`;

export const FixedButton = styled.button`
  position: absolute;
  right: 24px;
  bottom: 76px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  background-color: ${(props) => props.theme.color.primary};
  border-radius: 28px;
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
