import type { PetPlant } from 'types/api/petPlant';
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
import { getDateToString } from 'utils/date';

const PetPlantCard = ({
  imageUrl,
  nickname,
  daySince,
  birthDate,
  dictionaryPlantName,
}: PetPlant) => {
  return (
    <Wrapper>
      <CrownArea>{getDateToString() === birthDate && <Crown />}</CrownArea>
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
