import { BASE_URL } from 'constants/index';

export const DICT = `${BASE_URL}/dictionary-plants`;

const getDetail = (id: number) => {
  return fetch(`${DICT}/${id}`, { method: 'GET' });
};

const getNameSearch = (name: string) => {
  return fetch(`${DICT}?name=${name}`, { method: 'GET' });
};

const DictAPI = {
  getDetail,
  getNameSearch,
};

export default DictAPI;
