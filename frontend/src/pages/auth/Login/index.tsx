import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import AuthAPI from 'apis/auth';
import { URL_PATH } from 'constants/index';
import KakaoLoginLargePng from 'assets/kakao_login_large_narrow.png';
import KakaoLoginLargeWebp from 'assets/kakao_login_large_narrow.webp';

const IMAGE_SRC_LIST = [
  'https://static.pium.life/thumbnail/main1.png',
  'https://static.pium.life/thumbnail/main2.png',
  'https://static.pium.life/thumbnail/main3.png',
  'https://static.pium.life/thumbnail/main4.png',
  'https://static.pium.life/thumbnail/main5.png',
  'https://static.pium.life/thumbnail/main6.png',
];

const Login = () => {
  const { AUTHORIZATION_URL } = AuthAPI;

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
        <PlantImg
          loading="lazy"
          key={imageSrcIndex}
          src={IMAGE_SRC_LIST[imageSrcIndex]}
          alt="식물"
        />
      </ContentBox>

      <LoginBox>
        <GoToMain to={URL_PATH.main}>메인으로 돌아가기</GoToMain>
        <Link to={AUTHORIZATION_URL} aria-label="카카오로 로그인하기">
          <picture>
            <source srcSet={KakaoLoginLargeWebp} type="image/webp" />
            <KakaoLogin src={KakaoLoginLargePng} alt="카카오 로그인" />
          </picture>
        </Link>
      </LoginBox>
    </Wrapper>
  );
};

export default Login;
