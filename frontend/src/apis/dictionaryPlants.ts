const getDetail = (id: number) => {
  return fetch(`dictionary-plants/${id}`, { method: 'GET' });
};

const getSearch = (name: string) => {
  return fetch(`dictionary-plants?name=${name}`, { method: 'GET' });
};

const dictionaryPlantsAPI = {
  getDetail,
  getSearch,
};

export default dictionaryPlantsAPI;
