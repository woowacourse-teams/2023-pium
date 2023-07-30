import type { DictNameSearchResult } from 'types/api/dictionary';
import { useState } from 'react';
import ArrowRight from 'components/@common/Icons/ArrowRight';
import Search from 'components/@common/Icons/Search';
import Image from 'components/@common/Image';
import {
  InputArea,
  ResultItem,
  ResultList,
  Wrapper,
  Name,
  EnterButton,
  Input,
  ResultMessage,
} from './SearchBox.style';
import useDictSearch from 'hooks/queries/dictionary/useDictSearch';
import useDebounce from 'hooks/useDebounce';
import { MESSAGE } from 'constants/index';

interface SearchBoxProps {
  onResultClick?: (id: number) => void;
  onEnter?: (name: string, searchResults?: DictNameSearchResult[]) => void;
  onNextClick?: (name: string, searchResults?: DictNameSearchResult[]) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const { onResultClick, onEnter, onNextClick } = props;

  const [searchName, setSearchName] = useState('');
  const queryName = useDebounce<string>(searchName, 200);

  const { data: searchResults } = useDictSearch(queryName);

  const handleSearchNameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearchName(value);
  };

  const searchOnEnter: React.ComponentProps<'input'>['onKeyDown'] = ({ key }) => {
    if (key !== 'Enter') return;
    onEnter?.(searchName, searchResults);
  };

  const handleResultClick = (plantId: number) => () => {
    onResultClick?.(plantId);
  };

  const handleNextButtonClick = () => {
    onNextClick?.(searchName, searchResults);
  };

  const hasSearchResult = searchResults && searchName !== '';

  return (
    <Wrapper>
      <InputArea>
        <Search width={40} height={40} color="#1bcc66" />
        <Input
          type="text"
          value={searchName}
          onChange={handleSearchNameChange}
          onKeyDown={searchOnEnter}
        />
        <EnterButton type="button" onClick={handleNextButtonClick}>
          <ArrowRight width={32} height={32} color="#333333" />
        </EnterButton>
      </InputArea>
      {hasSearchResult &&
        (searchResults.length ? (
          <ResultList>
            {searchResults.map(({ id, name, image }) => (
              <ResultItem key={id} onClick={handleResultClick(id)}>
                <Image alt={name} src={image} type="circle" size="40px" />
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
