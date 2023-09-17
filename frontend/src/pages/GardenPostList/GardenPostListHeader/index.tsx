import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import SearchBox from 'components/search/SearchBox';
import { DeleteFilterButton, Name, Wrapper, FilterArea } from './GardenPostListHeader.style';

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
  return (
    <Wrapper>
      <SearchBox onResultClick={select} height="36px" fontSize="1.6rem" />
      <FilterArea>
        {selectedDictionaryPlant && (
          <Name>
            {selectedDictionaryPlant.name}
            <DeleteFilterButton onClick={clear}>✕</DeleteFilterButton>
          </Name>
        )}
      </FilterArea>
    </Wrapper>
  );
};

export default GardenPostListHeader;
