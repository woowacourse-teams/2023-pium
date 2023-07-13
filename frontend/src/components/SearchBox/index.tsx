import { useRef, useState } from 'react';
import { BiSearch, BiRightArrowAlt } from 'react-icons/bi';
import { NO_SEARCH_RESULT_MESSAGE } from '../../constants';
import {
  InputArea,
  ResultItem,
  ResultList,
  ResultThumbnail,
  Wrapper,
  Name,
  EnterButton,
  Input,
  ResultMessage,
} from './SearchBox.style';

type SearchResult = any;

interface GetSearch {
  data: SearchResult[] 
}

const getSearch = async (name: string): Promise<GetSearch> => {
  const response = await fetch(`search?name=${name}`);
  return await response.json();
};

const SearchBox = () => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const timeoutId = useRef<number>();

  const searchInputValue = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(value);

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      search(value);
    }, 150);
  };

  const enter = async ({ key }: React.KeyboardEvent) => {
    if (key !== 'Enter') return;

    search(searchName);
  };

  const search = async (name: string) => {
    if (name === '') return;

    try {
      const { data: searchResults } = await getSearch(name);
      setSearchResults(searchResults);
    } catch {
      return;
    }
  };

  return (
    <Wrapper>
      <InputArea>
        <BiSearch size="32" color="#1bcc66" />
        <Input type="text" value={searchName} onChange={searchInputValue} onKeyDown={enter} />
        <EnterButton type="button" onClick={search}>
          <BiRightArrowAlt size="32" color="#333333" />
        </EnterButton>
      </InputArea>
      {searchResults !== null &&
        (searchResults.length === 0 ? (
          <ResultMessage>{NO_SEARCH_RESULT_MESSAGE}</ResultMessage>
        ) : (
          <ResultList>
            {searchResults.map(({ id, name, image }) => (
              <ResultItem key={id}>
                <ResultThumbnail src={image} />
                <Name>{name}</Name>
              </ResultItem>
            ))}
          </ResultList>
        ))}
    </Wrapper>
  );
};

export default SearchBox;
