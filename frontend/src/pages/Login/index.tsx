import KakaoLoginLarge from 'components/@common/Icons/KakaoLoginLarge';
import {
  ContentBox,
  GoToMain,
  KakaoLogin,
  LoginBox,
  PlantImg,
  PrimaryText,
  Text,
  Wrapper,
} from './Login.style';
import Auth from 'apis/auth';
import { URL_PATH } from 'constants/index';

const Login = () => {
  const { AUTHORIZATION_URL } = Auth;

  return (
    <Wrapper>
      <ContentBox>
        <Text>식물을 잘</Text>
        <Text>관리하고 싶다면?</Text>
        <Text>
          함께 해요 <PrimaryText>피움</PrimaryText>
        </Text>
        <PlantImg src="" alt="대충 식물 이미지 넣음" />
      </ContentBox>

      <LoginBox>
        <GoToMain to={URL_PATH.main} aria-label="메인으로 돌아가기">
          메인으로 돌아가기
        </GoToMain>
        <KakaoLogin to={AUTHORIZATION_URL} aria-label="카카오로 로그인하기">
          <KakaoLoginLarge />
        </KakaoLogin>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;
