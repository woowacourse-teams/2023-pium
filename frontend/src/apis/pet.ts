import type { NewPetPlantRequest } from 'types/api/petPlant';
import { BASE_URL } from 'constants/index';

export const PET = `${BASE_URL}/pet-plants`;

const getList = () => {
  return fetch(PET, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};

const postForm = (form: NewPetPlantRequest) => {
  return fetch(PET, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form }),
  });
};

const PetAPI = {
  getList,
  postForm,
};

export default PetAPI;
