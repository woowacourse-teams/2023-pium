import { useNavigate } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
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
import useDictionaryNavigate from 'hooks/useDictrionaryNavigate';
import { URL_PATH } from 'constants/index';
import logo from 'assets/logo.svg';

const Main = () => {
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate(URL_PATH.petRegisterSearch);
  };

  const { goToProperDictPage, goToDictDetailPage } = useDictionaryNavigate();

  return (
    <>
      <Wrapper>
        <ButtonArea>
          <StartButton type="button" onClick={navigateRegister}>
            시작하기
          </StartButton>
        </ButtonArea>
        <LogoMessage>식물을 쉽게</LogoMessage>
        <Logo src={logo} alt="피움 로고. 녹색으로 '피움'이라는 글자가 적혀 있다." />
        <SearchMessage>피움에 등록된 식물을 검색해 보세요!</SearchMessage>
        <SearchBoxArea>
          <SearchBox
            onEnter={goToProperDictPage}
            onNextClick={goToProperDictPage}
            onResultClick={goToDictDetailPage}
          />
        </SearchBoxArea>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default Main;
