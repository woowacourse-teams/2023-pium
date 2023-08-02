import Navbar from 'components/@common/Navbar';
import SearchBox from 'components/SearchBox';
import {
  LinkContent,
  Logo,
  LogoMessage,
  SearchBoxArea,
  SearchMessage,
  StyledLink,
  Wrapper,
} from './Main.style';
import useDictionaryNavigate from 'hooks/useDictrionaryNavigate';
import { URL_PATH } from 'constants/index';
import logo from 'assets/logo.svg';

const Main = () => {
  const { goToProperDictPage, goToDictDetailPage } = useDictionaryNavigate();

  return (
    <>
      <Wrapper>
        {/* <StyledLink to={URL_PATH.main}>
          <LinkContent>시작하기</LinkContent>
        </StyledLink> */}
        <LogoMessage>식물을 쉽게</LogoMessage>
        <Logo src={logo} alt="logo" />
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
