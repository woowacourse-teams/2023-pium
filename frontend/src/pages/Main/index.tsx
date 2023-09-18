import Navbar from 'components/@common/Navbar';
import SearchBox from 'components/search/SearchBox';
import { LogoMessage, SearchBoxArea, SearchMessage, Wrapper, Image } from './Main.style';
import useDictionaryNavigate from 'hooks/useDictionaryNavigate';
import LogoSvg from 'assets/logo.svg';
import LogoWebp from 'assets/logo.webp';

const Main = () => {
  const { goToProperDictionaryPlantPage, goToDictionaryPlantDetailPage } = useDictionaryNavigate();

  return (
    <>
      <Wrapper>
        <LogoMessage>식물을 쉽게</LogoMessage>
        <picture>
          <source srcSet={LogoWebp} type="image/webp" />
          <Image
            width={192}
            height={174}
            src={LogoSvg}
            alt="피움 로고. 녹색으로 '피움'이라는 글자가 적혀 있다."
          />
        </picture>
        <SearchMessage>피움에 등록된 식물을 검색해 보세요!</SearchMessage>
        <SearchBoxArea>
          <SearchBox
            onEnter={goToProperDictionaryPlantPage}
            onNextClick={goToProperDictionaryPlantPage}
            onResultClick={goToDictionaryPlantDetailPage}
          />
        </SearchBoxArea>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default Main;
