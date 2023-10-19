import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ContentHeader from 'components/@common/ContentHeader';
import PageLogger from 'components/@common/PageLogger';
import GardenRegisterFormSection from 'components/garden/GardenRegisterFormSection';
import Profile from 'components/petPlant/Profile';
import ProfileSkeleton from 'components/petPlant/Profile/ProfileSkeleton';
import { Main } from './GardenRegisterForm.style';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';

const GardenRegisterForm = () => {
  useCheckSessionId();

  const { id: petPlantId } = useParams();
  if (!petPlantId) throw new Error('URL에 id가 없습니다.');

  return (
    <PageLogger>
      <ContentHeader title="모두의 정원에 기록하기" />
      <Main>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile petPlantId={Number(petPlantId)} />
        </Suspense>
        <GardenRegisterFormSection petPlantId={Number(petPlantId)} />
      </Main>
    </PageLogger>
  );
};

export default GardenRegisterForm;
