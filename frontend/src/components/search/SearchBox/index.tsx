import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useState } from 'react';
import Image from 'components/@common/Image';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
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
import useDictionaryPlantSearch from 'hooks/queries/dictionaryPlant/useDictionaryPlantSearch';
import useDebounce from 'hooks/useDebounce';
import { MESSAGE } from 'constants/index';
import theme from 'style/theme.style';

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
        <SvgIcons icon="search" size={40} color={theme.color.primary} />
        <Input
          type="text"
          value={searchName}
          onChange={handleSearchNameChange}
          onKeyDown={searchOnEnter}
        />
        {onNextClick && (
          <EnterButton type="button" aria-label="이동하기" onClick={handleNextButtonClick}>
            <SvgIcons icon="arrow-right-alt" size={32} color={theme.color.sub} />
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
          <ResultMessage>{MESSAGE.noSearchResult}</ResultMessage>
        ))}
    </Wrapper>
  );
};

export default SearchBox;
