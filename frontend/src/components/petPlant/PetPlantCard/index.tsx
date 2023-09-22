import type { PetPlantItem } from 'types/petPlant';
import Image from 'components/@common/Image';
import SvgIcons from 'components/@common/SvgIcons/SvgFill';
import {
  ContentArea,
  ContentRow,
  CrownArea,
  DaySinceNumber,
  DictionaryPlantName,
  ImageArea,
  Nickname,
  Wrapper,
} from './PetPlantCard.style';
import { convertDateKorYear } from 'utils/date';

const PetPlantCard = ({
  imageUrl,
  nickname,
  daySince,
  birthDate,
  dictionaryPlantName,
}: PetPlantItem) => {
  const birthDateKorean = convertDateKorYear(birthDate);
  const today = convertDateKorYear(new Date()).slice(5);
  const isBirthday = today === birthDateKorean.slice(5);

  return (
    <Wrapper>
      <CrownArea>{isBirthday && <SvgIcons icon="crown" size={64} aria-hidden />}</CrownArea>
      <ImageArea>
        <Image src={imageUrl} type="square" size="160px" alt="반려 식물 이미지" />
      </ImageArea>
      <ContentArea>
        <Nickname aria-label="식물 별명">{nickname} </Nickname>
        <ContentRow>
          <DictionaryPlantName aria-label="식물 종류">{dictionaryPlantName}</DictionaryPlantName>
          <p aria-label="식물과 같이 지낸 시간">
            D+<DaySinceNumber>{daySince}</DaySinceNumber>
          </p>
        </ContentRow>
      </ContentArea>
    </Wrapper>
  );
};

export default PetPlantCard;
