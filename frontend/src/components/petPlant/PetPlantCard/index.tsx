import type { PetPlantItem } from 'types/petPlant';
import Crown from 'components/@common/Icons/Crown';
import Image from 'components/@common/Image';
import {
  ContentArea,
  ContentRow,
  CrownArea,
  DaySince,
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
      <CrownArea>{isBirthday && <Crown />}</CrownArea>
      <ImageArea>
        <Image src={imageUrl} type="square" size="100%" alt="반려 식물 이미지" />
      </ImageArea>
      <ContentArea>
        <Nickname aria-label="식물 별명">{nickname} </Nickname>
        <ContentRow>
          <DictionaryPlantName aria-label="식물 종류">{dictionaryPlantName}</DictionaryPlantName>
          <DaySince aria-label="식물과 같이 지낸 시간">
            D+<DaySinceNumber>{daySince}</DaySinceNumber>
          </DaySince>
        </ContentRow>
      </ContentArea>
    </Wrapper>
  );
};

export default PetPlantCard;
