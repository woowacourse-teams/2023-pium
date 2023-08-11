import { useNavigate } from 'react-router-dom';
import { Button, SadPiumiImage, Section, Text, Title, Wrapper } from './Error.style';
import { URL_PATH } from 'constants/index';
import sadpiumi from 'assets/sadpiumi.svg';

const NotFound = () => {
  const navigate = useNavigate();

  const reloadWindow = () => location.reload();
  const goToMain = () => navigate(URL_PATH.main);

  return (
    <Wrapper>
      <SadPiumiImage src={sadpiumi} alt="슬픈 표정을 하는 피우미" />
      <Section>
        <Text>이런!</Text>
        <Title>페이지를 불러올 수 없어요</Title>
      </Section>
      <Section>
        <Text>주소가 올바른지 확인해 보세요</Text>
        <Text>잠시 후에 다시 시도해 주세요</Text>
      </Section>
      <Section>
        <Button type="button" onClick={goToMain}>
          메인 화면으로
        </Button>
        <Button type="button" onClick={reloadWindow}>
          새로고침
        </Button>
      </Section>
    </Wrapper>
  );
};

export default NotFound;
