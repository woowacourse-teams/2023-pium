import { ChangeDateParams, WaterPlantParams } from 'types/reminder';
import { BASE_URL } from 'constants/index';

export const REMINDER_URL = `${BASE_URL}/reminders`;

const headers = {
  'Content-Type': 'application/json',
};

const getReminder = () => {
  return fetch(REMINDER_URL, {
    method: 'GET',
    credentials: 'include',
    headers,
  });
};

const waterPlant = ({ id, body }: WaterPlantParams) => {
  return fetch(`${REMINDER_URL}/${id}`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(body),
  });
};

const changeDate = ({ id, body }: ChangeDateParams) => {
  return fetch(`${REMINDER_URL}/${id}`, {
    method: 'PATCH',
    credentials: 'include',
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
