import { useSearchParams } from 'react-router-dom';
import SearchBox from 'components/SearchBox';
import SearchResults from 'components/SearchResults';
import { Wrapper } from './DictionarySearch.style';
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
      <SearchResults plantName={search} />
    </Wrapper>
  );
};

export default DictionarySearch;
