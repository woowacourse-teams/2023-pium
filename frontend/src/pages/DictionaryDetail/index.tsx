import { AiFillWarning } from 'react-icons/ai';
import { BsThermometerSun, BsThermometerSnow } from 'react-icons/bs';
import { GiFragrance } from 'react-icons/gi';
import { PiPottedPlantFill } from 'react-icons/pi';
import { WiHumidity } from 'react-icons/wi';
import DictInfo from 'components/DictInfo';
import DictInfoSwitch from 'components/DictInfoSwitch';
import {
  Accent,
  ContentBox,
  FamilyName,
  HeaderBox,
  ManageInfoBox,
  Name,
  PlantImage,
  PropBox,
  PropsBox,
  Wrapper,
} from './DictionaryDetail.style';
import useDictionaryPlants from 'hooks/useDictionaryPlants';
import useInvalidIdParams from 'hooks/useInvalidIdParams';
import { MANAGE_LEVEL_COLOR } from 'constants/index';

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

  console.log(MANAGE_LEVEL_COLOR[manageLevel]);

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
        <div>
          <DictInfo alignment="row">
            <DictInfo.Title>난이도</DictInfo.Title>
            <DictInfo.Content variant={MANAGE_LEVEL_COLOR[manageLevel]}>
              {manageLevel}
            </DictInfo.Content>
          </DictInfo>
        </div>
        <div>
          <DictInfoSwitch title="물 주기" optionMap={waterOptions} />
        </div>
        <div>
          <DictInfo>
            <DictInfo.Title>추천 장소</DictInfo.Title>
            {place}
          </DictInfo>
        </div>

        <PropsBox>
          {growSpeed !== '' && (
            <PropBox>
              <PiPottedPlantFill color="#1BCC66" />
              <span>
                생장 속도는 <Accent>{`"${growSpeed}"`}</Accent>이에요🌱
              </span>
            </PropBox>
          )}

          {requireHumidity !== '' && (
            <PropBox>
              <WiHumidity color="#1BCC66" />
              <span>
                권장 습도는 <Accent>{`"${requireHumidity}"`}</Accent>에요💧
              </span>
            </PropBox>
          )}

          {requireTemp !== '' && (
            <PropBox>
              <BsThermometerSun color="#1BCC66" />
              <span>
                권장 온도는 <Accent>{`"${requireTemp}"`}</Accent>에요🥰
              </span>
            </PropBox>
          )}

          {minimumTemp !== '' && (
            <PropBox>
              <BsThermometerSnow color="#1BCC66" />
              <span>
                적어도 <Accent>{`"${minimumTemp}"`}</Accent> 이상에서 키워야 해요!🥶
              </span>
            </PropBox>
          )}

          {smell !== '' && (
            <PropBox>
              <GiFragrance color="#1BCC66" />
              <span>
                냄새는 <Accent>{`"${smell}"`}</Accent>이에요!🪄
              </span>
            </PropBox>
          )}

          {poison !== '' && (
            <PropBox>
              <AiFillWarning color="#EB4D3D" />
              <span>
                독성은 <Accent>{`"${poison}"`}</Accent> 이에요!🚨
              </span>
            </PropBox>
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
