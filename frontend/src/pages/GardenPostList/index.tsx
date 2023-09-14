import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useEffect, useState } from 'react';
import Navbar from 'components/@common/Navbar';
import GardenPostItem from 'components/garden/GardenPostItem';
import SearchBox from 'components/search/SearchBox';
import {
  DeleteFilterButton,
  GardenName,
  Header,
  List,
  Main,
  SelectedDictionaryPlantArea,
  Sensor,
} from './GardenPostList.style';
import useGardenPostList from 'hooks/queries/garden/useGardenPostList';
import useIntersectionRef from 'hooks/useIntersectionRef';

const GardenPostList = () => {
  const [selectedDictionaryPlant, setSelectedDictionaryPlant] =
    useState<DictionaryPlantNameSearchResult | null>(null);

  const {
    data: gardenPostList,
    isFetchingNextPage,
    fetchNextPage,
  } = useGardenPostList(selectedDictionaryPlant ? selectedDictionaryPlant.id : null);

  const intersectionRef = useIntersectionRef(fetchNextPage);

  const select = (searchResult: DictionaryPlantNameSearchResult) => {
    setSelectedDictionaryPlant(searchResult);
  };

  const clear = () => {
    setSelectedDictionaryPlant(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedDictionaryPlant]);

  return (
    <>
      <Header>
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
      </Header>
      <Main>
        <List>
          {gardenPostList.map((gardenPost) => (
            <GardenPostItem key={gardenPost.id} {...gardenPost}></GardenPostItem>
          ))}
        </List>
        {!isFetchingNextPage && <Sensor ref={intersectionRef} />}
      </Main>
      <Navbar />
    </>
  );
};

export default GardenPostList;
