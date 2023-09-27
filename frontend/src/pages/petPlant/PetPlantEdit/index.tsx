import { useParams } from 'react-router-dom';
import PetPlantEditForm from 'components/petPlant/PetPlantEditForm';
import usePetPlantDetails from 'hooks/queries/petPlant/usePetPlantDetails';

const PetPlantEdit = () => {
  const { id } = useParams();
  const { data: petPlantDetails } = usePetPlantDetails(Number(id));

  return <PetPlantEditForm {...petPlantDetails} />;
};

export default PetPlantEdit;
