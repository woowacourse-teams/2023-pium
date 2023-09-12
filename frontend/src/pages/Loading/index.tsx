import { Wrapper } from './Loading.style';
import Piumi from 'assets/piumi-emotionless.svg';

const Loading = () => {
  return (
    <Wrapper>
      <Piumi role="status" aria-label="로딩중입니다." viewBox="0 0 720 487" />
    </Wrapper>
  );
};

export default Loading;
