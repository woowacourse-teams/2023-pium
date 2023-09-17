import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useState } from 'react';
import Image from 'components/@common/Image';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
import {
  InputBox,
  ResultItem,
  ResultList,
  Wrapper,
  Name,
  EnterButton,
  Input,
  ResultMessage,
  StyledLink,
  Backdrop,
  ResultDropdown,
} from './SearchBox.style';
import useDictionaryPlantSearch from 'hooks/queries/dictionaryPlant/useDictionaryPlantSearch';
import useDebounce from 'hooks/useDebounce';
import useToggle from 'hooks/useToggle';
import { MESSAGE, URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

interface SearchBoxProps {
  height?: `${number}px`;
  fontSize?: string;
  showResultSize?: number;
  onResultClick?: (searchResult: DictionaryPlantNameSearchResult) => void;
  onEnter?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
  onNextClick?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const {
    height = '56px',
    fontSize = '2rem',
    showResultSize = 4,
    onResultClick,
    onEnter,
    onNextClick,
  } = props;
  const numberHeight = Number(height.slice(0, -2));

  const [searchName, setSearchName] = useState('');
  const queryName = useDebounce<string>(searchName, 200);

  const { data: searchResults } = useDictionaryPlantSearch(queryName);

  const { isOn: isOpen, on: open, off: close } = useToggle();

  const validOpen = (searchName: string) => {
    if (searchName === '') {
      close();
    } else {
      open();
    }
  };

  const handleSearchNameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearchName(value);
    validOpen(value);
  };

  const searchOnEnter: React.ComponentProps<'input'>['onKeyDown'] = ({ key }) => {
    if (key !== 'Enter') return;
    onEnter?.(searchName, searchResults);
    close();
  };

  const handleResultClick = (searchResult: DictionaryPlantNameSearchResult) => () => {
    onResultClick?.(searchResult);
    close();
  };

  const handleNextButtonClick = () => {
    onNextClick?.(searchName, searchResults);
    close();
  };

  const handleFocus = () => {
    validOpen(searchName);
  };

  return (
    <Wrapper $fontSize={fontSize}>
      <InputBox $openBottom={isOpen} $height={height}>
        <SvgIcons icon="search" size={numberHeight / 1.6} color={theme.color.primary} />
        <Input
          type="text"
          value={searchName}
          onChange={handleSearchNameChange}
          onKeyDown={searchOnEnter}
          onFocus={handleFocus}
          $height={height}
        />
        {onNextClick && (
          <EnterButton type="button" aria-label="이동하기" onClick={handleNextButtonClick}>
            <SvgIcons icon="arrow-right-alt" size={numberHeight / 2} color={theme.color.sub} />
          </EnterButton>
        )}
      </InputBox>
      {isOpen && (
        <>
          <Backdrop onClick={close} />
          <ResultDropdown $height={height}>
            <ResultList $maxHeight={`calc(${height} * ${showResultSize})`}>
              {searchResults?.map(({ id, name, image }) => (
                <ResultItem
                  key={id}
                  onClick={handleResultClick({ id, name, image })}
                  $height={height}
                >
                  <Image
                    alt={name}
                    src={image}
                    type="circle"
                    size={`calc(${height} * 2/3)`}
                    loading="lazy"
                  />
                  <Name>{name}</Name>
                </ResultItem>
              ))}
            </ResultList>
            <ResultMessage $height={height}>
              {searchResults?.length ? '찾는 식물이 없으신가요?' : MESSAGE.noSearchResult}
              <StyledLink to={URL_PATH.newDictionaryPlantRequest} state={searchName}>
                등록 신청하기
              </StyledLink>
            </ResultMessage>
          </ResultDropdown>
        </>
      )}
    </Wrapper>
  );
};

export default SearchBox;
