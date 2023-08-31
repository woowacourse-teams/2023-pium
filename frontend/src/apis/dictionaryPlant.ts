import { BASE_URL } from 'constants/index';

export const DICT = `${BASE_URL}/dictionary-plants`;

const getDetail = (id: number) => {
  return fetch(`${DICT}/${id}`, { method: 'GET' });
};

const getSearch = (name: string) => {
  return fetch(`${DICT}?name=${name}`, { method: 'GET' });
};

const DictionaryPlantAPI = {
  getDetail,
  getSearch,
};

export default DictionaryPlantAPI;
