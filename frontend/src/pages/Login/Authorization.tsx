import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'store/atoms/userInfo';
import useLogin from 'hooks/queries/auth/useLogin';
import { URL_PATH } from 'constants/index';

const Authorization = () => {
  const setUserInfo = useSetRecoilState(userInfo);

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { isSuccess } = useLogin(code ?? '');

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setUserInfo({ isLogin: true });
      navigate(URL_PATH.main);
    }
  }, [isSuccess, navigate]);

  return <></>;
};

export default Authorization;
