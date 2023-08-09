const KAKAO_AUTH_URL = 'https://kauth.kakao.com';
const KAKAO_API_URL = 'https://kapi.kakao.com';
const GRANT_TYPE = 'authorization_code';

const CLIENT_ID = `${process.env.KAKAO_REST_KEY}`;
const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? `${process.env.KAKAO_REDIRECT_DEVELOP}`
    : `${process.env.KAKAO_REDIRECT_PRODUCTION}`;

const AUTHORIZATION_URL = `${KAKAO_AUTH_URL}/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const getToken = async (code: string) => {
  const response = await fetch(
    `${KAKAO_AUTH_URL}/oauth/token?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }
  );
  const { access_token } = await response.json();
  return access_token;
};

const getUserInfo = async (token: string) => {
  const response = await fetch(`${KAKAO_API_URL}/v2/user/me`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

const getAuthorization = () => {
  window.location.href = AUTHORIZATION_URL;
};

const Auth = {
  getToken,
  getUserInfo,
  getAuthorization,
};

export default Auth;
