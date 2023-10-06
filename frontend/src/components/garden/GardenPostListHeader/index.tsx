import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useState } from 'react';
import SearchBox from 'components/search/SearchBox';
import { DeleteFilterButton, FilterTag, Wrapper, FilterArea } from './GardenPostListHeader.style';

interface GardenPostListHeaderProps {
  selectedDictionaryPlant: DictionaryPlantNameSearchResult | null;
  select: (searchResult: DictionaryPlantNameSearchResult) => void;
  clear: () => void;
}

const GardenPostListHeader = ({
  selectedDictionaryPlant,
  select,
  clear,
}: GardenPostListHeaderProps) => {
  const [searchValue, setSearchValue] = useState('');

  const onClickDelete = () => {
    setSearchValue('');
    clear();
  };

  return (
    <Wrapper>
      <SearchBox
        value={searchValue}
        onChangeValue={setSearchValue}
        onResultClick={select}
        height="36px"
        fontSize="1.6rem"
      />
      {selectedDictionaryPlant && (
        <FilterArea>
          <FilterTag>
            {selectedDictionaryPlant.name}
            <DeleteFilterButton type="button" onClick={onClickDelete} aria-label="필터 지우기">
              ✕
            </DeleteFilterButton>
          </FilterTag>
        </FilterArea>
      )}
    </Wrapper>
  );
};

export default GardenPostListHeader;
