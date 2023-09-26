import { PetPlantDetails } from 'types/petPlant';
import { generatePath } from 'react-router-dom';
import Image from 'components/@common/Image';
import SvgFill from 'components/@common/SvgIcons/SvgFill';
import {
  DictionaryPlantName,
  Text,
  NameArea,
  Nickname,
  PrimaryText,
  Section,
  Environment,
  EnvironmentItem,
  EnvironmentTitle,
  Title,
  StyledLink,
} from './Profile.style';
import usePetPlantDetails from 'hooks/queries/petPlant/usePetPlantDetails';
import { URL_PATH } from 'constants/index';
import theme from 'style/theme.style';

interface ProfileProps {
  petPlantId: PetPlantDetails['id'];
}

const ENVIRONMENT_ICON_SIZE = 16;

const Profile = (props: ProfileProps) => {
  const { petPlantId } = props;

  const {
    data: {
      nickname,
      imageUrl,
      waterCycle,
      location,
      flowerpot,
      light,
      wind,
      dictionaryPlant: { name: dictionaryPlantName },
    },
  } = usePetPlantDetails(petPlantId);

  const {
    color: { primary: primaryColor },
  } = theme;

  return (
    <>
      <Section>
        <Title>
          <Image type="square" size="100px" src={imageUrl} alt={`사랑스러운 ${nickname}`} />
          <NameArea>
            <Nickname>{nickname}</Nickname>
            <DictionaryPlantName>{dictionaryPlantName}</DictionaryPlantName>
          </NameArea>
        </Title>
        <Text>
          물 주기: &nbsp;
          <PrimaryText>{waterCycle}</PrimaryText> 일마다
        </Text>
        <Environment>
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
            {location}
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
            {flowerpot}
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
            {light}
          </EnvironmentItem>
          <EnvironmentItem>
            <EnvironmentTitle>
              <SvgFill
                icon="wind"
                color={primaryColor}
                aria-label="바람"
                aria-describedby="반려 식물이 통풍이 잘 되는 위치인지"
                size={ENVIRONMENT_ICON_SIZE}
              />
            </EnvironmentTitle>
            {wind}
          </EnvironmentItem>
        </Environment>
      </Section>
      <StyledLink to={generatePath(URL_PATH.petEdit, { id: petPlantId.toString() })}>
        정보 수정하러 가기
      </StyledLink>
    </>
  );
};

export default Profile;
