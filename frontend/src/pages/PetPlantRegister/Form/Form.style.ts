import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

export const Header = styled.header`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.fixed};
  top: 0;

  display: flex;
  align-items: center;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 48px;
  padding: 0 16px;

  background-color: ${(props) => props.theme.color.background};
  box-shadow: 0 2px 2px -2px ${(props) => props.theme.color.gray};
`;

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 2rem;
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

export const DictionaryPlantButton = styled.button`
  display: flex;
  align-items: center;

  margin-top: 12px;

  font-size: 1.6rem;
  color: ${(props) => props.theme.color.sub};

  & > * + * {
    margin-left: 4px;
  }
`;

export const DictionaryPlantImageArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 32px 0;
`;

export const AddImageButton = css`
  position: absolute;
  right: 0;
  bottom: 0;
  svg {
    width: 35px;
    height: 35px;
  }
`;
