import { ChangeDateProps, WaterPlantProps } from 'types/api/reminder';
import { BASE_URL } from 'constants/index';

export const REMINDER = `${BASE_URL}/reminders`;

const getReminder = () => {
  return fetch(REMINDER, {
    method: 'GET',
  });
};

const waterPlant = ({ id, body }: WaterPlantProps) => {
  return fetch(`${REMINDER}/${id}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

const changeDate = ({ id, body }: ChangeDateProps) => {
  return fetch(`${REMINDER}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

const ReminderAPI = {
  getReminder,
  waterPlant,
  changeDate,
};

export default ReminderAPI;
