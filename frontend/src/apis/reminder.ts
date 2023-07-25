import { BASE_URL } from 'constants/index';

export const REMINDER = `${BASE_URL}/reminders`;

const getReminder = () => {
  return fetch(REMINDER, {
    method: 'GET',
  });
};

const reminderAPI = {
  getReminder,
};

export default reminderAPI;
