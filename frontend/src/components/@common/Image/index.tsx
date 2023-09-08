import { forwardRef } from 'react';
import type { StyledImageProps } from './Image.style';
import { StyledImage } from './Image.style';
import sadpiumi from 'assets/sadpiumi-imageFail.png';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> &
  Partial<StyledImageProps>;

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(props, ref) {
  const { type = 'circle', size = '77px', ...imageProps } = props;

  const setErrorImage: React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    currentTarget.src = sadpiumi;
  };

  return <StyledImage type={type} size={size} onError={setErrorImage} {...imageProps} ref={ref} />;
});

export default Image;
