import type { Pet } from 'types/api/petPlant';
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

interface PetCardProps {
  pet: Pet;
  onClick?: (id: Pet['id']) => void;
}

const PetCard = ({ pet, onClick }: PetCardProps) => {
  const { id, imageUrl, nickname, dictionaryPlantName, daySince } = pet;

  const onClickWrapper = () => {
    onClick?.(id);
  };

  return (
    <Wrapper onClick={onClickWrapper}>
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
};

export default PetCard;
