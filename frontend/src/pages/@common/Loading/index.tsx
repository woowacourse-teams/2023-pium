import { Wrapper } from './Loading.style';
import PiumiPng from 'assets/piumi-emotionless.png';
import PiumiWebp from 'assets/piumi-emotionless.webp';

const Loading = () => {
  return (
    <Wrapper>
      <picture>
        <source srcSet={PiumiWebp} type="image/webp" />
        <img width={250} height={250} src={PiumiPng} role="status" aria-label="로딩중입니다." />
      </picture>
    </Wrapper>
  );
};

export default Loading;
