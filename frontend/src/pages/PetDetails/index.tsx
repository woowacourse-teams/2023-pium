import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'pages/Loading';
import PetDetailsContent from 'components/PetDetails';

const PetDetails = () => {
  const { id } = useParams();

  return (
    <Suspense fallback={<Loading />}>
      <PetDetailsContent petPlantId={Number(id)} />
    </Suspense>
  );
};

export default PetDetails;
