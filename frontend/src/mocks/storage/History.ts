const KEY = 'MSW_HISTORY';

const getAll = () => {
  const data = sessionStorage.getItem(KEY);
  const history: any[] = data ? JSON.parse(data) : [];

  return history;
};

const add = () => {
  const history = getAll();

  sessionStorage.setItem(
    KEY,
    JSON.stringify([
      {
        type: 'lastWaterDate',
        date: '2023-12-16',
        content: {
          previous: '2023-12-15',
          current: '2023-12-16',
        },
      },
      ...history,
    ])
  );
};

const History = { getAll, add };

export default History;
