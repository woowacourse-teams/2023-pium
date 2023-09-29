import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SvgStroke from 'components/@common/SvgIcons/SvgStroke';
import { NavItem, NavItemArea, NavLabel, NavButton, Wrapper } from './Navbar.style';
import useAddToast from 'hooks/@common/useAddToast';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const addToast = useAddToast();

  const { isSuccess: isLoggedIn } = useCheckSessionId(false);
  const { color: fillColor } = theme;
  const navItems = useMemo(
    () =>
      [
        {
          path: URL_PATH.main,
          label: '메인',
          iconId: 'home-line',
          needLoggedIn: false,
        },
        {
          path: URL_PATH.garden,
          label: '모두의 정원',
          iconId: 'bulletin-board-line',
          needLoggedIn: false,
        },
        {
          path: URL_PATH.reminder,
          label: '리마인더',
          iconId: 'reminder',
          needLoggedIn: true,
        },
        {
          path: URL_PATH.petList,
          label: '내 식물',
          iconId: 'leaf',
          needLoggedIn: true,
        },
        {
          path: isLoggedIn ? URL_PATH.myPage : URL_PATH.login,
          label: isLoggedIn ? '마이페이지' : '로그인',
          iconId: 'account-circle-line',
          needLoggedIn: false,
        },
      ] as const,
    [isLoggedIn]
  );

  return (
    <Wrapper>
      {navItems.map(({ path, label, iconId, needLoggedIn }, index) => {
        const active = pathname === path;
        const color = active ? fillColor.fontPrimaryForBackground : theme.color.subLight;

        const askLogin = () => {
          addToast({
            type: 'info',
            message: '로그인 후 이용할 수 있어요',
            time: 1800,
            buttonContent: '로그인',
            onClickButton: () => {
              navigate(URL_PATH.login);
            },
          });
        };

        const goPath = () => {
          navigate(path);
        };

        return (
          <NavButton key={index} onClick={needLoggedIn && !isLoggedIn ? askLogin : goPath}>
            <NavItemArea $active={active}>
              <NavItem>
                <SvgStroke color={color} size={24} icon={iconId} />
                <NavLabel $active={active}>{label}</NavLabel>
              </NavItem>
            </NavItemArea>
          </NavButton>
        );
      })}
    </Wrapper>
  );
};

export default Navbar;
