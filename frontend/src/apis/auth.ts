import { BASE_URL } from 'constants/index';

const KAKAO_AUTH_URL = 'https://kauth.kakao.com';
const CLIENT_ID = `${process.env.KAKAO_REST_KEY}`;
const REDIRECT_URI = `${process.env.KAKAO_REDIRECT_URL}`;

const AUTHORIZATION_URL = `${KAKAO_AUTH_URL}/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// TODO: 현재 sessionId가 유효한 값인지 확인하는 API 작성 필요
// -> 해당 API를 통해 로그인 여부 확인.

const getSessionId = (code: string) => {
  return fetch(`${BASE_URL}/login?code=${code}`, {
    method: 'POST',
  });
};

const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
  });
};

const withdraw = () => {
  return fetch(`${BASE_URL}/withdraw`, {
    method: 'POST',
  });
};

const getAuthorization = () => {
  window.location.href = AUTHORIZATION_URL;
};

const Auth = {
  getSessionId,
  getAuthorization,
  logout,
  withdraw,
};

export default Auth;
