import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'pages/Loading';
import Navbar from 'components/@common/Navbar';
import PetDetailsContent from 'components/PetDetails';

const PetDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <PetDetailsContent petPlantId={Number(id)} />
      </Suspense>
      <Navbar />
    </>
  );
};

export default PetDetails;
