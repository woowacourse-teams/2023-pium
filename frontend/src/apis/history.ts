import type { PetPlantDetails } from 'types/api/petPlant';
import { BASE_URL } from 'constants/index';

export const HISTORY = `${BASE_URL}/history`;

const getPetPlant = (petPlantId: PetPlantDetails['id'], page: number, size = 20) => {
  const url = `${HISTORY}/${petPlantId}?page=${page}&size=${size}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'pium@gmail.com',
    },
  });
};

const HistoryAPI = {
  getPetPlant,
};

export default HistoryAPI;
