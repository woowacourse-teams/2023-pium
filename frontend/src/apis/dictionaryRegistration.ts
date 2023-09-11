import type { DictionaryRegistrationForm } from 'types/dictionaryRegistration';
import { BASE_URL } from 'constants/index';

const DICTIONARY_PLANT_REGISTRATION_URL = `${BASE_URL}/dictionary-registrations`;

const register = (form: DictionaryRegistrationForm) => {
  const { name, image } = form;
  const formData = new FormData();

  if (name) formData.append('name', name);
  if (image) formData.append('image', image);

  return fetch(DICTIONARY_PLANT_REGISTRATION_URL, {
    method: 'POST',
    body: formData,
  });
};

const DictionaryRegistrationAPI = {
  register,
};

export default DictionaryRegistrationAPI;
