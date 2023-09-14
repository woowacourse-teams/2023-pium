import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useEffect, useState } from 'react';
import Navbar from 'components/@common/Navbar';
import GardenPostItem from 'components/garden/GardenPostItem';
import GardenPostItemSkeleton from 'components/garden/GardenPostItem/GardenPostItemSkeleton';
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
import useGardenPostList from 'hooks/queries/garden/useGardenPostList';
import useIntersectionRef from 'hooks/useIntersectionRef';

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
