import type { NewPetPlantRequest, PetPlantDetails } from 'types/api/petPlant';
import { BASE_URL } from 'constants/index';

export const PET = `${BASE_URL}/pet-plants`;

const postForm = (form: NewPetPlantRequest) => {
  return fetch(PET, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form }),
  });
};

const getDetails = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET}/${petPlantId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};

const PetAPI = {
  postForm,
  getDetails,
};

export default PetAPI;
