import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import Navbar from 'components/@common/Navbar';
import SvgStroke from 'components/@common/SvgIcons/SvgStroke';
import { FixedButtonArea, FixedButton, List, Main, Message, Sensor } from './GardenPostList.style';
import selectedDictionaryPlantAtom from 'store/atoms/garden';
import useIntersectionRef from 'hooks/useIntersectionRef';
import { URL_PATH } from 'constants/index';
import useGardenPostList from '../../hooks/queries/garden/useGardenPostList';
import GardenPostItem from './GardenPostItem';
import GardenPostItemSkeleton from './GardenPostItem/GardenPostItemSkeleton';
import GardenPostListHeader from './GardenPostListHeader';

const SKELETON_LENGTH = 20;

const GardenPostList = () => {
  const navigate = useNavigate();
  const [selectedDictionaryPlant, setSelectedDictionaryPlant] = useRecoilState(
    selectedDictionaryPlantAtom
  );

  const {
    data: gardenPostList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGardenPostList(selectedDictionaryPlant ? selectedDictionaryPlant.id : null);

  const intersectionRef = useIntersectionRef(fetchNextPage);

  const select = (searchResult: DictionaryPlantNameSearchResult) => {
    setSelectedDictionaryPlant(searchResult);
  };

  const clear = () => {
    setSelectedDictionaryPlant(null);
  };

  const goGardenRegisterPick = () => {
    navigate(URL_PATH.gardenRegisterPick);
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
        {!hasNextPage && <Message>마지막이에요 😊</Message>}
      </Main>
      <Navbar />
      <FixedButtonArea>
        <FixedButton onClick={goGardenRegisterPick}>
          <SvgStroke color="white" size={32} icon="plus" />
        </FixedButton>
      </FixedButtonArea>
    </>
  );
};

export default GardenPostList;
