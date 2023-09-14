import type { GardenRegisterForm } from 'types/garden';
import { BASE_URL } from 'constants/index';

export const GARDEN_URL = `${BASE_URL}/garden`;

const headers = {
  'Content-Type': 'application/json',
};

const register = (form: GardenRegisterForm) => {
  return fetch(GARDEN_URL, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(form),
  });
};

const GardenAPI = {
  register,
};

export default GardenAPI;
