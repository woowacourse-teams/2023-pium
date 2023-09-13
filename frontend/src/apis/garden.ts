import type { DictionaryPlant } from 'types/dictionaryPlant';
import { BASE_URL } from 'constants/index';

export const GARDEN_URL = `${BASE_URL}/garden` as const;

const getList = (dictionaryPlantId: DictionaryPlant['id'] | null, page: number) => {
  let url = `${GARDEN_URL}?page=${page}`;

  if (dictionaryPlantId) {
    url += `&dictionaryPlantId=${dictionaryPlantId}`;
  }

  return fetch(url);
};

const GardenAPI = {
  getList,
};

export default GardenAPI;
