import { Link, generatePath } from 'react-router-dom';
import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import PetCard from 'components/petPlant/PetPlantCard';
import { CardList, RegisterButton, Wrapper } from './PetPlantCardList.style';
import usePetPlantCardList from 'hooks/queries/petPlant/usePetPlantCardList';
import { URL_PATH } from 'constants/index';

const PetPlantCardList = () => {
  const { data: petPlantCardList } = usePetPlantCardList();
  return (
    <>
      <ContentHeader title="나의 식물 카드" />
      <Wrapper>
        <CardList>
          <Link to={URL_PATH.petRegisterSearch} aria-label="식물 추가로 이동">
            <RegisterButton type="button">+</RegisterButton>
          </Link>
          {petPlantCardList.map((petPlantCard) => (
            <Link
              key={petPlantCard.id}
              to={generatePath(URL_PATH.petDetail, { id: String(petPlantCard.id) })}
              aria-label={`${petPlantCard.nickname} 상세로 이동`}
            >
              <PetCard {...petPlantCard} />
            </Link>
          ))}
        </CardList>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default PetPlantCardList;
