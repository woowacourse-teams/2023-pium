import { Link, generatePath } from 'react-router-dom';
import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import PetPlantCard from 'components/petPlant/PetPlantCard';
import { CardList, Wrapper } from '../../PetPlantCardList/PetPlantCardList.style';
import { SubTitle } from './Pick.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import usePetPlantCardList from 'hooks/queries/petPlant/usePetPlantCardList';
import { URL_PATH } from 'constants/index';

const PetPlantCardList = () => {
  useCheckSessionId();
  const { data: petPlantCardList } = usePetPlantCardList();

  return (
    <>
      <ContentHeader title="모두의 정원에 글쓰기" />
      <SubTitle>반려 식물을 골라주세요.</SubTitle>
      <Wrapper>
        <CardList>
          {petPlantCardList.map((petPlantItem) => {
            const { id, nickname, imageUrl, dictionaryPlantName } = petPlantItem;
            return (
              <Link
                key={id}
                to={generatePath(URL_PATH.gardenRegisterForm, { id: String(id) })}
                aria-label={`${nickname} 게시글 작성하기`}
                state={{ nickname, imageUrl, dictionaryPlantName }}
              >
                <PetPlantCard {...petPlantItem} />
              </Link>
            );
          })}
        </CardList>
      </Wrapper>
      <Navbar />
    </>
  );
};

export default PetPlantCardList;
