const getNameSearch = (name: string) => {
  return fetch(`/dictionary-plants?name=${name}`, { method: 'GET' });
};

const DictAPI = {
  getNameSearch,
};

export default DictAPI;
