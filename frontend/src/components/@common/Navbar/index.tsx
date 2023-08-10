import { useLocation } from 'react-router-dom';
import Home from 'components/@common/Icons/Home';
import Plant from 'components/@common/Icons/Plant';
import Reminder from 'components/@common/Icons/Reminder';
import { NavItem, NavItemArea, NavLabel, NavLink, Wrapper } from './Navbar.style';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

const navItems = [
  {
    path: URL_PATH.main,
    label: '메인',
    Icon: Home,
  },
  {
    path: URL_PATH.reminder,
    label: '리마인더',
    Icon: Reminder,
  },
  {
    path: URL_PATH.petList,
    label: '내 식물',
    Icon: Plant,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      {navItems.map(({ path, label, Icon }, index) => {
        const active = pathname === path;
        return (
          <NavLink key={index} to={path}>
            <NavItemArea $active={active}>
              <NavItem>
                <Icon aria-hidden stroke={active ? theme.color.primary : '#888888'} />
                <NavLabel $active={active}>{label}</NavLabel>
              </NavItem>
            </NavItemArea>
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default Navbar;
