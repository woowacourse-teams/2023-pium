import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { URL_PATH } from 'constants/index';

const Authorization = () => {
  const { userLogin } = useAuth();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  const navigate = useNavigate();

  if (code === null) throw new Error('33');

  const { isSuccess } = userLogin(code);

  if (isSuccess) navigate(URL_PATH.main);

  return <></>;
};

export default Authorization;
