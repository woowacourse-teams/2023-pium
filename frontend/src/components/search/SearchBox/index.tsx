import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useState } from 'react';
import ArrowRight from 'components/@common/Icons/ArrowRightAlt';
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
  StyledLink,
} from './SearchBox.style';
import useDictionaryPlantSearch from 'hooks/queries/dictionaryPlant/useDictionaryPlantSearch';
import useDebounce from 'hooks/useDebounce';
import { MESSAGE, URL_PATH } from 'constants/index';

interface SearchBoxProps {
  onResultClick?: (id: number) => void;
  onEnter?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
  onNextClick?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const { onResultClick, onEnter, onNextClick } = props;

  const [searchName, setSearchName] = useState('');
  const queryName = useDebounce<string>(searchName, 200);

  const { data: searchResults } = useDictionaryPlantSearch(queryName);

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
        {onNextClick && (
          <EnterButton type="button" aria-label="이동하기" onClick={handleNextButtonClick}>
            <ArrowRight width={32} height={32} color="#333333" />
          </EnterButton>
        )}
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
          <ResultMessage>
            {MESSAGE.noSearchResult} &nbsp;&nbsp;&nbsp;
            <StyledLink to={URL_PATH.newDictionaryRequest} state={searchName}>
              등록 신청하기
            </StyledLink>
          </ResultMessage>
        ))}
    </Wrapper>
  );
};

export default SearchBox;
