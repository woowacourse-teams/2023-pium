import type { PetPlantDetails } from 'types/petPlant';
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

const register = (form: FormData) => {
  return fetch(PET_PLANT_URL, {
    method: 'POST',
    credentials: 'include',
    body: form,
  });
};

const getDetails = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET_PLANT_URL}/${petPlantId}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
};

const edit = (petPlantId: PetPlantDetails['id'], form: FormData) => {
  return fetch(`${PET_PLANT_URL}/${petPlantId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: form,
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
