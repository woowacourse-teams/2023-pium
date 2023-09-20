import type { DictionaryPlant } from 'types/dictionaryPlant';
import type { GardenRegisterForm } from 'types/garden';
import { BASE_URL } from 'constants/index';

export const GARDEN_URL = `${BASE_URL}/garden` as const;

const headers = {
  'Content-Type': 'application/json',
};

const getList = (dictionaryPlantId: DictionaryPlant['id'] | null, page: number) => {
  let url = `${GARDEN_URL}?page=${page}`;

  if (dictionaryPlantId) {
    url += `&filter=${dictionaryPlantId}`;
  }

  return fetch(url);
};

const register = (form: GardenRegisterForm) => {
  return fetch(GARDEN_URL, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(form),
  });
};

const GardenAPI = {
  getList,
  register,
};

export default GardenAPI;
