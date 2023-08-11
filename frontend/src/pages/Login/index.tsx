import { useNavigate } from 'react-router-dom';
import KakaoLoginLarge from 'components/@common/Icons/KakaoLoginLarge';
import { ContentBox, GoToMain, LoginBox, Title, Wrapper } from './Login.style';
import Auth from 'apis/auth';
import { URL_PATH } from 'constants/index';

const Login = () => {
  const navigate = useNavigate();
  const { getAuthorization } = Auth;

  const goToMainHandler = () => navigate(URL_PATH.main);

  return (
    <Wrapper>
      <ContentBox>
        <Title>식물 오답노트 피움</Title>
      </ContentBox>

      <LoginBox>
        <div>
          <GoToMain type="button" onClick={goToMainHandler} aria-label="메인으로 돌아가기">
            메인으로 돌아가기
          </GoToMain>
        </div>
        <div>
          <KakaoLoginLarge
            aria-label="카카오 로그인"
            width="235px"
            height="59px"
            onClick={getAuthorization}
          />
        </div>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;
