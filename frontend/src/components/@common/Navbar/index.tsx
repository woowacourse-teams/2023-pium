import { Link, useNavigate } from 'react-router-dom';
import { NavButton, Wrapper } from './Navbar.style';
import useAddToast from 'hooks/@common/useAddToast';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { URL_PATH } from 'constants/index';
import NavItem from './NavItem';

const Navbar = () => {
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

  return (
    <Wrapper>
      <Button as={Link} to={URL_PATH.main}>
        <NavItem path={URL_PATH.main} iconId="home-line" label="메인" />
      </Button>
      <Button as={Link} to={URL_PATH.garden}>
        <NavItem path={URL_PATH.garden} iconId="bulletin-board-line" label="모두의 정원" />
      </Button>
      {isLoggedIn ? (
        <>
          <Button as={Link} to={URL_PATH.reminder}>
            <NavItem path={URL_PATH.reminder} iconId="reminder" label="리마인더" />
          </Button>
          <Button as={Link} to={URL_PATH.petList}>
            <NavItem path={URL_PATH.petList} iconId="leaf" label="내 식물" />
          </Button>
          <Button as={Link} to={URL_PATH.myPage}>
            <NavItem path={URL_PATH.myPage} iconId="account-circle-line" label="마이페이지" />
          </Button>
        </>
      ) : (
        <>
          <Button type="button" onClick={askLogin}>
            <NavItem path={URL_PATH.reminder} iconId="reminder" label="리마인더" />
          </Button>
          <Button type="button" onClick={askLogin}>
            <NavItem path={URL_PATH.petList} iconId="leaf" label="내 식물" />
          </Button>
          <Button as={Link} to={URL_PATH.login}>
            <NavItem path={URL_PATH.login} iconId="account-circle-line" label="로그인" />
          </Button>
        </>
      )}
    </Wrapper>
  );
};

export default Navbar;
