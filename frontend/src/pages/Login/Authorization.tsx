import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import useAuth from 'hooks/useAuth';
import { URL_PATH } from 'constants/index';

const Authorization = () => {
  const { userLogin } = useAuth();
  const setUserInfo = useSetRecoilState(userInfo);

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const navigate = useNavigate();

  const { isSuccess } = userLogin(code ?? '');

  useEffect(() => {
    if (isSuccess) {
      setUserInfo({ isLogin: true });
      navigate(URL_PATH.main);
    }
  }, [isSuccess, navigate]);

  return <></>;
};

export default Authorization;
