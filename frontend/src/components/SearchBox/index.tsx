import type { DictNameSearchResult } from 'types/api/dictionary';
import { useRef, useState } from 'react';
import { BiSearch, BiRightArrowAlt } from 'react-icons/bi';
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
import searchAPI from 'apis/search';
import { MESSAGE } from 'constants/index';

const SearchBox = () => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState<DictNameSearchResult[] | null>(null);
  const timeoutId = useRef(0);

  const changeSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(value);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      search(value);
      timeoutId.current = 0;
    }, 150);
  };

  const enterSearch = ({ key }: React.KeyboardEvent) => {
    if (key !== 'Enter') return;

    search(searchName);
  };

  const clickSearch = () => {
    search(searchName);
  };

  const search = async (name: string) => {
    if (name === '') {
      setSearchResults(null);
      return;
    }

    try {
      const response = await searchAPI.getResult(name);
      if (!response.ok) throw new Error();

      const { data: searchResults } = await response.json();
      setSearchResults(searchResults);
    } catch {
      return;
    }
  };

  return (
    <Wrapper>
      <InputArea>
        <BiSearch size="32" color="#1bcc66" />
        <Input type="text" value={searchName} onChange={changeSearch} onKeyDown={enterSearch} />
        <EnterButton type="button" onClick={clickSearch}>
          <BiRightArrowAlt size="32" color="#333333" />
        </EnterButton>
      </InputArea>
      {searchResults &&
        (searchResults.length === 0 ? (
          <ResultMessage>{MESSAGE.noSearchResult}</ResultMessage>
        ) : (
          <ResultList>
            {searchResults.map(({ id, name, image }) => (
              <ResultItem key={id}>
                <ResultThumbnail alt={name} src={image} />
                <Name>{name}</Name>
              </ResultItem>
            ))}
          </ResultList>
        ))}
    </Wrapper>
  );
};

export default SearchBox;
