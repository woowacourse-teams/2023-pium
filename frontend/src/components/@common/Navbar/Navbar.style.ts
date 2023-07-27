import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Wrapper = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 68px;
  padding: 0 8px;

  background: white;
  box-shadow: 0 -4px 2px -2px ${(props) => props.theme.color.grayLight};
`;

export const NavLink = styled(Link)`
  height: 100%;
`;

export const NavItemArea = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 100%;

  border-top: solid 2px ${({ $active, theme }) => ($active ? theme.color.primary : 'transparent')};
  border-bottom: solid 2px transparent;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 44px;
`;

export const NavLabel = styled.p<{ $active?: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $active, theme: { color } }) => ($active ? color.primary : color.sub)};
`;
