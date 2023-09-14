import { useNavigate } from 'react-router-dom';
import { Section, Wrapper, Text, Title, Button, SadPiumiImage } from './Error.style';
import { GUIDE, URL_PATH } from 'constants/index';
import SadPiumiImageSvg from 'assets/sadpiumi.svg';
import SadPiumiImageWebp from 'assets/sadpiumi.webp';

const Unauthorize = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate(URL_PATH.main, { replace: true });
  };
  const goToLogin = () => {
    navigate(URL_PATH.login, { replace: true });
  };

  return (
    <Wrapper>
      <picture>
        <source srcSet={SadPiumiImageWebp} type="image/webp" />
        <SadPiumiImage src={SadPiumiImageSvg} alt="슬픈 표정을 하는 피우미" />
      </picture>
      <Section>
        <Text>웁스!</Text>
        <Title>{GUIDE.sessionExpire}</Title>
      </Section>
      <Section>
        <Button type="button" onClick={goToMain} aria-label="메인으로 이동">
          메인 화면으로
        </Button>
        <Button type="button" onClick={goToLogin} aria-label="로그인 화면으로 이동">
          로그인 하러가기
        </Button>
      </Section>
    </Wrapper>
  );
};

export default Unauthorize;
