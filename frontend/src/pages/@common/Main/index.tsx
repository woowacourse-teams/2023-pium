import { useState } from 'react';
import InstallPrompt from 'components/@common/InstallPrompt';
import Navbar from 'components/@common/Navbar';
import PageLogger from 'components/@common/PageLogger';
import SearchBox from 'components/search/SearchBox';
import { LogoMessage, SearchBoxArea, SearchMessage, Wrapper, Image, ImageArea } from './Main.style';
import useDictionaryNavigate from 'hooks/dictionaryPlant/useDictionaryPlantNavigate';
import LogoSvg from 'assets/logo.svg';
import LogoWebp from 'assets/logo.webp';

const Main = () => {
  const { goToProperDictionaryPlantPage, goToDictionaryPlantDetailPage } = useDictionaryNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <PageLogger>
      <InstallPrompt />

      <Wrapper>
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
      </Wrapper>
      <Navbar />
    </PageLogger>
  );
};

export default Main;
