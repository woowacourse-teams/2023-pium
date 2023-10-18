import { useEffect, useRef } from 'react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button, Roof, Wrapper } from './Navbar.style';
import { isShowPageLoadingState } from 'store/atoms/@common';
import useAddToast from 'hooks/@common/useAddToast';
import useChildrenLeftPositions from 'hooks/@common/useChildrenLeftPositions';
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

const getRoofPosition = (pathname: string) => {
  switch (pathname) {
    case URL_PATH.main:
      return 1;
    case URL_PATH.garden:
      return 2;
    case URL_PATH.reminder:
      return 3;
    case URL_PATH.petList:
      return 4;
    case URL_PATH.myPage:
      return 5;
    default:
      return null;
  }
};

const getAnimationOffset = (prevPathname: string, currentPathname: string, positions: number[]) => {
  const prevRoofPosition = getRoofPosition(prevPathname);
  const roofPosition = getRoofPosition(currentPathname);

  const transitionOffset =
    roofPosition && prevRoofPosition
      ? positions[prevRoofPosition - 1] - positions[roofPosition - 1]
      : 0;

  return transitionOffset;
};

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const navBar = useRef<HTMLElement>(null);

  const isPageLoading = useRecoilValue(isShowPageLoadingState);

  const addToast = useAddToast();
  const { isSuccess: isLoggedIn } = useCheckSessionId(false);
  const navItemPositions = useChildrenLeftPositions(navBar);

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

  const prevPathname = state ? state.prevPathname ?? pathname : pathname;

  const isActive = (targetPathname: string) =>
    isPageLoading ? targetPathname === prevPathname : targetPathname === pathname;
  const hideNavbar = matchRoutes(NO_NAVIGATION_BAR_URLS, pathname) !== null;
  const roofPosition = getRoofPosition(pathname);
  const transitionOffset = !isPageLoading
    ? getAnimationOffset(prevPathname, pathname, navItemPositions)
    : 0;
  const newHistoryState = { prevPathname: pathname };

  return (
    <Wrapper ref={navBar} $hide={hideNavbar}>
      <Button as={Link} to={URL_PATH.main} state={newHistoryState}>
        <NavItem isActive={isActive(URL_PATH.main)} iconId="home-line" label="메인" />
      </Button>
      <Button as={Link} to={URL_PATH.garden} state={newHistoryState}>
        <NavItem
          isActive={isActive(URL_PATH.garden)}
          iconId="bulletin-board-line"
          label="모두의 정원"
        />
      </Button>
      {isLoggedIn ? (
        <>
          <Button as={Link} to={URL_PATH.reminder} state={newHistoryState}>
            <NavItem isActive={isActive(URL_PATH.reminder)} iconId="reminder" label="리마인더" />
          </Button>
          <Button as={Link} to={URL_PATH.petList} state={newHistoryState}>
            <NavItem isActive={isActive(URL_PATH.petList)} iconId="leaf" label="내 식물" />
          </Button>
          <Button as={Link} to={URL_PATH.myPage} state={newHistoryState}>
            <NavItem
              isActive={isActive(URL_PATH.myPage)}
              iconId="account-circle-line"
              label="마이페이지"
            />
          </Button>
        </>
      ) : (
        <>
          <Button type="button" onClick={askLogin}>
            <NavItem isActive={isActive(URL_PATH.reminder)} iconId="reminder" label="리마인더" />
          </Button>
          <Button type="button" onClick={askLogin}>
            <NavItem isActive={isActive(URL_PATH.petList)} iconId="leaf" label="내 식물" />
          </Button>
          <Button as={Link} to={URL_PATH.login} state={newHistoryState}>
            <NavItem
              isActive={isActive(URL_PATH.login)}
              iconId="account-circle-line"
              label="로그인"
            />
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
