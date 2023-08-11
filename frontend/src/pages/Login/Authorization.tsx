import { useEffect } from 'react';
import useAuth from 'hooks/useAuth';

const Authorization = () => {
  const { userLogin } = useAuth();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  useEffect(() => {
    if (code !== null) {
      console.log(code, 'effect Code');
      userLogin.mutate(code);
    }
  }, [code]);

  return <></>;
};

export default Authorization;
