import { CgEnter } from 'react-icons/cg';
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
import logo from 'assets/logo.svg';

const Main = () => {
  return (
    <Wrapper>
      <ButtonArea>
        <StartButton>
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
