import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Wrapper = styled.nav`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.fixed};
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  max-width: ${(props) => props.theme.width.pad};
  height: 60px;
  padding: 0 8px;

  background: white;
  box-shadow: 0 -1px 1px -1px ${(props) => props.theme.color.subLight};
`;

export const NavLink = styled(Link)`
  height: 100%;
`;

export const NavButton = styled.button`
  height: 100%;
`;

export const NavItemArea = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 100%;

  border-top: solid 2px
    ${({ $active, theme: { color } }) => ($active ? color.fontPrimaryForBackground : 'transparent')};
  border-bottom: solid 2px transparent;
`;

export const NavItemCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 48px;
`;

export const NavLabel = styled.p<{ $active?: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: ${({ $active, theme: { color } }) =>
    $active ? color.fontPrimaryForBackground : color.subLight};
`;
