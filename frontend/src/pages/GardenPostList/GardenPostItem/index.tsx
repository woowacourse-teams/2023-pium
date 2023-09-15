import type { GardenPostItem as GardenPostItemType } from 'types/garden';
import SeeMoreContentBox from 'components/@common/SeeMoreContentBox';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
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

const ENVIRONMENT_ICON_SIZE = 16;

const GardenPostItem = ({
  content,
  createdAt,
  manageLevel,
  dictionaryPlantName,
  petPlant,
}: GardenPostItemProps) => {
  const postingDate = convertDateKorYear(createdAt);

  const { primary: primaryColor } = theme.color;
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
            <SvgFill
              icon="house"
              size={ENVIRONMENT_ICON_SIZE}
              color={primaryColor}
              aria-label="장소"
              aria-describedby="반려 식물이 놓인 공간"
            />
          </EnvironmentTitle>
          {petPlant.location}
        </EnvironmentItem>
        <EnvironmentItem>
          <EnvironmentTitle>
            <SvgFill
              icon="flowerpot"
              size={ENVIRONMENT_ICON_SIZE}
              color={primaryColor}
              aria-label="화분"
              aria-describedby="반려 식물이 담긴 화분의 재질"
            />
          </EnvironmentTitle>
          {petPlant.flowerpot}
        </EnvironmentItem>
        <EnvironmentItem>
          <EnvironmentTitle>
            <SvgFill
              icon="sun"
              color={primaryColor}
              aria-label="채광"
              aria-describedby="반려 식물이 빛을 얼마나 받고 있는지"
              size={ENVIRONMENT_ICON_SIZE}
            />
          </EnvironmentTitle>
          {petPlant.light}
        </EnvironmentItem>
        <EnvironmentItem>
          <EnvironmentTitle>
            <SvgFill
              icon="wind"
              color={theme.color.primary}
              aria-label="바람"
              aria-describedby="반려 식물이 통풍이 잘 되는 위치인지"
              size={ENVIRONMENT_ICON_SIZE}
            />
          </EnvironmentTitle>
          {petPlant.wind}
        </EnvironmentItem>
      </GreenBox>
    </Wrapper>
  );
};

export default GardenPostItem;
