const DICT = '/dictionary-plants';

const getDictInfo = (id: string) => {
  return fetch(`${DICT}/${id}`, { method: 'GET' });
};

const getResult = (name: string) => {
  return fetch(`${DICT}?name=${name}`, { method: 'GET' });
};

const dictAPI = {
  getDictInfo,
  getResult,
};

export default dictAPI;
