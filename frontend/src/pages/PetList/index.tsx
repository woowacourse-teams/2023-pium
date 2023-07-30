import { useNavigate } from 'react-router-dom';
import Navbar from 'components/@common/Navbar';
import PetCard from 'components/PetCard';
import { PetCardList, RegisterButton, Title, Wrapper } from './PetList.style';
import usePetList from 'hooks/queries/pet/usePetList';
import { URL_PATH } from 'constants/index';

const PetList = () => {
  const navigate = useNavigate();
  const { data: petList } = usePetList();

  const goRegister = () => {
    navigate(URL_PATH.petRegisterSearch);
  };

  const goPetDetail = (id: number) => {
    navigate(`/pet/${id}`);
  };

  return (
    <>
      <Wrapper>
        <Title>나의 식물 카드</Title>
        <PetCardList>
          <RegisterButton onClick={goRegister}>+</RegisterButton>
          {petList?.map((pet) => (
            <PetCard key={pet.id} pet={pet} onClick={goPetDetail} />
          ))}
        </PetCardList>
      </Wrapper>
      <Navbar />
    </>
  );
};
export default PetList;
