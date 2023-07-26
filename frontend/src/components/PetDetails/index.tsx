import type { PetPlantDetails } from 'types/api/petPlant';
import Image from 'components/@common/Image';
import { Wrapper } from './PetDetails.style';
import usePetPlantDetails from 'hooks/queries/pet/usePetPlantDetails';
import { convertDateKorYear } from 'utils/date';

interface PetDetailsProps {
  petPlantId: PetPlantDetails['id'];
}

const PetDetails = ({ petPlantId }: PetDetailsProps) => {
  const { data: petPlantDetails } = usePetPlantDetails(petPlantId);
  console.log(petPlantDetails);
  if (!petPlantDetails) return null;

  const {
    imageUrl,
    nickname,
    dictionaryPlant: { id: dictId, name: dictName },
    birthDate,
    daySince,
    waterCycle,
    lastWaterDate,
    nextWaterDate,
    location,
    flowerpot,
    light,
    wind,
  } = petPlantDetails;

  return (
    <Wrapper>
      <Image type="wide" src={imageUrl} alt={`${nickname}(${dictName})`} height="300px" />
      <h1>{nickname}</h1>
      <h2>{dictName}</h2>
      <p>
        <span>생일</span>
        <span>{convertDateKorYear(birthDate)}</span>
      </p>
      <p>
        <span>함께한 지</span>
        <span>{daySince}일</span>
      </p>
      <section>
        <p>
          <span>물 주기</span>
          <span>
            <span>{waterCycle}</span>일
          </span>
        </p>
        <p>
          <span>마지막 물울 준 날</span>
          <span>{convertDateKorYear(lastWaterDate)}</span>
        </p>
        <p>
          <span>마지막 물울 준 날</span>
          <span>{convertDateKorYear(nextWaterDate)}</span>
        </p>
      </section>
      <section>
        <p>
          <span>장소</span>
          <span>{location}</span>
        </p>
        <p>
          <span>화분</span>
          <span>{flowerpot}</span>
        </p>
        <p>
          <span>햇살</span>
          <span>{light}</span>
        </p>
        <p>
          <span>바람</span>
          <span>{wind}</span>
        </p>
      </section>
    </Wrapper>
  );
};

export default PetDetails;
