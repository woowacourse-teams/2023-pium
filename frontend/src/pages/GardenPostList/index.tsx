import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useEffect, useState } from 'react';
import Navbar from 'components/@common/Navbar';
import SearchBox from 'components/search/SearchBox';
import {
  DeleteFilterButton,
  GardenName,
  Header,
  List,
  Main,
  Message,
  SelectedDictionaryPlantArea,
  Sensor,
} from './GardenPostList.style';
import useIntersectionRef from 'hooks/useIntersectionRef';
import GardenPostItem from './components/GardenPostItem';
import GardenPostItemSkeleton from './components/GardenPostItem/GardenPostItemSkeleton';
import useGardenPostList from './hooks/useGardenPostList';

const SKELETON_LENGTH = 20;

const GardenPostList = () => {
  const [selectedDictionaryPlant, setSelectedDictionaryPlant] =
    useState<DictionaryPlantNameSearchResult | null>(null);

  const {
    data: gardenPostList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGardenPostList(selectedDictionaryPlant && selectedDictionaryPlant.id);

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
          {gardenPostList &&
            gardenPostList.map((gardenPost) => (
              <GardenPostItem key={gardenPost.id} {...gardenPost} />
            ))}
          {(isLoading || isFetchingNextPage) &&
            Array(SKELETON_LENGTH).fill(null).map(GardenPostItemSkeleton)}
        </List>
        {!isFetchingNextPage && <Sensor ref={intersectionRef} />}
        {!hasNextPage && <Message>마지막이에요 😄</Message>}
      </Main>
      <Navbar />
    </>
  );
};

export default GardenPostList;
