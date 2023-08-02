import type { StyledImageProps } from './Image.style';
import { StyledImage } from './Image.style';
import sadpiumi from 'assets/sadpiumi-imageFail.png';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> &
  Partial<StyledImageProps>;

const Image = (props: ImageProps) => {
  const { type = 'circle', size = '77px', ...imageProps } = props;

  const setErrorImage: React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    currentTarget.src = sadpiumi;
  };

  return <StyledImage type={type} size={size} onError={setErrorImage} {...imageProps} />;
};

export default Image;
