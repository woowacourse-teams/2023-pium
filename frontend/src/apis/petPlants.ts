import type { PetPlantForm } from 'types';

const postForm = (form: PetPlantForm) => {
  return fetch('pet-plants', { method: 'POST', body: JSON.stringify({ ...form }) });
};

const petPlantsAPI = {
  postForm,
};

export default petPlantsAPI;
