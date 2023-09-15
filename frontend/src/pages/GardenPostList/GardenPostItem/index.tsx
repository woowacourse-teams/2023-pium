import type { GardenPostItem as GardenPostItemType } from 'types/garden';
import Flowerpot from 'components/@common/Icons/Flowerpot';
import House from 'components/@common/Icons/House';
import Sun from 'components/@common/Icons/Sun';
import Wind from 'components/@common/Icons/Wind';
import SeeMoreContentBox from 'components/@common/SeeMoreContentBox';
import { convertDateKorYear } from 'utils/date';
import theme from 'style/theme.style';
import {
  ContentArea,
  DaySince,
  DictionaryPlantTag,
  GreenBox,
  EnvironmentItem,
  EnvironmentTitle,
  Header,
  HeaderContent,
  ManageLevelTag,
  PetPlantImage,
  PetPlantNickname,
  PostingDate,
  TagArea,
  WaterCycleTag,
  Wrapper,
} from './GardenPostItem.styles';

type GardenPostItemProps = Omit<GardenPostItemType, 'id' | 'updatedAt'>;

const ENVIRONMENT_ICON_SIZE = '16px';

const GardenPostItem = ({
  content,
  createdAt,
  manageLevel,
  dictionaryPlantName,
  petPlant,
}: GardenPostItemProps) => {
  const postingDate = convertDateKorYear(createdAt);

  return (
    <Wrapper>
      <Header>
        <PetPlantImage src={petPlant.imageUrl} alt="반려식물" />
        <HeaderContent>
          <PetPlantNickname>{petPlant.nickname}</PetPlantNickname>
          <DaySince>
            함께한지 <span>{petPlant.daySince}</span>일째
          </DaySince>
        </HeaderContent>
        <PostingDate>{postingDate}</PostingDate>
      </Header>
      <ContentArea>
        <SeeMoreContentBox maxHeight="64px">{content}</SeeMoreContentBox>
      </ContentArea>
      <TagArea>
        <DictionaryPlantTag>{dictionaryPlantName}</DictionaryPlantTag>
        <WaterCycleTag>물 주기: {petPlant.waterCycle}일</WaterCycleTag>
        <ManageLevelTag>{manageLevel}에게 추천해요</ManageLevelTag>
      </TagArea>
      <GreenBox>
        <EnvironmentItem>
          <EnvironmentTitle>
            <House
              color={theme.color.primary}
              aria-label="장소"
              aria-describedby="반려 식물이 놓인 공간"
              width={ENVIRONMENT_ICON_SIZE}
              height={ENVIRONMENT_ICON_SIZE}
            />
          </EnvironmentTitle>
          {petPlant.location}
        </EnvironmentItem>
        <EnvironmentItem>
          <EnvironmentTitle>
            <Flowerpot
              color={theme.color.primary}
              aria-label="화분"
              aria-describedby="반려 식물이 담긴 화분의 재질"
              width={ENVIRONMENT_ICON_SIZE}
              height={ENVIRONMENT_ICON_SIZE}
            />
          </EnvironmentTitle>
          {petPlant.flowerpot}
        </EnvironmentItem>
        <EnvironmentItem>
          <EnvironmentTitle>
            <Sun
              color={theme.color.primary}
              aria-label="채광"
              aria-describedby="반려 식물이 빛을 얼마나 받고 있는지"
              width={ENVIRONMENT_ICON_SIZE}
              height={ENVIRONMENT_ICON_SIZE}
            />
          </EnvironmentTitle>
          {petPlant.light}
        </EnvironmentItem>
        <EnvironmentItem>
          <EnvironmentTitle>
            <Wind
              color={theme.color.primary}
              aria-label="바람"
              aria-describedby="반려 식물이 통풍이 잘 되는 위치인지"
              width={ENVIRONMENT_ICON_SIZE}
              height={ENVIRONMENT_ICON_SIZE}
            />
          </EnvironmentTitle>
          {petPlant.wind}
        </EnvironmentItem>
      </GreenBox>
    </Wrapper>
  );
};

export default GardenPostItem;
