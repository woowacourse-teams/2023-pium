import { NewPetPlantRequest } from 'types/api/petPlant';

const postForm = (form: NewPetPlantRequest) => {
  return fetch('/pet-plants', { method: 'POST', body: JSON.stringify({ ...form }) });
};

const petPlantsAPI = {
  postForm,
};

export default petPlantsAPI;
