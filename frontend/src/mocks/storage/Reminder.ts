import { Reminder } from "types/api/reminder";

const KEY = 'MSW_REMINDER';

const getAll = (): Reminder[] => {
  const storageData = sessionStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : [];
};

const Reminder = { getAll };

export default Reminder;
