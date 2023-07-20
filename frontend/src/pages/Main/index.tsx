import { CgEnter } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import SearchBox from 'components/SearchBox';
import {
  ButtonArea,
  Logo,
  LogoMessage,
  SearchBoxArea,
  SearchMessage,
  StartButton,
  Wrapper,
} from './Main.style';
import { URL_PATH } from 'constants/index';
import logo from 'assets/logo.svg';

const Main = () => {
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate(URL_PATH.PET_REGISTER_SEARCH);
  };

  return (
    <Wrapper>
      <ButtonArea>
        <StartButton onClick={navigateRegister}>
          시작하기
          <CgEnter />
        </StartButton>
      </ButtonArea>
      <LogoMessage>식물을 쉽게</LogoMessage>
      <Logo src={logo} alt="logo" />
      <SearchMessage>피움에 등록된 식물을 검색해 보세요!</SearchMessage>
      <SearchBoxArea>
        <SearchBox />
      </SearchBoxArea>
    </Wrapper>
  );
};

export default Main;
