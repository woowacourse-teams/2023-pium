import { Link, generatePath } from 'react-router-dom';
import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import PetPlantCard from 'components/petPlant/PetPlantCard';
import { CardList, Wrapper } from '../../PetPlantCardList/PetPlantCardList.style';
import { SubTitle } from './Pick.style';
import usePetPlantCardList from 'hooks/queries/petPlant/usePetPlantCardList';
import { URL_PATH } from 'constants/index';

const PetPlantCardList = () => {
  const { data: petPlantCardList } = usePetPlantCardList();
  return (
    <>
      <ContentHeader title="모두의 정원에 글쓰기" />
      <SubTitle>반려 식물을 골라주세요.</SubTitle>
      <Wrapper>
        <CardList>
          {petPlantCardList.map((petPlantCard) => (
            <Link
              key={petPlantCard.id}
              to={generatePath(URL_PATH.gardenRegisterForm, { id: String(petPlantCard.id) })}
              aria-label={`${petPlantCard.nickname} 게시글 작성하기`}
            >
              <PetPlantCard {...petPlantCard} />
            </Link>
          ))}
        </CardList>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default PetPlantCardList;
