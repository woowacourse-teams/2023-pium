import Fragrance from 'components/@common/Icons/Fragrance';
import Humidity from 'components/@common/Icons/Humidity';
import ManageLevel from 'components/@common/Icons/ManageLevel';
import PottedPlant from 'components/@common/Icons/PottedPlant';
import ThermometerSnow from 'components/@common/Icons/ThermometerSnow';
import ThermometerSun from 'components/@common/Icons/ThermometerSun';
import Warning from 'components/@common/Icons/Warning';
import TagBox from 'components/dictionaryPlant/TagBox';
import TagSwitch from 'components/dictionaryPlant/TagSwitch';
import {
  Accent,
  ContentBox,
  FamilyName,
  HeaderBox,
  ManageInfoBox,
  Name,
  PropBox,
  PropsBox,
} from './DictionaryPlantContent.style';
import type { DictPlantExtendCycles } from 'hooks/queries/dictionary/useDictDetail';
import parseTemperature from 'utils/parseTemperature';
import { NO_INFORMATION } from 'constants/index';

const DictionaryPlantContent = (props: DictPlantExtendCycles) => {
  const {
    postingPlace,
    familyName,
    name,
    manageLevel,
    growSpeed,
    requireHumidity,
    requireTemp,
    minimumTemp,
    smell,
    poison,
    specialManageInfo,
    waterOptions,
  } = props;

  const place = postingPlace.map((position, idx) => {
    const text = position === NO_INFORMATION ? '제공된 정보가 없어요😢' : position;
    return <TagBox.Content key={idx}>{text}</TagBox.Content>;
  });

  const { type: tempType, temperature: minTemp } = parseTemperature(minimumTemp);

  return (
    <>
      <HeaderBox>
        <div>
          <Name>{name}</Name>
          <FamilyName>{familyName}</FamilyName>
        </div>
      </HeaderBox>
      <ContentBox>
        <div>
          <TagSwitch title="물 주기" optionMap={waterOptions} />
        </div>
        <div>
          <TagBox>
            <TagBox.Title>추천 장소</TagBox.Title>
            {place}
          </TagBox>
        </div>

        <PropsBox>
          <PropBox>
            <ManageLevel level={manageLevel} color="#1BCC66" />
            <span>
              {manageLevel !== NO_INFORMATION ? (
                <>
                  이 식물은 <Accent>{`"${manageLevel}"`}</Accent>에게 추천해요🌻
                </>
              ) : (
                '키우기 난이도 정보를 찾을 수 없어요😭'
              )}
            </span>
          </PropBox>

          <PropBox>
            <PottedPlant color="#1BCC66" />
            <span>
              {growSpeed !== NO_INFORMATION ? (
                <>
                  생장 속도는 <Accent>{`"${growSpeed}"`}</Accent>이에요🌱
                </>
              ) : (
                '생장 속도 정보를 찾을 수 없어요🌱'
              )}
            </span>
          </PropBox>

          <PropBox>
            <Humidity color="#1BCC66" />
            <span>
              {requireHumidity !== NO_INFORMATION ? (
                <>
                  권장 습도는 <Accent>{`"${requireHumidity}"`}</Accent>에요💧
                </>
              ) : (
                '권장 습도 정보를 찾을 수 없어요💧'
              )}
            </span>
          </PropBox>

          <PropBox>
            <ThermometerSun color="#1BCC66" />
            <span>
              {requireTemp !== NO_INFORMATION ? (
                <>
                  권장 온도는 <Accent>{`"${requireTemp}"`}</Accent>에요🥰
                </>
              ) : (
                '권장 온도 정보를 찾을 수 없어요😢'
              )}
            </span>
          </PropBox>

          <PropBox>
            <ThermometerSnow color="#1BCC66" />
            <span>
              {minimumTemp !== NO_INFORMATION ? (
                <>
                  적어도 <Accent>{`"${minTemp} ${tempType}"`}</Accent> 에서 키워야 해요!🥶
                </>
              ) : (
                '겨울철 최저 온도 정보를 찾을 수 없어요🥶'
              )}
            </span>
          </PropBox>

          <PropBox>
            <Fragrance color="#1BCC66" />
            <span>
              {smell !== NO_INFORMATION ? (
                <>
                  냄새는 <Accent>{`"${smell}"`}</Accent>이에요🤧
                </>
              ) : (
                '냄새 정보를 찾을 수 없어요🤧'
              )}
            </span>
          </PropBox>

          <PropBox>
            <Warning color="#EB4D3D" />
            <span>
              {poison !== NO_INFORMATION ? (
                <>
                  독성은 <Accent>{`"${poison}"`}</Accent> 이에요!🚨
                </>
              ) : (
                '독성 정보가 없어요🤔'
              )}
            </span>
          </PropBox>
        </PropsBox>

        <ManageInfoBox>
          <p>특별 관리 정보</p>
          <span>
            {specialManageInfo !== NO_INFORMATION
              ? specialManageInfo
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
                  )
              : '관련 정보가 없어요😇'}
          </span>
        </ManageInfoBox>
      </ContentBox>
    </>
  );
};

export default DictionaryPlantContent;
