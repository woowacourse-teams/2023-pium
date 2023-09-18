import { forwardRef } from 'react';
import type { StyledImageProps } from './Image.style';
import { StyledImage } from './Image.style';
import sadpiumiPng from 'assets/sadpiumi-imageFail.png';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> &
  Partial<StyledImageProps>;

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(props, ref) {
  const { type = 'circle', size = '77px', ...imageProps } = props;

  const setErrorImage: React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    currentTarget.src = sadpiumiPng;
  };

  return (
    <StyledImage
      ref={ref}
      type={type}
      size={size}
      onError={setErrorImage}
      loading="lazy"
      {...imageProps}
    />
  );
});

export default Image;
