import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import PageLogger from 'components/@common/PageLogger';
import SearchBox from 'components/search/SearchBox';
import SearchResults from 'components/search/SearchResults';
import { Title, Wrapper } from './DictionaryPlantSearch.style';
import useDictionaryNavigate from 'hooks/dictionaryPlant/useDictionaryPlantNavigate';

const DictionarySearch = () => {
  const [params] = useSearchParams();
  const search = params.get('search') ?? '';

  const { goToProperDictionaryPlantPage, goToDictionaryPlantDetailPage } = useDictionaryNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <PageLogger>
      <Wrapper>
        <SearchBox
          value={searchValue}
          onChangeValue={setSearchValue}
          onEnter={goToProperDictionaryPlantPage}
          onNextClick={goToProperDictionaryPlantPage}
          onResultClick={goToDictionaryPlantDetailPage}
        />
        <Title>&quot;{search}&quot; 검색 결과</Title>
        <SearchResults plantName={search} />
      </Wrapper>
      <Navbar />
    </PageLogger>
  );
};

export default DictionarySearch;
