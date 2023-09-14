import { Wrapper } from './Loading.style';
import PiumiSvg from 'assets/piumi-emotionless.svg';
import PiumiWebp from 'assets/piumi-emotionless.webp';

const Loading = () => {
  return (
    <Wrapper>
      <picture>
        <source srcSet={PiumiWebp} type="image/webp" />
        <img src={PiumiSvg} role="status" aria-label="로딩중입니다." />
      </picture>
    </Wrapper>
  );
};

export default Loading;
