import { BASE_URL } from 'constants/index';

const KAKAO_AUTH_URL = 'https://kauth.kakao.com';
const CLIENT_ID = `${process.env.KAKAO_REST_KEY}`;
const REDIRECT_URI = `${process.env.KAKAO_REDIRECT_URL}`;

const AUTHORIZATION_URL = `${KAKAO_AUTH_URL}/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const getSessionId = (code: string, deviceToken: string | null) => {
  const body = {
    code,
    deviceToken,
  };
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
  });
};

// 로그아웃시에 token은 필요 없지 않을까?
const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};

const withdraw = () => {
  return fetch(`${BASE_URL}/members/withdraw`, {
    method: 'DELETE',
    credentials: 'include',
  });
};

const checkSessionId = () => {
  return fetch(`${BASE_URL}/members/me`, {
    method: 'GET',
    credentials: 'include',
  });
};

const AuthAPI = {
  getSessionId,
  AUTHORIZATION_URL,
  logout,
  withdraw,
  checkSessionId,
};

export default AuthAPI;
