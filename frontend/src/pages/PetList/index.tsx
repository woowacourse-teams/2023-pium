import { Link, generatePath } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import PetCard from 'components/PetCard';
import { PetCardList, RegisterButton, Title, Wrapper } from './PetList.style';
import usePetPlantCardList from 'hooks/queries/pet/usePetPlantCardList';
import { URL_PATH } from 'constants/index';

const PetList = () => {
  const { data: petPlantCardList } = usePetPlantCardList();
  return (
    <>
      <Wrapper>
        <Title>나의 식물 카드</Title>
        <PetCardList>
          <Link to={URL_PATH.petRegisterSearch} aria-label="식물 추가로 이동">
            <RegisterButton type="button">+</RegisterButton>
          </Link>
          {petPlantCardList?.map((petPlantCard) => (
            <Link
              key={petPlantCard.id}
              to={generatePath(URL_PATH.petDetail, { id: String(petPlantCard.id) })}
              aria-label={`${petPlantCard.nickname} 상세로 이동`}
            >
              <PetCard {...petPlantCard} />
            </Link>
          ))}
        </PetCardList>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default PetList;