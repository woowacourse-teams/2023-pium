import type { DictionaryPlantNameSearchResult } from 'types/dictionaryPlant';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import Navbar from 'components/@common/Navbar';
import PageLogger from 'components/@common/PageLogger';
import SvgStroke from 'components/@common/SvgIcons/SvgStroke';
import GardenPostItem from 'components/garden/GardenPostItem';
import GardenPostItemSkeleton from 'components/garden/GardenPostItem/GardenPostItemSkeleton';
import GardenPostListHeader from 'components/garden/GardenPostListHeader';
import { FixedButtonArea, FixedButton, List, Main, Message, Sensor } from './GardenPostList.style';
import { selectedDictionaryPlantState } from 'store/atoms/garden';
import useIntersectionRef from 'hooks/@common/useIntersectionRef';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import useGardenPostList from 'hooks/queries/garden/useGardenPostList';
import { URL_PATH } from 'constants/index';

const SKELETON_LENGTH = 20;

const GardenPostList = () => {
  const navigate = useNavigate();
  const [selectedDictionaryPlant, setSelectedDictionaryPlant] = useRecoilState(
    selectedDictionaryPlantState
  );

  const { isSuccess: isLoggedIn } = useCheckSessionId(false);
  const {
    data: gardenPostList,
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

  const Skeletons = () =>
    Array(SKELETON_LENGTH)
      .fill(null)
      .map((_, index) => <GardenPostItemSkeleton key={index} />);

  return (
    <PageLogger>
      <GardenPostListHeader
        selectedDictionaryPlant={selectedDictionaryPlant}
        select={select}
        clear={clear}
      />
      <Main>
        {gardenPostList ? (
          gardenPostList.length ? (
            <List>
              {gardenPostList.map((gardenPost) => (
                <GardenPostItem key={gardenPost.id} {...gardenPost} />
              ))}
              {isFetchingNextPage && <Skeletons />}
              {!hasNextPage && <Message>마지막이에요 😊</Message>}
              {!isFetchingNextPage && <Sensor ref={intersectionRef} />}
            </List>
          ) : (
            <Message>아직 작성된 글이 없어요 🤔</Message>
          )
        ) : (
          <List>
            <Skeletons />
          </List>
        )}
      </Main>
      <Navbar />
      {isLoggedIn && (
        <FixedButtonArea>
          <FixedButton type="button" onClick={goGardenRegisterPick} aria-label="모두의 정원 글쓰기">
            <SvgStroke color="white" size={32} icon="plus" />
          </FixedButton>
        </FixedButtonArea>
      )}
    </PageLogger>
  );
};

export default GardenPostList;
