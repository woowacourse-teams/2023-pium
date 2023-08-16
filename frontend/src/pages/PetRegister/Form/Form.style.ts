import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Header = styled.header`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.fixed};
  top: 0;

  display: flex;
  align-items: center;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 48px;
  padding: 0 24px;

  background-color: ${(props) => props.theme.color.background};
  box-shadow: 0 2px 2px -2px ${(props) => props.theme.color.gray};
`;

export const BackLink = styled(Link)`
  font-size: 3rem;
  color: ${(props) => props.theme.color.sub};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 64px 16px;
`;

export const DictionaryPlantName = styled.p`
  font-size: 3rem;
`;

export const DictionaryPlantImageArea = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
`;
