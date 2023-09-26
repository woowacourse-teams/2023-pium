import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'pages/@common/Loading';
import Navbar from 'components/@common/Navbar';
import PetPlantDetailContent from 'components/petPlant/PetPlantDetail';

const PetPlantDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <PetPlantDetailContent petPlantId={Number(id)} />
      </Suspense>
      <Navbar />
    </>
  );
};

export default PetPlantDetails;
