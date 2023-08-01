import { ChangeDateParams, WaterPlantParams } from 'types/api/reminder';
import { BASE_URL } from 'constants/index';

export const REMINDER = `${BASE_URL}/reminders`;

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'pium@gmail.com',
};

const getReminder = () => {
  return fetch(REMINDER, {
    method: 'GET',
    headers,
  });
};

const waterPlant = ({ id, body }: WaterPlantParams) => {
  return fetch(`${REMINDER}/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
};

const changeDate = ({ id, body }: ChangeDateParams) => {
  return fetch(`${REMINDER}/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });
};

const ReminderAPI = {
  getReminder,
  waterPlant,
  changeDate,
};

export default ReminderAPI;
