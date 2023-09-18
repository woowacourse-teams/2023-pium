import type { ImageFormData } from 'types/image';
import type { NewPetPlantRequest, PetPlantDetails, EditPetPlantRequest } from 'types/petPlant';
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

const register = ({ imageData, requestForm }: ImageFormData<NewPetPlantRequest>) => {
  const formData = new FormData();

  if (imageData) {
    formData.append('image', imageData);
  }

  formData.append(
    'request',
    new Blob([JSON.stringify(requestForm)], {
      type: 'application/json',
    })
  );

  return fetch(PET_PLANT_URL, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
};

const getDetails = (petPlantId: PetPlantDetails['id']) => {
  return fetch(`${PET_PLANT_URL}/${petPlantId}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
};

const edit = (
  petPlantId: PetPlantDetails['id'],
  { imageData, requestForm }: ImageFormData<EditPetPlantRequest>
) => {
  const formData = new FormData();

  if (imageData) {
    formData.append('image', imageData);
  }

  formData.append(
    'request',
    new Blob([JSON.stringify(requestForm)], {
      type: 'application/json',
    })
  );

  return fetch(`${PET_PLANT_URL}/${petPlantId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
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
