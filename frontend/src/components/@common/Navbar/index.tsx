import { useLocation, useNavigate } from 'react-router-dom';
import SvgStroke, { ICONS } from 'components/@common/SvgIcons/SvgStroke';
import { NavItemCenter, NavItemArea, NavLabel, NavButton, Wrapper, NavLink } from './Navbar.style';
import useAddToast from 'hooks/@common/useAddToast';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const addToast = useAddToast();

  const { isSuccess: isLoggedIn } = useCheckSessionId(false);

  const goLogin = () => {
    navigate(URL_PATH.login);
  };

  const askLogin = () => {
    addToast({
      type: 'info',
      message: '로그인 후 이용할 수 있어요',
      time: 3000,
      buttonContent: '로그인',
      onClickButton: goLogin,
    });
  };

  const NavItem = (props: { path: string; iconId: (typeof ICONS)[number]; label: string }) => {
    const { path, iconId, label } = props;
    const active = path === location.pathname;
    const iconColor = active ? theme.color.fontPrimaryForBackground : theme.color.subLight;

    return (
      <NavItemArea $active={active}>
        <NavItemCenter>
          <SvgStroke color={iconColor} size={24} icon={iconId} />
          <NavLabel $active={active}>{label}</NavLabel>
        </NavItemCenter>
      </NavItemArea>
    );
  };

  return (
    <Wrapper>
      <NavLink to={URL_PATH.main}>
        <NavItem path={URL_PATH.main} iconId="home-line" label="메인" />
      </NavLink>
      <NavLink to={URL_PATH.garden}>
        <NavItem path={URL_PATH.garden} iconId="bulletin-board-line" label="모두의 정원" />
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to={URL_PATH.reminder}>
            <NavItem path={URL_PATH.reminder} iconId="reminder" label="리마인더" />
          </NavLink>
          <NavLink to={URL_PATH.petList}>
            <NavItem path={URL_PATH.petList} iconId="leaf" label="내 식물" />
          </NavLink>
          <NavLink to={URL_PATH.myPage}>
            <NavItem path={URL_PATH.myPage} iconId="account-circle-line" label="마이페이지" />
          </NavLink>
        </>
      ) : (
        <>
          <NavButton onClick={askLogin}>
            <NavItem path={URL_PATH.reminder} iconId="reminder" label="리마인더" />
          </NavButton>
          <NavButton onClick={askLogin}>
            <NavItem path={URL_PATH.petList} iconId="leaf" label="내 식물" />
          </NavButton>
          <NavLink to={URL_PATH.login}>
            <NavItem path={URL_PATH.login} iconId="account-circle-line" label="로그인" />
          </NavLink>
        </>
      )}
    </Wrapper>
  );
};

export default Navbar;
