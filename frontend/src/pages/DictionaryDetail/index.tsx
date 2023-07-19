import DictInfo from 'components/DictInfo';
import DictInfoSwitch from 'components/DictInfoSwitch';
import * as S from './DictionaryDetail.style';
import useDictionaryPlants from 'hooks/useDictionaryPlants';

const DictionaryDetail = () => {
  // const { id } = useParams();
  const { dictionary, waterOption } = useDictionaryPlants('1');

  if (!dictionary) {
    return <div>...loading</div>;
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
  } = dictionary;

  const place = postingPlace.map((position, idx) => (
    <DictInfo.Content key={idx}>{position}</DictInfo.Content>
  ));

  return (
    <S.Wrapper>
      <S.HeaderBox>
        <div>
          <S.FamilyName>{familyName}</S.FamilyName>
          <S.Name>{name}</S.Name>
        </div>
        <S.PlantImage src={image} alt={name} />
      </S.HeaderBox>
      <S.ContentBox>
        <S.LevelBox>
          <DictInfo alignment="row">
            <DictInfo.Title>난이도</DictInfo.Title>
            <DictInfo.Content>{manageLevel}</DictInfo.Content>
          </DictInfo>
        </S.LevelBox>
        <S.CycleBox>
          <DictInfoSwitch title="물 주기" optionMap={waterOption}></DictInfoSwitch>
        </S.CycleBox>
        <S.LocationBox>
          <DictInfo>
            <DictInfo.Title>추천 장소</DictInfo.Title>
            {place}
          </DictInfo>
        </S.LocationBox>

        <S.PropsBox>
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
        </S.PropsBox>

        <S.ManageInfoBox>
          <p>특별 관리 정보</p>
          <span>{specialManageInfo}</span>
        </S.ManageInfoBox>
      </S.ContentBox>
    </S.Wrapper>
  );
};

export default DictionaryDetail;
