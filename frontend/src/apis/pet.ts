import type { EditPetPlantRequest, NewPetPlantRequest, PetPlantDetails } from 'types/petPlant';
import { BASE_URL } from 'constants/index';

export const PET = `${BASE_URL}/pet-plants`;

const headers = {
  'Content-Type': 'application/json',
};

const getList = () => {
  return fetch(PET, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
};

const register = (form: NewPetPlantRequest) => {
  return fetch(PET, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(form),
  });
};

const getDetails = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET}/${petPlantId}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
};

const edit = (petPlantId: PetPlantDetails['id'], form: EditPetPlantRequest) => {
  return fetch(`${PET}/${petPlantId}`, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify(form),
  });
};

const remove = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET}/${petPlantId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers,
  });
};

const PetAPI = {
  getList,
  register,
  getDetails,
  edit,
  remove,
};

export default PetAPI;
