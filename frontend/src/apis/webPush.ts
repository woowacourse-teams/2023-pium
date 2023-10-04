import { BASE_URL } from 'constants/index';

export const SUBSCRIBE_URL = `${BASE_URL}/아직 몰라요`;

const headers = {
  'Content-Type': 'application/json',
};

const subscribe = (subscribe: PushSubscription) => {
  return fetch(SUBSCRIBE_URL, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(subscribe),
  });
};

const unSubscribe = (endpoint: string) => {
  return fetch(SUBSCRIBE_URL, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ endpoint }),
  });
};

const WebPushAPI = {
  subscribe,
  unSubscribe,
};

export default WebPushAPI;
