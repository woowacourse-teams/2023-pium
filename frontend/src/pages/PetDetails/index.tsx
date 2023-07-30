import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'components/@common/Spinner';
import PetDetailsContent from 'components/PetDetails';

const PetDetails = () => {
  const { id } = useParams();

  return (
    <Suspense fallback={<Spinner />}>
      <PetDetailsContent petPlantId={Number(id)} />
    </Suspense>
  );
};

export default PetDetails;
