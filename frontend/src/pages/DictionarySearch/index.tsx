import { useSearchParams } from 'react-router-dom';
import SearchBox from 'components/SearchBox';
import SearchResults from 'components/SearchResults';
import { Title, Wrapper } from './DictionarySearch.style';
import useDictionaryNavigate from 'hooks/useDictrionaryNavigate';

const DictionarySearch = () => {
  const [params] = useSearchParams();
  const search = params.get('search') ?? '';

  const { goToProperDictPage, goToDictDetailPage } = useDictionaryNavigate();

  return (
    <Wrapper>
      <SearchBox
        onEnter={goToProperDictPage}
        onNextClick={goToProperDictPage}
        onResultClick={goToDictDetailPage}
      />
      <Title>&quot;{search}&quot; 검색 결과</Title>
      <SearchResults plantName={search} />
    </Wrapper>
  );
};

export default DictionarySearch;
