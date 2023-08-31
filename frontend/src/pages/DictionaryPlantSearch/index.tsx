import { useSearchParams } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import SearchBox from 'components/search/SearchBox';
import SearchResults from 'components/search/SearchResults';
import { Title, Wrapper } from './DictionaryPlantSearch.style';
import useDictionaryNavigate from 'hooks/useDictrionaryNavigate';

const DictionarySearch = () => {
  const [params] = useSearchParams();
  const search = params.get('search') ?? '';

  const { goToProperDictPage, goToDictDetailPage } = useDictionaryNavigate();

  return (
    <>
      <Wrapper>
        <SearchBox
          onEnter={goToProperDictPage}
          onNextClick={goToProperDictPage}
          onResultClick={goToDictDetailPage}
        />
        <Title>&quot;{search}&quot; 검색 결과</Title>
        <SearchResults plantName={search} />
      </Wrapper>
      <Navbar />
    </>
  );
};

export default DictionarySearch;
