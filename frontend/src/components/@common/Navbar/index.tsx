import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SvgIcons from 'components/@common/SvgIcons';
import { NavItem, NavItemArea, NavLabel, NavLink, Wrapper } from './Navbar.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

interface IconParams {
  color: string;
  size: number;
}

const Navbar = () => {
  const { pathname } = useLocation();
  const { isSuccess: isLoggedIn } = useCheckSessionId(false);
  const { color: fillColor } = theme;
  const navItems = useMemo(() => {
    return [
      {
        path: URL_PATH.main,
        label: '메인',
        Icon: ({ color, size }: IconParams) => <SvgIcons color={color} size={size} icon="home" />,
      },
      {
        path: URL_PATH.garden,
        label: '모두의 정원',
        Icon: ({ color, size }: IconParams) => (
          <SvgIcons color={color} size={size} icon="bulletin-board" />
        ),
      },
      {
        path: URL_PATH.reminder,
        label: '리마인더',
        Icon: ({ color, size }: IconParams) => (
          <SvgIcons color={color} size={size} icon="reminder" />
        ),
      },
      {
        path: URL_PATH.petList,
        label: '내 식물',
        Icon: ({ color, size }: IconParams) => <SvgIcons color={color} size={size} icon="leaf" />,
      },
      {
        path: isLoggedIn ? URL_PATH.myPage : URL_PATH.login,
        label: isLoggedIn ? '마이페이지' : '로그인',
        Icon: ({ color, size }: IconParams) => (
          <SvgIcons color={color} size={size} icon="account-circle" />
        ),
      },
    ];
  }, [isLoggedIn]);

  return (
    <Wrapper>
      {navItems.map(({ path, label, Icon }, index) => {
        const active = pathname === path;
        const color = active ? fillColor.fontPrimaryForBackground : theme.color.grayDark;
        const navIcon = Icon({ color, size: 24 });

        return (
          <NavLink key={index} to={path}>
            <NavItemArea $active={active}>
              <NavItem>
                {navIcon}
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
