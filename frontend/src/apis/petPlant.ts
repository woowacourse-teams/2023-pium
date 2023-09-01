import type { EditPetPlantRequest, NewPetPlantRequest, PetPlantDetails } from 'types/petPlant';
import { BASE_URL } from 'constants/index';

export const PET_PLANT_URL = `${BASE_URL}/pet-plants`;

const headers = {
  'Content-Type': 'application/json',
};

const getList = () => {
  return fetch(PET_PLANT_URL, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
};

const register = (form: NewPetPlantRequest) => {
  return fetch(PET_PLANT_URL, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(form),
  });
};

const getDetails = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET_PLANT_URL}/${petPlantId}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
};

const edit = (petPlantId: PetPlantDetails['id'], form: EditPetPlantRequest) => {
  return fetch(`${PET_PLANT_URL}/${petPlantId}`, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify(form),
  });
};

const remove = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET_PLANT_URL}/${petPlantId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers,
  });
};

const PetPlantAPI = {
  getList,
  register,
  getDetails,
  edit,
  remove,
};

export default PetPlantAPI;
