import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PageArea, Wrapper } from './RootTemplate.style';
import { userInfo } from 'store/atoms/userInfo';
import useToast from 'hooks/useToast';
import { GUIDE, URL_PATH } from 'constants/index';

const RootTemplate = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLogin } = useRecoilValue(userInfo);
  const { addToast } = useToast();

  const { login, petList, reminder, myPage } = URL_PATH;
  const loginUrl = [petList, reminder, myPage];

  useEffect(() => {
    if (!isLogin) {
      const invalidPath = loginUrl.find((url) => pathname.includes(url));

      if (invalidPath) {
        addToast('warning', GUIDE.login);
        navigate(login);
      }
    }
  }, [pathname, isLogin]);

  return (
    <Wrapper>
      <PageArea>
        <Outlet />
      </PageArea>
    </Wrapper>
  );
};

export default RootTemplate;
