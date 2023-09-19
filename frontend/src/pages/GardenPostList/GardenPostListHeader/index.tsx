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
      <FilterArea>
        {selectedDictionaryPlant && (
          <FilterTag>
            {selectedDictionaryPlant.name}
            <DeleteFilterButton onClick={onClickDelete}>✕</DeleteFilterButton>
          </FilterTag>
        )}
      </FilterArea>
    </Wrapper>
  );
};

export default GardenPostListHeader;
