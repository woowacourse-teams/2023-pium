const getResult = (name: string) => {
  return fetch(`search?name=${name}`);
};

const searchAPI = {
  getResult,
};

export default searchAPI;
