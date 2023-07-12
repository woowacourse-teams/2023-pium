import { NewPetPlantRequest } from '../../types/api/petPlant';

const KEY = 'MSW_PET_PLANTS';

const getAll = (): NewPetPlantRequest[] => {
  const storageData = sessionStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : [];
};

const add = (newPlant: NewPetPlantRequest) => {
  const newData = [...getAll(), newPlant];
  sessionStorage.setItem(KEY, JSON.stringify(newData));
};

const PetPlant = { getAll, add };

export default PetPlant;
