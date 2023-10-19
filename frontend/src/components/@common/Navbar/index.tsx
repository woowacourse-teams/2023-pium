import { useEffect } from 'react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Button, Roof, Wrapper } from './Navbar.style';
import useAddToast from 'hooks/@common/useAddToast';
import useNavbarRoofAnimation from 'hooks/@common/useNavbarRoofAnimation';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { URL_PATH } from 'constants/index';
import NavItem from './NavItem';

const NO_NAVIGATION_BAR_URLS = [
  URL_PATH.petRegisterForm,
  URL_PATH.dictDetail,
  URL_PATH.petEdit,
  URL_PATH.login,
  URL_PATH.authorization,
].map((path) => ({ path }));

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const addToast = useAddToast();
  const { isSuccess: isLoggedIn } = useCheckSessionId(false);
  const { navbarRef, roofPosition, transitionOffset } = useNavbarRoofAnimation(
    state ? state.prevPathname ?? pathname : pathname,
    pathname
  );

  useEffect(() => {
    const resetHistoryState = () => history.replaceState(null, '');
    window.addEventListener('beforeunload', resetHistoryState);
    return () => window.removeEventListener('beforeunload', resetHistoryState);
  }, []);

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

  const hideNavbar = matchRoutes(NO_NAVIGATION_BAR_URLS, pathname) !== null;
  const newHistoryState = { prevPathname: pathname };

  return (
    <Wrapper ref={navbarRef} $hide={hideNavbar}>
      <Button as={Link} to={URL_PATH.main} state={newHistoryState}>
        <NavItem isActive={roofPosition === 1} iconId="home-line" label="메인" />
      </Button>
      <Button as={Link} to={URL_PATH.garden} state={newHistoryState}>
        <NavItem isActive={roofPosition === 2} iconId="bulletin-board-line" label="모두의 정원" />
      </Button>
      {isLoggedIn ? (
        <>
          <Button as={Link} to={URL_PATH.reminder} state={newHistoryState}>
            <NavItem isActive={roofPosition === 3} iconId="reminder" label="리마인더" />
          </Button>
          <Button as={Link} to={URL_PATH.petList} state={newHistoryState}>
            <NavItem isActive={roofPosition === 4} iconId="leaf" label="내 식물" />
          </Button>
          <Button as={Link} to={URL_PATH.myPage} state={newHistoryState}>
            <NavItem
              isActive={roofPosition === 5}
              iconId="account-circle-line"
              label="마이페이지"
            />
          </Button>
        </>
      ) : (
        <>
          <Button type="button" onClick={askLogin}>
            <NavItem isActive={false} iconId="reminder" label="리마인더" />
          </Button>
          <Button type="button" onClick={askLogin}>
            <NavItem isActive={false} iconId="leaf" label="내 식물" />
          </Button>
          <Button as={Link} to={URL_PATH.login} state={newHistoryState}>
            <NavItem isActive={false} iconId="account-circle-line" label="로그인" />
          </Button>
        </>
      )}
      {roofPosition && (
        <Roof $position={roofPosition} $transitionOffset={transitionOffset} aria-hidden />
      )}
    </Wrapper>
  );
};

export default Navbar;
