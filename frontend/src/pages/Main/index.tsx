import SearchBox from 'components/SearchBox';
import { Logo, Wrapper } from './Main.style';
import logo from 'assets/logo.svg';

const Main = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt="logo" />
      <SearchBox />
    </Wrapper>
  );
};

export default Main;
