import type { StyledImageProps } from './Image.style';
import { StyledImage } from './Image.style';
import sadpiumiPng from 'assets/sadpiumi-imageFail.png';
import sadpiumiWebp from 'assets/sadpiumi-imageFail.webp';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> &
  Partial<StyledImageProps>;

const Image = (props: ImageProps) => {
  const { type = 'circle', size = '77px', ...imageProps } = props;

  const setErrorImage: React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    currentTarget.src = sadpiumiWebp || sadpiumiPng;
  };

  return (
    <StyledImage type={type} size={size} onError={setErrorImage} loading="lazy" {...imageProps} />
  );
};

export default Image;
