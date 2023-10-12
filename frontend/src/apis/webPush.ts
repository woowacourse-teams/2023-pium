import { BASE_URL } from 'constants/index';

export const SUBSCRIBE_URL = `${BASE_URL}/members/notification`;

const headers = {
  'Content-Type': 'application/json',
};

const subscribe = (token: string) => {
  return fetch(SUBSCRIBE_URL, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ token }),
  });
};

const unSubscribe = () => {
  return fetch(SUBSCRIBE_URL, {
    method: 'DELETE',
    credentials: 'include',
    headers,
  });
};

const currentSubscribe = () => {
  return fetch(SUBSCRIBE_URL, {
    method: 'GET',
    credentials: 'include',
    headers,
  });
};

const WebPushAPI = {
  subscribe,
  unSubscribe,
  currentSubscribe,
};

export default WebPushAPI;
