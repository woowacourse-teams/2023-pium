import { Link, generatePath } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import PetCard from 'components/PetCard';
import { PetCardList, RegisterButton, Title, Wrapper } from './PetList.style';
import usePetList from 'hooks/queries/pet/usePetList';
import { URL_PATH } from 'constants/index';

const PetList = () => {
  const { data: petList } = usePetList();

  return (
    <>
      <Wrapper>
        <Title>나의 식물 카드</Title>
        <PetCardList>
          <Link to={URL_PATH.petRegisterSearch}>
            <RegisterButton type="button">+</RegisterButton>
          </Link>
          {petList?.map((pet) => (
            <Link key={pet.id} to={generatePath(URL_PATH.petDetail, { id: String(pet.id) })}>
              <PetCard pet={pet} />
            </Link>
          ))}
        </PetCardList>
      </Wrapper>
      <Navbar />
    </>
  );
};
export default PetList;
