import { useNavigate } from 'react-router-dom';
import ArrowLeft from 'components/@common/Icons/ArrowLeft';
import KakaoLoginLarge from 'components/@common/Icons/KakaoLoginLarge';
import { LoginBox, Title, Wrapper } from './Login.style';
import useKakao from 'hooks/useKakao';

const Login = () => {
  const navigate = useNavigate();
  const { kakaoLoginHandler } = useKakao();

  return (
    <Wrapper>
      <div>
        <ArrowLeft onClick={() => navigate(-1)} width="60px" height="60px" aria-label="뒤로 가기" />
      </div>
      <LoginBox>
        <Title>로그인</Title>
        <div>
          <KakaoLoginLarge
            aria-label="카카오 로그인"
            width="270px"
            height="68px"
            onClick={kakaoLoginHandler}
          />
        </div>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;
