import { useState } from 'react';
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
import useDebounce from 'hooks/useDebounce';
import { MESSAGE } from 'constants/index';
import Dictionary from '../../queries/dictionaryPlants';

const SearchBox = () => {
  const [searchName, setSearchName] = useState('');
  const queryName = useDebounce<string>(searchName, 200);

  const { data: searchResults } = Dictionary.useSearchName(queryName);

  const handleSearchNameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearchName(value);
  };

  const searchOnEnter: React.ComponentProps<'input'>['onKeyDown'] = ({ key }) => {
    if (key !== 'Enter') return;
    console.log('searching...');
  };

  const searchOnClick = () => {
    console.log('searching...');
  };

  return (
    <Wrapper>
      <InputArea>
        <BiSearch size="32" color="#1bcc66" />
        <Input
          type="text"
          value={searchName}
          onChange={handleSearchNameChange}
          onKeyDown={searchOnEnter}
        />
        <EnterButton type="button" onClick={searchOnClick}>
          <BiRightArrowAlt size="32" color="#333333" />
        </EnterButton>
      </InputArea>
      {searchResults &&
        searchName !== '' &&
        (searchResults.length ? (
          <ResultList>
            {searchResults.map(({ id, name, image }) => (
              <ResultItem key={id}>
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
