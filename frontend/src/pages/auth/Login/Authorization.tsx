import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from 'pages/@common/Loading';
import useLogin from 'hooks/queries/auth/useLogin';

const Authorization = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { mutate: login } = useLogin();

  useEffect(() => {
    login(code ?? '');
  }, [code, login]);

  return <Loading />;
};

export default Authorization;
