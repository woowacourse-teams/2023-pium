import { LoadingImage, Wrapper } from './Loading.style';
import piumi from 'assets/piumi-emotionless.svg';

const Loading = () => {
  return (
    <Wrapper>
      <LoadingImage src={piumi} alt="로딩중입니다" role="status" />
    </Wrapper>
  );
};

export default Loading;
