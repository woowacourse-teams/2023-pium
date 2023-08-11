import { useNavigate } from 'react-router-dom';
import ArrowLeft from 'components/@common/Icons/ArrowLeft';
import KakaoLoginLarge from 'components/@common/Icons/KakaoLoginLarge';
import { LoginBox, Title, Wrapper } from './Login.style';
import Auth from 'apis/auth';
import { URL_PATH } from 'constants/index';

const Login = () => {
  const navigate = useNavigate();
  const { getAuthorization } = Auth;

  const goMainHandler = () => navigate(URL_PATH.main);

  return (
    <Wrapper>
      <div>
        <ArrowLeft
          onClick={goMainHandler}
          width="60px"
          height="60px"
          aria-label="메인으로 돌아가기"
        />
      </div>
      <LoginBox>
        <Title>로그인</Title>
        <div>
          <KakaoLoginLarge
            aria-label="카카오 로그인"
            width="270px"
            height="68px"
            onClick={getAuthorization}
          />
        </div>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;
