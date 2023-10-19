import { useParams } from 'react-router-dom';
import BackHeader from 'components/@common/BackHeader';
import PageLogger from 'components/@common/PageLogger';
import PetPlantDetailContent from 'components/petPlant/PetPlantDetail';

const PetPlantDetails = () => {
  const { id } = useParams();
  return (
    <PageLogger>
      <BackHeader transparentHeight={256} />
      <PetPlantDetailContent petPlantId={Number(id)} />
    </PageLogger>
  );
};

export default PetPlantDetails;
