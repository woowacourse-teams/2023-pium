import { forwardRef } from 'react';
import type { StyledImageProps } from './Image.style';
import { StyledImage } from './Image.style';
import ImageSourceList from 'models/ImageSourceList';
import sadpiumiPng from 'assets/sadpiumi-imageFail.png';

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> &
  Partial<StyledImageProps>;

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(props, ref) {
  const { type = 'circle', size = '77px', src = sadpiumiPng, ...imageProps } = props;

  const sizeValue = Number(size.slice(0, -2));
  const imageSources = new ImageSourceList(src, sizeValue);

  const setErrorImage: React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    currentTarget.src = imageSources.getNext();
  };

  return (
    <StyledImage
      ref={ref}
      type={type}
      size={size}
      onError={setErrorImage}
      loading="lazy"
      src={imageSources.getCurrent()}
      {...imageProps}
    />
  );
});

export default Image;
