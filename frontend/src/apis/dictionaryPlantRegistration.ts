import type { DictionaryPlantRegistrationForm } from 'types/dictionaryPlant';
import { BASE_URL } from 'constants/index';

const DICTIONARY_PLANT_REGISTRATION_URL = `${BASE_URL}/dictionary-registrations`;

const register = (form: DictionaryPlantRegistrationForm) => {
  const { name, image } = form;
  const formData = new FormData();

  if (name)
    formData.append(
      'request',
      new Blob([JSON.stringify({ name })], {
        type: 'application/json',
      })
    );
  if (image) formData.append('image', image);

  return fetch(DICTIONARY_PLANT_REGISTRATION_URL, {
    method: 'POST',
    body: formData,
  });
};

const DictionaryPlantRegistrationAPI = {
  register,
};

export default DictionaryPlantRegistrationAPI;
