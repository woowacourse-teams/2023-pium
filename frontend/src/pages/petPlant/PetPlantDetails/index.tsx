import { useParams } from 'react-router-dom';
import PageLogger from 'components/@common/PageLogger';
import PetPlantDetailContent from 'components/petPlant/PetPlantDetail';

const PetPlantDetails = () => {
  const { id } = useParams();

  return (
    <PageLogger>
      <PetPlantDetailContent petPlantId={Number(id)} />
    </PageLogger>
  );
};

export default PetPlantDetails;
