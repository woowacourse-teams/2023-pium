import DictInfo from 'components/DictInfo';
import DictInfoSwitch from 'components/DictInfoSwitch';
import {
  ContentBox,
  CycleBox,
  FamilyName,
  HeaderBox,
  LevelBox,
  LocationBox,
  ManageInfoBox,
  Name,
  PlantImage,
  PropsBox,
  Wrapper,
} from './DictionaryDetail.style';
import useDictionaryPlants from 'hooks/useDictionaryPlants';
import useInvalidIdParams from 'hooks/useInvalidIdParams';

const DictionaryDetail = () => {
  const id = useInvalidIdParams();

  const { dictionary } = useDictionaryPlants(id);

  if (!dictionary) {
    return null;
  }

  const {
    postingPlace,
    familyName,
    name,
    image,
    manageLevel,
    growSpeed,
    requireHumidity,
    requireTemp,
    minimumTemp,
    smell,
    poison,
    specialManageInfo,
    waterOptions,
  } = dictionary;

  const place = postingPlace.map((position, idx) => (
    <DictInfo.Content key={idx}>{position}</DictInfo.Content>
  ));

  return (
    <Wrapper>
      <HeaderBox>
        <div>
          <FamilyName>{familyName}</FamilyName>
          <Name>{name}</Name>
        </div>
        <PlantImage src={image} alt={name} />
      </HeaderBox>
      <ContentBox>
        <LevelBox>
          <DictInfo alignment="row">
            <DictInfo.Title>난이도</DictInfo.Title>
            <DictInfo.Content>{manageLevel}</DictInfo.Content>
          </DictInfo>
        </LevelBox>
        <CycleBox>
          <DictInfoSwitch title="물 주기" optionMap={waterOptions}></DictInfoSwitch>
        </CycleBox>
        <LocationBox>
          <DictInfo>
            <DictInfo.Title>추천 장소</DictInfo.Title>
            {place}
          </DictInfo>
        </LocationBox>

        <PropsBox>
          {growSpeed !== '' && (
            <DictInfo>
              <DictInfo.Title>생장 속도</DictInfo.Title>
              <DictInfo.Content>{growSpeed}</DictInfo.Content>
            </DictInfo>
          )}

          {requireHumidity !== '' && (
            <DictInfo>
              <DictInfo.Title>권장 습도</DictInfo.Title>
              <DictInfo.Content>{requireHumidity}</DictInfo.Content>
            </DictInfo>
          )}

          {requireTemp !== '' && (
            <DictInfo>
              <DictInfo.Title>권장 온도</DictInfo.Title>
              <DictInfo.Content>{requireTemp}</DictInfo.Content>
            </DictInfo>
          )}

          {minimumTemp !== '' && (
            <DictInfo>
              <DictInfo.Title>겨울 최저 온도</DictInfo.Title>
              <DictInfo.Content>{minimumTemp}</DictInfo.Content>
            </DictInfo>
          )}

          {smell !== '' && (
            <DictInfo>
              <DictInfo.Title>냄새</DictInfo.Title>
              <DictInfo.Content>{smell}</DictInfo.Content>
            </DictInfo>
          )}

          {poison !== '' && (
            <DictInfo>
              <DictInfo.Title>독성</DictInfo.Title>
              <DictInfo.Content>{poison}</DictInfo.Content>
            </DictInfo>
          )}
        </PropsBox>

        <ManageInfoBox>
          <p>특별 관리 정보</p>
          <span>{specialManageInfo}</span>
        </ManageInfoBox>
      </ContentBox>
    </Wrapper>
  );
};

export default DictionaryDetail;
