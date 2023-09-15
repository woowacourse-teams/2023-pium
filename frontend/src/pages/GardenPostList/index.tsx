import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useEffect, useState } from 'react';
import Navbar from 'components/@common/Navbar';
import { List, Main, Message, Sensor } from './GardenPostList.style';
import useIntersectionRef from 'hooks/useIntersectionRef';
import GardenPostItem from './GardenPostItem';
import GardenPostItemSkeleton from './GardenPostItem/GardenPostItemSkeleton';
import GardenPostListHeader from './GardenPostListHeader';
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
      <GardenPostListHeader
        selectedDictionaryPlant={selectedDictionaryPlant}
        select={select}
        clear={clear}
      />
      <Main>
        <List>
          {gardenPostList?.map((gardenPost) => (
            <GardenPostItem key={gardenPost.id} {...gardenPost} />
          ))}
          {(isLoading || isFetchingNextPage) &&
            Array(SKELETON_LENGTH)
              .fill(null)
              .map((_, index) => <GardenPostItemSkeleton key={index} />)}
        </List>
        {!isFetchingNextPage && <Sensor ref={intersectionRef} />}
        {!hasNextPage && <Message>마지막이에요 😄</Message>}
      </Main>
      <Navbar />
    </>
  );
};

export default GardenPostList;
