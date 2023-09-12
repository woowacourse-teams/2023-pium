import { Wrapper } from './Loading.style';
import Piumi from 'assets/piumi-emotionless.svg';

const Loading = () => {
  return (
    <Wrapper>
      <Piumi role="status" aria-label="로딩중입니다." />
      {/* <LoadingImage src={piumi} alt="로딩중입니다" role="status" /> */}
    </Wrapper>
  );
};

export default Loading;
