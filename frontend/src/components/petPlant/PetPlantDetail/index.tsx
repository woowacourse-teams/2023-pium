import type { PetPlantDetails } from 'types/petPlant';
import { generatePath } from 'react-router-dom';
import Image from 'components/@common/Image';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import SvgStroke from 'components/@common/SvgIcons/SvgStroke';
import {
  InfoArea,
  Bold,
  ExpandedTextBox,
  Environment,
  Strong,
  SubTitle,
  Text,
  Title,
  TitleArea,
  Wrapper,
  Content,
  Divider,
  StyledLink,
  EnvironmentTitle,
  EnvironmentItem,
  TimelineLinkArea,
  TimelineLink,
  PrimaryLink,
  SecondaryLink,
  ButtonArea
} from './PetPlantDetail.style';
import usePetPlantDetails from 'hooks/queries/petPlant/usePetPlantDetails';
import { convertDateKorYear, getDaysBetween } from 'utils/date';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

interface PetDetailsProps {
  petPlantId: PetPlantDetails['id'];
}

const PetPlantDetail = ({ petPlantId }: PetDetailsProps) => {
  const { data: petPlantDetails } = usePetPlantDetails(petPlantId);
  if (!petPlantDetails) return null;

  const {
    id,
    imageUrl,
    nickname,
    dictionaryPlant: { id: dictionaryPlantId, name: dictionaryPlantName },
    birthDate,
    daySince,
    waterCycle,
    lastWaterDate,
    location,
    flowerpot,
    light,
    wind,
    dday
  } = petPlantDetails;

  const birthDateKorean = convertDateKorYear(birthDate);
  const today = convertDateKorYear(new Date()).slice(5);
  const isBirthday = today === birthDateKorean.slice(5);

  const daysBetweenLastWaterDate = getDaysBetween(Date.now(), lastWaterDate);

  const { primary: primaryColor } = theme.color;

  return (
    <Wrapper>
      <Image type="wide" src={imageUrl} alt={`${nickname}(${dictionaryPlantName})`} size="300px" />
      <Content>
        <TitleArea>
          <Title>
            {nickname}
            {isBirthday && <SvgFill icon="crown" aria-hidden="true" />}
          </Title>
          <StyledLink to={generatePath(URL_PATH.dictDetail, { id: dictionaryPlantId.toString() })}>
            <SubTitle>
              {dictionaryPlantName}
              <SvgStroke icon="dictionary" aria-hidden="true" color={theme.color.grayDark} />
            </SubTitle>
          </StyledLink>
        </TitleArea>
        <Divider aria-hidden="true" />
        <InfoArea>
          <ExpandedTextBox>
            <Text>입양일</Text>
            <Text>{birthDateKorean}</Text>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>함께한 지</Text>
            <Text>{daySince}일</Text>
          </ExpandedTextBox>
        </InfoArea>
        <Divider aria-hidden="true" />
        <InfoArea>
          <ExpandedTextBox>
            <Text>물 주기</Text>
            <Bold>
              <Strong>{waterCycle}</Strong> 일마다
            </Bold>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>마지막 물주기</Text>
            <Bold>{daysBetweenLastWaterDate ? `${daysBetweenLastWaterDate}일 전` : '오늘!!'}</Bold>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>다음 물주기</Text>
            <Bold>
              {dday === 0 ? '오늘!!' : dday < 0 ? `${Math.abs(dday)}일 후` : `${dday}일 전`}
            </Bold>
          </ExpandedTextBox>
          <TimelineLinkArea>
            <TimelineLink to={generatePath(URL_PATH.timeline, { id: String(id) })}>
              타임라인 보기
            </TimelineLink>
          </TimelineLinkArea>
        </InfoArea>
        <Divider aria-hidden="true" />
        <Environment>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgFill
                icon="house"
                size={20}
                color={primaryColor}
                aria-label="장소"
                aria-describedby="반려 식물이 놓인 공간"
              />
            </EnvironmentTitle>
            {location}
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgFill
                icon="flowerpot"
                color={primaryColor}
                aria-label="화분"
                aria-describedby="반려 식물이 담긴 화분의 재질"
                size={20}
              />
            </EnvironmentTitle>
            {flowerpot}
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgFill
                icon="sun"
                color={primaryColor}
                aria-label="채광"
                aria-describedby="반려 식물이 빛을 얼마나 받고 있는지"
                size={20}
              />
            </EnvironmentTitle>
            {light}
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgFill
                icon="wind"
                color={primaryColor}
                aria-label="바람"
                aria-describedby="반려 식물이 통풍이 잘 되는 위치인지"
                size={20}
              />
            </EnvironmentTitle>
            {wind}
          </EnvironmentItem>
        </Environment>
        <ButtonArea>
          <PrimaryLink
            to={generatePath(URL_PATH.gardenRegisterForm, { id: petPlantId.toString() })}
            state={{ nickname, dictionaryPlantName, imageUrl }}
          >
            모두의 정원에 등록하기
          </PrimaryLink>
          <SecondaryLink to={generatePath(URL_PATH.petEdit, { id: petPlantId.toString() })}>
            정보 수정
          </SecondaryLink>
        </ButtonArea>
      </Content>
    </Wrapper>
  );
};

export default PetPlantDetail;
