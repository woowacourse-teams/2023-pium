import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useState } from 'react';
import ArrowRight from 'components/@common/Icons/ArrowRightAlt';
import Search from 'components/@common/Icons/Search';
import Image from 'components/@common/Image';
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
  ResultModal,
} from './SearchBox.style';
import useDictionaryPlantSearch from 'hooks/queries/dictionaryPlant/useDictionaryPlantSearch';
import useDebounce from 'hooks/useDebounce';
import useToggle from 'hooks/useToggle';
import { MESSAGE, URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

interface SearchBoxProps {
  onResultClick?: (searchResult: DictionaryPlantNameSearchResult) => void;
  onEnter?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
  onNextClick?: (name: string, searchResults?: DictionaryPlantNameSearchResult[]) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const { onResultClick, onEnter, onNextClick } = props;

  const [searchName, setSearchName] = useState('');
  const queryName = useDebounce<string>(searchName, 200);

  const { data: searchResults } = useDictionaryPlantSearch(queryName);

  const { isOn: isOpen, on: open, off: close } = useToggle();

  const handleSearchNameChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearchName(value);

    if (value === '') {
      close();
    } else {
      open();
    }
  };

  const searchOnEnter: React.ComponentProps<'input'>['onKeyDown'] = ({ key }) => {
    if (key !== 'Enter') return;
    onEnter?.(searchName, searchResults);
  };

  const handleResultClick = (searchResult: DictionaryPlantNameSearchResult) => () => {
    onResultClick?.(searchResult);
    close();
  };

  const handleNextButtonClick = () => {
    onNextClick?.(searchName, searchResults);
  };

  return (
    <Wrapper>
      <InputBox openBottom={isOpen}>
        <Search width={40} height={40} color={theme.color.primary} />
        <Input
          type="text"
          value={searchName}
          onChange={handleSearchNameChange}
          onKeyDown={searchOnEnter}
          onFocus={open}
        />
        {onNextClick && (
          <EnterButton type="button" aria-label="이동하기" onClick={handleNextButtonClick}>
            <ArrowRight width={32} height={32} color="#333333" />
          </EnterButton>
        )}
      </InputBox>
      {isOpen && (
        <>
          <Backdrop onClick={close} />
          <ResultModal>
            <ResultList showRow={4}>
              {searchResults?.map(({ id, name, image }) => (
                <ResultItem key={id} onClick={handleResultClick({ id, name, image })}>
                  <Image alt={name} src={image} type="circle" size="40px" />
                  <Name>{name}</Name>
                </ResultItem>
              ))}
            </ResultList>
            <ResultMessage>
              {searchResults?.length ? '찾는 식물이 없으신가요?' : MESSAGE.noSearchResult}
              &nbsp;&nbsp;&nbsp;
              <StyledLink to={URL_PATH.newDictionaryPlantRequest} state={searchName}>
                등록 신청하기
              </StyledLink>
            </ResultMessage>
          </ResultModal>
        </>
      )}
    </Wrapper>
  );
};

export default SearchBox;
