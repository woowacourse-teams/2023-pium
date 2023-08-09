const KAKAO_AUTH_URL = 'https://kauth.kakao.com';
const GRANT_TYPE = 'authorization_code';
const KAKAO_API_URL = 'https://kapi.kakao.com';

const CLIENT_ID = `${process.env.KAKAO_REST_KEY}`;
const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? `${process.env.KAKAO_REDIRECT_DEVELOP}`
    : `${process.env.KAKAO_REDIRECT_PRODUCTION}`;

const useKakao = () => {
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

  const kakaoLoginHandler = () => {
    window.location.href = `${KAKAO_AUTH_URL}/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return { kakaoLoginHandler, getToken };
};

export default useKakao;
