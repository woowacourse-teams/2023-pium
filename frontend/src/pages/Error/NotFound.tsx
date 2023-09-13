import { useNavigate } from 'react-router-dom';
import { Button, Section, Text, Title, Wrapper } from './Error.style';
import useResetErrorBoundary from 'hooks/useResetErrorBoundary';
import { URL_PATH } from 'constants/index';
import SadPiumiImageSvg from 'assets/sadpiumi.svg';
import SadPiumiImageWebp from 'assets/sadpiumi.webp';

const NotFound = () => {
  const navigate = useNavigate();
  const resetError = useResetErrorBoundary();

  const reloadWindow = () => {
    resetError?.();
    location.reload();
  };

  const goToMain = () => {
    resetError?.();
    navigate(URL_PATH.main, { replace: true });
  };

  return (
    <Wrapper>
      <picture>
        <source srcSet={SadPiumiImageWebp} width={250} height={250} type="image/wepb" />
        <SadPiumiImageSvg viewBox="0 0 720 457" aria-label="슬픈 표정을 하는 피우미" />
      </picture>
      <Section>
        <Text>이런!</Text>
        <Title>페이지를 찾지 못했어요</Title>
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
