import { useNavigate } from 'react-router-dom';
import { SadPiumiImage, Section, Wrapper, Text, Title, Button } from './Error.style';
import { GUIDE, URL_PATH } from 'constants/index';
import sadpiumi from 'assets/sadpiumi.svg';

const UnAuthorize = () => {
  const navigate = useNavigate();

  const goToMain = () => navigate(URL_PATH.main);
  const goToLogin = () => navigate(URL_PATH.login);

  return (
    <Wrapper>
      <SadPiumiImage src={sadpiumi} alt="슬픈 표정을 하는 피우미" />
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

export default UnAuthorize;
