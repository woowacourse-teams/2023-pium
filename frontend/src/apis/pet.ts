import { NewPetPlantRequest } from 'types/api/petPlant';
import { BASE_URL } from 'constants/index';

export const PET = `${BASE_URL}/pet-plants`;

const postForm = (form: NewPetPlantRequest) => {
  return fetch(PET, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form }),
  });
};

const petPlantsAPI = {
  postForm,
};

export default petPlantsAPI;
