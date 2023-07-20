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
import dictionaryPlantsAPI from 'apis/dictionaryPlants';
import { MESSAGE } from 'constants/index';

interface SearchBoxProps {
  onSelect?: (id: number) => void;
}

const SearchBox = ({ onSelect }: SearchBoxProps) => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState<DictNameSearchResult[] | null>(null);
  const timeoutId = useRef(0);

  const changeSearch: React.ComponentProps<'input'>['onChange'] = ({ target: { value } }) => {
    setSearchName(value);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      search(value);
      timeoutId.current = 0;
    }, 150);
  };

  const enterSearch: React.ComponentProps<'input'>['onKeyDown'] = ({ key }) => {
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
      const response = await dictionaryPlantsAPI.getSearch(name);
      if (!response.ok) throw new Error();

      const { data: searchResults } = await response.json();
      setSearchResults(searchResults);
    } catch {
      return;
    }
  };

  const selectResultItem = (id: number) => () => {
    onSelect?.(id);
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
        (searchResults.length ? (
          <ResultList>
            {searchResults.map(({ id, name, image }) => (
              <ResultItem key={id} onClick={selectResultItem(id)}>
                <ResultThumbnail alt={name} src={image} />
                <Name>{name}</Name>
              </ResultItem>
            ))}
          </ResultList>
        ) : (
          <ResultMessage>{MESSAGE.noSearchResult}</ResultMessage>
        ))}
    </Wrapper>
  );
};

export default SearchBox;
