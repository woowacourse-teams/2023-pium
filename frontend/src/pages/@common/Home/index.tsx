import { useState } from 'react';
import InstallPrompt from 'components/@common/InstallPrompt';
import PageLogger from 'components/@common/PageLogger';
import SearchBox from 'components/search/SearchBox';
import { LogoMessage, SearchBoxArea, SearchMessage, Main, Image, ImageArea } from './Home.style';
import useDictionaryNavigate from 'hooks/dictionaryPlant/useDictionaryPlantNavigate';
import LogoSvg from 'assets/logo.svg';
import LogoWebp from 'assets/logo.webp';

const Home = () => {
  const { goToProperDictionaryPlantPage, goToDictionaryPlantDetailPage } = useDictionaryNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <PageLogger>
      <InstallPrompt />
      <Main>
        <LogoMessage>식물을 쉽게</LogoMessage>
        <ImageArea>
          <picture>
            <source srcSet={LogoWebp} type="image/webp" />
            <Image src={LogoSvg} alt="피움 로고. 녹색으로 '피움'이라는 글자가 적혀 있다." />
          </picture>
        </ImageArea>
        <SearchBoxArea>
          <SearchBox
            value={searchValue}
            onChangeValue={setSearchValue}
            onEnter={goToProperDictionaryPlantPage}
            onNextClick={goToProperDictionaryPlantPage}
            onResultClick={goToDictionaryPlantDetailPage}
          />
        </SearchBoxArea>
        <SearchMessage>피움에 등록된 식물을 검색해 보세요!</SearchMessage>
      </Main>
    </PageLogger>
  );
};

export default Home;
