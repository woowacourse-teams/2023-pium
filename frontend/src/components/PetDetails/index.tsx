import type { PetPlantDetails } from 'types/api/petPlant';
import { generatePath } from 'react-router-dom';
import Crown from 'components/@common/Icons/Crown';
import Dictionary from 'components/@common/Icons/Dictionary';
import Flowerpot from 'components/@common/Icons/Flowerpot';
import House from 'components/@common/Icons/House';
import Sun from 'components/@common/Icons/Sun';
import Wind from 'components/@common/Icons/Wind';
import Image from 'components/@common/Image';
import theme from '../../style/theme.style';
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
} from './PetDetails.style';
import usePetPlantDetails from 'hooks/queries/pet/usePetPlantDetails';
import { convertDateKorYear } from 'utils/date';
import { URL_PATH } from 'constants/index';

interface PetDetailsProps {
  petPlantId: PetPlantDetails['id'];
}

const PetDetails = ({ petPlantId }: PetDetailsProps) => {
  const { data: petPlantDetails } = usePetPlantDetails(petPlantId);

  if (!petPlantDetails) return null;

  const {
    imageUrl,
    nickname,
    dictionaryPlant: { id: dictId, name: dictName },
    birthDate,
    daySince,
    waterCycle,
    lastWaterDate,
    nextWaterDate,
    location,
    flowerpot,
    light,
    wind,
  } = petPlantDetails;

  const birthDateKorean = convertDateKorYear(birthDate);
  const today = convertDateKorYear(new Date()).slice(5);
  const isBirthday = today === birthDateKorean.slice(5);

  return (
    <Wrapper>
      <Image type="wide" src={imageUrl} alt={`${nickname}(${dictName})`} size="300px" />
      <Content>
        <TitleArea>
          <Title>
            {nickname}
            {isBirthday && <Crown aria-hidden="true" />}
          </Title>
          <StyledLink to={generatePath(URL_PATH.dictDetail, { id: dictId.toString() })}>
            <SubTitle>
              {dictName}
              <Dictionary aria-hidden="true" />
            </SubTitle>
          </StyledLink>
        </TitleArea>
        <Divider aria-hidden="true" />
        <InfoArea>
          <ExpandedTextBox>
            <Text>생년월일</Text>
            <Text>{birthDateKorean}</Text>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>피움과 함께한 지</Text>
            <Text>{daySince}일</Text>
          </ExpandedTextBox>
        </InfoArea>
        <Divider aria-hidden="true" />
        <InfoArea>
          <ExpandedTextBox>
            <Text>물 주기</Text>
            <Bold>
              <Strong>{waterCycle}</Strong>일마다
            </Bold>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>마지막 물주기</Text>
            <Bold>{convertDateKorYear(lastWaterDate)}</Bold>
          </ExpandedTextBox>
          <ExpandedTextBox>
            <Text>다음 물주기</Text>
            <Bold>{convertDateKorYear(nextWaterDate)}</Bold>
          </ExpandedTextBox>
        </InfoArea>
        <Divider aria-hidden="true" />
        <Environment>
          <EnvironmentItem>
            <EnvironmentTitle>
              <House color={theme.color.primary} aria-hidden="true" />
              장소
            </EnvironmentTitle>
            {location}
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <Flowerpot color={theme.color.primary} aria-hidden="true" />
              화분
            </EnvironmentTitle>
            {flowerpot}
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <Sun color={theme.color.primary} aria-hidden="true" />
              햇살
            </EnvironmentTitle>
            {light}
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <Wind color={theme.color.primary} aria-hidden="true" />
              바람
            </EnvironmentTitle>
            {wind}
          </EnvironmentItem>
        </Environment>
      </Content>
    </Wrapper>
  );
};

export default PetDetails;
