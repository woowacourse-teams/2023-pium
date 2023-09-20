import { useNavigate } from 'react-router-dom';
import { Section, Wrapper, Text, Title, Button, SadPiumiImage, ButtonSection } from './Error.style';
import { GUIDE, URL_PATH } from 'constants/index';
import SadPiumiImagePng from 'assets/sadpiumi.png';
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
        <SadPiumiImage
          width={250}
          height={160}
          src={SadPiumiImagePng}
          alt="슬픈 표정을 하는 피우미"
        />
      </picture>
      <Section>
        <Text>웁스!</Text>
        <Title>{GUIDE.sessionExpire}</Title>
      </Section>
      <ButtonSection>
        <Button type="button" onClick={goToMain}>
          메인 화면으로
        </Button>
        <Button type="button" onClick={goToLogin}>
          로그인 하러가기
        </Button>
      </ButtonSection>
    </Wrapper>
  );
};

export default Unauthorize;
