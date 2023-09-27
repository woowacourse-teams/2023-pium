import { Link, generatePath } from 'react-router-dom';
import { CardList, Wrapper } from 'pages/petPlant/PetPlantCardList/PetPlantCardList.style';
import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import PetPlantCard from 'components/petPlant/PetPlantCard';
import { SubTitle } from './GardenRegisterPick.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import usePetPlantCardList from 'hooks/queries/petPlant/usePetPlantCardList';
import { URL_PATH } from 'constants/index';

const PetPlantPicker = () => {
  useCheckSessionId();
  const { data: petPlantCardList } = usePetPlantCardList();

  return (
    <>
      <ContentHeader title="모두의 정원에 기록하기" />
      <SubTitle>반려 식물을 골라주세요.</SubTitle>
      <Wrapper>
        <CardList>
          {petPlantCardList.map((petPlantItem) => (
            <Link
              key={petPlantItem.id}
              to={generatePath(URL_PATH.gardenRegisterForm, { id: String(petPlantItem.id) })}
              aria-label={`${petPlantItem.nickname} 게시글 작성하기`}
            >
              <PetPlantCard {...petPlantItem} />
            </Link>
          ))}
        </CardList>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default PetPlantPicker;
