import type { PetPlantCard } from 'types/api/petPlant';
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

type PetCardProps = PetPlantCard;

const PetCard = ({ imageUrl, nickname, daySince, dictionaryPlantName }: PetCardProps) => (
  <Wrapper>
    <ImageArea>
      <Image src={imageUrl} type="square" size="100%" />
    </ImageArea>
    <ContentArea>
      <Nickname>{nickname}</Nickname>
      <ContentRow>
        <DictionaryPlantName>{dictionaryPlantName}</DictionaryPlantName>
        <DaySince>
          D+<DaySinceNumber>{daySince}</DaySinceNumber>
        </DaySince>
      </ContentRow>
    </ContentArea>
  </Wrapper>
);

export default PetCard;
