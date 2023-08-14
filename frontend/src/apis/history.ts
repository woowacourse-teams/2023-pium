import type { HistoryType } from 'types/history';
import type { PetPlantDetails } from 'types/petPlant';
import { BASE_URL } from 'constants/index';

export const HISTORY = `${BASE_URL}/history`;

const getPetPlant = (
  petPlantId: PetPlantDetails['id'],
  page: number,
  size: number,
  filter: HistoryType[] = []
) => {
  let url = `${HISTORY}?petPlantId=${petPlantId}&page=${page}&size=${size}`;
  if (filter.length) url += `&filter="${filter.join(',')}"`;

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
