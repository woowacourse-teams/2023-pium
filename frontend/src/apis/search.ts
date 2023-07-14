const getResult = (name: string) => {
  return fetch(`search?name=${name}`, { method: 'GET' });
};

const searchAPI = {
  getResult,
};

export default searchAPI;
