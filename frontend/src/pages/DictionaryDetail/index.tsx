import Fragrance from 'components/@common/Icons/Fragrance';
import Humidity from 'components/@common/Icons/Humidity';
import PottedPlant from 'components/@common/Icons/PottedPlant';
import ThermometerSnow from 'components/@common/Icons/ThermometerSnow';
import ThermometerSun from 'components/@common/Icons/ThermometerSun';
import Warning from 'components/@common/Icons/Warning';
import Image from 'components/@common/Image';
import Navbar from 'components/@common/Navbar';
import DictInfo from 'components/dictionaryPlant/DictInfo';
import DictInfoSwitch from 'components/dictionaryPlant/DictInfoSwitch';
import {
  Accent,
  ContentBox,
  FamilyName,
  HeaderBox,
  ManageInfoBox,
  Name,
  PropBox,
  PropsBox,
  Wrapper,
} from './DictionaryDetail.style';
import useDictDetail from 'hooks/queries/dictionary/useDictDetail';
import useInvalidIdParams from 'hooks/useInvalidIdParams';
import parseTemperature from 'utils/parseTemperature';
import { MANAGE_LEVEL_COLOR } from 'constants/index';

const DictionaryDetail = () => {
  const id = useInvalidIdParams();

  const { data: dictionary } = useDictDetail(id);

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

  const { type: tempType, temperature: minTemp } = parseTemperature(minimumTemp);

  return (
    <>
      <Wrapper>
        <Image type="wide" src={image} alt={name} size="300px" />
        <HeaderBox>
          <div>
            <Name>{name}</Name>
            <FamilyName>{familyName}</FamilyName>
          </div>
          <div>
            <DictInfo alignment="row">
              <DictInfo.Content variant={MANAGE_LEVEL_COLOR[manageLevel]}>
                {manageLevel}
              </DictInfo.Content>
            </DictInfo>
          </div>
        </HeaderBox>
        <ContentBox>
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
                <PottedPlant color="#1BCC66" />
                <span>
                  생장 속도는 <Accent>{`"${growSpeed}"`}</Accent>이에요🌱
                </span>
              </PropBox>
            )}

            {requireHumidity !== '' && (
              <PropBox>
                <Humidity color="#1BCC66" />
                <span>
                  권장 습도는 <Accent>{`"${requireHumidity}"`}</Accent>에요💧
                </span>
              </PropBox>
            )}

            {requireTemp !== '' && (
              <PropBox>
                <ThermometerSun color="#1BCC66" />
                <span>
                  권장 온도는 <Accent>{`"${requireTemp}"`}</Accent>에요🥰
                </span>
              </PropBox>
            )}

            {minimumTemp !== '' && (
              <PropBox>
                <ThermometerSnow color="#1BCC66" />
                <span>
                  적어도 <Accent>{`"${minTemp} ${tempType}"`}</Accent> 에서 키워야 해요!🥶
                </span>
              </PropBox>
            )}

            {smell !== '' && (
              <PropBox>
                <Fragrance color="#1BCC66" />
                <span>
                  냄새는 <Accent>{`"${smell}"`}</Accent>이에요🤧
                </span>
              </PropBox>
            )}

            {poison !== '' && (
              <PropBox>
                <Warning color="#EB4D3D" />
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
      <Navbar />
    </>
  );
};

export default DictionaryDetail;
