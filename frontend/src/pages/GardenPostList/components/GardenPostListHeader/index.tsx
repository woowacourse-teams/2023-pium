import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import SearchBox from 'components/search/SearchBox';
import {
  DeleteFilterButton,
  GardenName,
  Wrapper,
  SelectedDictionaryPlantArea,
} from './GardenPostListHeader.style';

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
      <SearchBox onResultClick={select} />
      <SelectedDictionaryPlantArea>
        <GardenName>
          {selectedDictionaryPlant ? (
            <>
              {selectedDictionaryPlant.name}
              <DeleteFilterButton onClick={clear}>✕</DeleteFilterButton>
            </>
          ) : (
            '모두의'
          )}
        </GardenName>
        정원
      </SelectedDictionaryPlantArea>
    </Wrapper>
  );
};

export default GardenPostListHeader;
