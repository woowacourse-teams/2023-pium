import type { GardenPostItem as GardenPostItemType } from 'types/garden';
import Flowerpot from 'components/@common/Icons/Flowerpot';
import House from 'components/@common/Icons/House';
import Sun from 'components/@common/Icons/Sun';
import Wind from 'components/@common/Icons/Wind';
import { convertDateKorYear } from 'utils/date';
import theme from 'style/theme.style';
import {
  Content,
  DaySince,
  Environment,
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

const GardenPostItem = ({ content, createdAt, manageLevel, petPlant }: GardenPostItemProps) => {
  const postingDate = convertDateKorYear(createdAt).slice(5);

  return (
    <Wrapper>
      <Header>
        <PetPlantImage src={petPlant.imageUrl} />
        <HeaderContent>
          <PetPlantNickname>{petPlant.nickname}</PetPlantNickname>
          <DaySince>
            함께한지 <span>{petPlant.daySince}</span>일째
          </DaySince>
        </HeaderContent>
        <PostingDate>{postingDate}</PostingDate>
      </Header>
      <Environment>
        <EnvironmentItem>
          <EnvironmentTitle>
            <House
              color={theme.color.primary}
              aria-label="장소"
              aria-describedby="반려 식물이 놓인 공간"
              width="20px"
              height="20px"
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
              width="20px"
              height="20px"
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
              width="20px"
              height="20px"
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
              width="20px"
              height="20px"
            />
          </EnvironmentTitle>
          {petPlant.wind}
        </EnvironmentItem>
      </Environment>
      <TagArea>
        <WaterCycleTag>물 주기: {petPlant.waterCycle}일</WaterCycleTag>
        <ManageLevelTag>{manageLevel}에게 추천해요</ManageLevelTag>
      </TagArea>
      <Content>
        {content
          .trim()
          .split(/(?:\r?\n)+/)
          .map((paragraph, index) =>
            index ? (
              <>
                <br />
                <br />
                {paragraph}
              </>
            ) : (
              paragraph
            )
          )}
      </Content>
    </Wrapper>
  );
};

export default GardenPostItem;
