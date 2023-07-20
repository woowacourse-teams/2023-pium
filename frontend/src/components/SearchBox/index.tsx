import { useState } from 'react';
import { BiSearch, BiRightArrowAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
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

interface SearchBoxProps {
  onSelect?: (id: number) => void;
}

const SearchBox = ({ onSelect }: SearchBoxProps) => {
  const [searchName, setSearchName] = useState('');
  const queryName = useDebounce<string>(searchName, 200);
  const navigate = useNavigate();

  const { data: searchResults } = Dictionary.useSearchName(queryName);

  const handleSearchNameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearchName(value);
  };

  const search = () => {
    if (!searchName || !searchResults) return;

    const samePlant = searchResults.find(({ name }) => name === searchName);

    if (!samePlant) {
      navigate(`/dict?search=${searchName}`);
      return;
    }

    navigate(`/dict/${samePlant.id}`);
  };

  const searchOnEnter: React.ComponentProps<'input'>['onKeyDown'] = ({ key }) => {
    if (key !== 'Enter') return;
    search();
  };

  const hasSearchResult = searchResults && searchName !== '';

  const selectResultItem = (id: number) => () => {
    onSelect?.(id);
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
        <EnterButton type="button" onClick={search}>
          <BiRightArrowAlt size="32" color="#333333" />
        </EnterButton>
      </InputArea>
      {hasSearchResult &&
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
