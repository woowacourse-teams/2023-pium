import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { URL_PATH } from 'constants/index';

const Authorization = () => {
  const { userLogin } = useAuth();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  const navigate = useNavigate();

  const { isSuccess } = userLogin(code ?? '');

  useEffect(() => {
    if (isSuccess) navigate(URL_PATH.main);
  }, [isSuccess, navigate]);

  return <></>;
};

export default Authorization;
