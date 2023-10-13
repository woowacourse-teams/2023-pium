import { useParams } from 'react-router-dom';
import PageLogger from 'components/@common/PageLogger';
import PetPlantEditForm from 'components/petPlant/PetPlantEditForm';
import usePetPlantDetails from 'hooks/queries/petPlant/usePetPlantDetails';

const PetPlantEdit = () => {
  const { id } = useParams();
  const { data: petPlantDetails } = usePetPlantDetails(Number(id));

  return (
    <PageLogger>
      <PetPlantEditForm {...petPlantDetails} />
    </PageLogger>
  );
};

export default PetPlantEdit;
