import type { PetPlant } from 'types/api/petPlant';
import Crown from 'components/@common/Icons/Crown';
import Image from 'components/@common/Image';
import {
  ContentArea,
  ContentRow,
  DaySince,
  DaySinceNumber,
  DictionaryPlantName,
  ImageArea,
  Nickname,
  Wrapper,
} from './PetCard.style';
import { getToday } from 'utils/date';

type PetCardProps = PetPlant;

const PetCard = ({
  imageUrl,
  nickname,
  daySince,
  birthDate,
  dictionaryPlantName,
}: PetCardProps) => {
  return (
    <Wrapper>
      <ImageArea>
        <Image src={imageUrl} type="square" size="100%" />
      </ImageArea>
      <ContentArea>
        <Nickname>
          {nickname} {getToday() === birthDate && <Crown />}
        </Nickname>
        <ContentRow>
          <DictionaryPlantName>{dictionaryPlantName}</DictionaryPlantName>
          <DaySince>
            D+<DaySinceNumber>{daySince}</DaySinceNumber>
          </DaySince>
        </ContentRow>
      </ContentArea>
    </Wrapper>
  );
};

export default PetCard;
