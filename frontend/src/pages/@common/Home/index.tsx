import { useState } from 'react';
import { Link } from 'react-router-dom';
import InstallPrompt from 'components/@common/InstallPrompt';
import Navbar from 'components/@common/Navbar';
import PageLogger from 'components/@common/PageLogger';
import SearchBox from 'components/search/SearchBox';
import {
  LogoMessage,
  SearchBoxArea,
  SearchMessage,
  Main,
  Image,
  ImageArea,
  Footer,
} from './Home.style';
import useDictionaryNavigate from 'hooks/dictionaryPlant/useDictionaryPlantNavigate';
import { URL_PATH } from 'constants/index';
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
      <Footer>
        <Link to={URL_PATH.privacy}>개인정보 처리 방침</Link>
        <p>
          contact:<a href={`mailto: easyplantscheduler@gmail.com`}> easyplantscheduler@gmail.com</a>
        </p>
        <p>©️ 피움 All rights reserved</p>
      </Footer>
      <Navbar />
    </PageLogger>
  );
};

export default Home;
