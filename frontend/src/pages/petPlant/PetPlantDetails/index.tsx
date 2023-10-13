import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'pages/@common/Loading';
import Navbar from 'components/@common/Navbar';
import PageLogger from 'components/@common/PageLogger';
import PetPlantDetailContent from 'components/petPlant/PetPlantDetail';

const PetPlantDetails = () => {
  const { id } = useParams();

  return (
    <PageLogger>
      <Suspense fallback={<Loading />}>
        <PetPlantDetailContent petPlantId={Number(id)} />
      </Suspense>
      <Navbar />
    </PageLogger>
  );
};

export default PetPlantDetails;
