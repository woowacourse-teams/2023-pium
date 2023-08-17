import { useEffect, useState } from 'react';
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

const IMAGE_SRC_LIST = [
  'https://static.pium.life/thumbnail/main1.png',
  'https://static.pium.life/thumbnail/main2.png',
  'https://static.pium.life/thumbnail/main3.png',
  'https://static.pium.life/thumbnail/main4.png',
  'https://static.pium.life/thumbnail/main5.png',
  'https://static.pium.life/thumbnail/main6.png',
];

const Login = () => {
  const { AUTHORIZATION_URL } = Auth;

  const [imageSrcIndex, setImageSrcIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageSrcIndex((prev) => (prev + 1) % IMAGE_SRC_LIST.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Wrapper>
      <ContentBox>
        <Text>식물을 잘</Text>
        <Text>관리하고 싶다면?</Text>
        <Text>
          함께 해요 <PrimaryText>피움</PrimaryText>
        </Text>
        <PlantImg key={imageSrcIndex} src={IMAGE_SRC_LIST[imageSrcIndex]} alt="식물" />
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
