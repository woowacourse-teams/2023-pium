import { useNavigate, useParams } from 'react-router-dom';
import { URL_PATH } from 'constants/index';

type Redirect = (typeof URL_PATH)[keyof typeof URL_PATH];

const useInvalidIdParams = (redirect: Redirect = URL_PATH.MAIN) => {
  const { id } = useParams();
  const navigation = useNavigate();

  if (id === undefined) {
    navigation(redirect);
    return '';
  }

  return id;
};

export default useInvalidIdParams;
