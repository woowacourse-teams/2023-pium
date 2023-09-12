import type { PetPlantDetails } from 'types/petPlant';
import { generatePath } from 'react-router-dom';
import Image from 'components/@common/Image';
import SvgIcons from 'components/@common/SvgIcons';
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
  EditLink,
  DeleteButton,
} from './PetPlantDetail.style';
import useDeletePetPlant from 'hooks/queries/petPlant/useDeletePetPlant';
import usePetPlantDetails from 'hooks/queries/petPlant/usePetPlantDetails';
import useConfirm from 'hooks/useConfirm';
import { convertDateKorYear, getDaysBetween } from 'utils/date';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

interface PetDetailsProps {
  petPlantId: PetPlantDetails['id'];
}

const PetPlantDetail = ({ petPlantId }: PetDetailsProps) => {
  const { data: petPlantDetails } = usePetPlantDetails(petPlantId);
  const confirm = useConfirm();
  const { mutate } = useDeletePetPlant();

  if (!petPlantDetails) return null;

  const {
    id,
    imageUrl,
    nickname,
    dictionaryPlant: { id: dictId, name: dictName },
    birthDate,
    daySince,
    waterCycle,
    lastWaterDate,
    location,
    flowerpot,
    light,
    wind,
    dday,
  } = petPlantDetails;

  const deletePetPlant = async () => {
    const isConfirmed = await confirm({
      title: '반려 식물 삭제',
      message: `정말로 '${nickname}'을(를) 지우실 건가요?`,
    });

    if (!isConfirmed) return;

    mutate(id);
  };

  const birthDateKorean = convertDateKorYear(birthDate);
  const today = convertDateKorYear(new Date()).slice(5);
  const isBirthday = today === birthDateKorean.slice(5);

  const daysBetweenLastWaterDate = getDaysBetween(Date.now(), lastWaterDate);

  const { primary: primaryColor } = theme.color;

  return (
    <Wrapper>
      <Image type="wide" src={imageUrl} alt={`${nickname}(${dictName})`} size="300px" />
      <Content>
        <TitleArea>
          <Title>
            {nickname}
            {isBirthday && <SvgIcons icon="crown" aria-hidden="true" />}
          </Title>
          <StyledLink to={generatePath(URL_PATH.dictDetail, { id: dictId.toString() })}>
            <SubTitle>
              {dictName}
              <SvgIcons icon="dictionary" aria-hidden="true" />
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
              <SvgIcons
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
              <SvgIcons
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
              <SvgIcons
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
              <SvgIcons
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
        <ExpandedTextBox>
          <EditLink to={generatePath(URL_PATH.petEdit, { id: petPlantId.toString() })}>
            정보 수정하기
          </EditLink>
          <DeleteButton type="button" onClick={deletePetPlant}>
            식물 삭제하기
          </DeleteButton>
        </ExpandedTextBox>
      </Content>
    </Wrapper>
  );
};

export default PetPlantDetail;
