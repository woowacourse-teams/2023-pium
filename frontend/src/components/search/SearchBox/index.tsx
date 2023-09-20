import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
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
  value: string;
  height?: `${number}px`;
  fontSize?: string;
  showResultSize?: number;
  onChangeValue: (value: string) => void;
  onResultClick?: (searchResult: DictionaryPlantNameSearchResult) => void;
  onEnter?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
  onNextClick?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const {
    value,
    height = '56px',
    fontSize = '2rem',
    showResultSize = 4,
    onChangeValue,
    onResultClick,
    onEnter,
    onNextClick,
  } = props;
  const queryName = useDebounce<string>(value, 200);
  const { data: searchResults } = useDictionaryPlantSearch(queryName);
  const { isOn, on: open, off: close } = useToggle();

  const isOpen = value !== '' && isOn;
  const numberHeight = Number(height.slice(0, -2));

  const handleSearchNameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeValue(value);
    open();
  };

  const searchOnEnter: React.ComponentProps<'input'>['onKeyDown'] = ({ key }) => {
    if (key !== 'Enter' || !onEnter) return;
    onEnter(value, searchResults);
    close();
  };

  const handleResultClick = (searchResult: DictionaryPlantNameSearchResult) => () => {
    onResultClick?.(searchResult);
    onChangeValue(searchResult.name);
    close();
  };

  const handleNextButtonClick = () => {
    onNextClick?.(value, searchResults);
    close();
  };

  const handleFocus = () => {
    open();
  };

  return (
    <Wrapper $fontSize={fontSize}>
      <InputBox $openBottom={isOpen} $height={height}>
        <SvgIcons icon="search" size={numberHeight / 1.6} color={theme.color.primary} />
        <Input
          type="text"
          value={value}
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
            <ResultMessage>
              {searchResults?.length ? '찾는 식물이 없으신가요?' : MESSAGE.noSearchResult}
              <StyledLink to={URL_PATH.newDictionaryPlantRequest} state={value}>
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
