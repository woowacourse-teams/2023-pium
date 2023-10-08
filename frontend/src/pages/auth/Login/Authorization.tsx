import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import useLogin from 'hooks/queries/auth/useLogin';
import { URL_PATH } from 'constants/index';

const Authorization = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { mutate } = useLogin();

  useEffect(() => {
    mutate(code ?? '');
  }, []);

  return <Navigate to={URL_PATH.reminder} replace />;
};

export default Authorization;
