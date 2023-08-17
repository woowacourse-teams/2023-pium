import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AccountCircle from 'components/@common/Icons/AccountCircle';
import Home from 'components/@common/Icons/Home';
import Plant from 'components/@common/Icons/Plant';
import Reminder from 'components/@common/Icons/Reminder';
import { NavItem, NavItemArea, NavLabel, NavLink, Wrapper } from './Navbar.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

const Navbar = () => {
  const { pathname } = useLocation();
  const { isSuccess: isLoggedIn } = useCheckSessionId(false);

  const navItems = useMemo(() => {
    return [
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
      {
        path: isLoggedIn ? URL_PATH.myPage : URL_PATH.login,
        label: isLoggedIn ? '마이페이지' : '로그인',
        Icon: AccountCircle,
      },
    ];
  }, [isLoggedIn]);

  return (
    <Wrapper>
      {navItems.map(({ path, label, Icon }, index) => {
        const active = pathname === path;
        const color = active ? theme.color.primary : '#888888';
        return (
          <NavLink key={index} to={path}>
            <NavItemArea $active={active}>
              <NavItem>
                <Icon aria-hidden stroke={color} fill={color} />
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
