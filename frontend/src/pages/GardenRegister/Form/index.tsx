import { useParams, useLocation } from 'react-router-dom';
import ContentHeader from 'components/@common/ContentHeader';
import Navbar from 'components/@common/Navbar';
import { Main } from './Form.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import FormSection from './FormSection';
import Profile from './Profile';

const GardenRegisterForm = () => {
  useCheckSessionId();

  const { id: petPlantId } = useParams();
  if (!petPlantId) throw new Error('URL에 id가 없습니다.');

  const {
    state: { nickname, dictionaryPlantName, imageUrl },
  } = useLocation();

  return (
    <>
      <ContentHeader title="모두의 정원에 기록하기" />
      <Main>
        <Profile
          nickname={nickname}
          dictionaryPlantName={dictionaryPlantName}
          imageUrl={imageUrl}
        />
        <FormSection petPlantId={Number(petPlantId)} />
      </Main>
      <Navbar />
    </>
  );
};

export default GardenRegisterForm;
