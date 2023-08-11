import { useParams, useNavigate } from 'react-router-dom';
import PetPlantEditForm from 'components/petPlant/PetPlantEditForm';
import usePetPlantDetails from 'hooks/queries/pet/usePetPlantDetails';
import useAddToast from 'hooks/useAddToast';
import { URL_PATH } from 'constants/index';

const PetPlantEdit = () => {
  const { id } = useParams();
  const { data } = usePetPlantDetails(Number(id));
  const navigate = useNavigate();
  const addToast = useAddToast();

  if (!data) {
    addToast('error', '존재하지 않는 반려식물이에요');
    navigate(URL_PATH.main, { replace: true });
    return null;
  }

  return <PetPlantEditForm {...data} />;
};

export default PetPlantEdit;
