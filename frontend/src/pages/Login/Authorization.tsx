import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import Auth from 'apis/auth';
import { URL_PATH } from 'constants/index';

const Authorization = () => {
  const { getToken, getUserInfo } = Auth;
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (code !== null) {
      const getData = async () => {
        try {
          const token = await getToken(code);
          const userInfo = await getUserInfo(token);
          localStorage.setItem('userId', userInfo.id);
          setUserInfo({
            isLogin: true,
            id: `${userInfo.id}`,
          });
        } finally {
          navigate(URL_PATH.main);
        }
      };
      getData();
    }
  });

  return <></>;
};

export default Authorization;
