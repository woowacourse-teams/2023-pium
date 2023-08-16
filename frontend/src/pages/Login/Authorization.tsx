import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLogin from 'hooks/queries/auth/useLogin';
import { URL_PATH } from 'constants/index';

const Authorization = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { isSuccess } = useLogin(code ?? '');

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(URL_PATH.reminder);
    }
  }, [isSuccess, navigate]);

  return <></>;
};

export default Authorization;
