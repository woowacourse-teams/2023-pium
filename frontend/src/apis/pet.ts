import type { NewPetPlantRequest, PetPlantDetails } from 'types/api/petPlant';
import { BASE_URL } from 'constants/index';

export const PET = `${BASE_URL}/pet-plants`;

const getList = () => {
  return fetch(PET, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'pium@example.com',
    },
  });
};

const postForm = (form: NewPetPlantRequest) => {
  return fetch(PET, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'pium@example.com',
    },
    body: JSON.stringify({ ...form }),
  });
};

const getDetails = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET}/${petPlantId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'pium@example.com',
    },
  });
};

const PetAPI = {
  getList,
  postForm,
  getDetails,
};

export default PetAPI;
