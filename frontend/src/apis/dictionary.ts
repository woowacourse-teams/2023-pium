export const DICT = '/dictionary-plants';

const getDetail = (id: number) => {
  return fetch(`/${DICT}/${id}`, { method: 'GET' });
};

const getNameSearch = (name: string) => {
  return fetch(`/${DICT}?name=${name}`, { method: 'GET' });
};

const DictAPI = {
  getDetail,
  getNameSearch,
};

export default DictAPI;
